#!/usr/bin/env python3
"""Compare a local static export (out/) with the live site, route by route.

Read-only: only sends GET requests. Exit status is 1 unless every route is
IDENTICAL, EQUIVALENT or CONTENT-MATCH, so it can gate a deploy (and any future rsync --delete).
"""
import argparse
import difflib
import os
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser

ORIGIN_FLAGS = ("emrld", "cdn.tailwindcss", "tpembd", "metricool")


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text, self.urls, self.skip, self.script_text, self.in_script, self.buf = [], set(), 0, [], False, ""

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
            self.in_script, self.buf = tag == "script", ""
        for key, value in attrs:
            if key in ("href", "src") and value and value.startswith("http"):
                self.urls.add(value.split("?")[0])

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip = max(0, self.skip - 1)
            if self.in_script and "__next_f" not in self.buf and "self.__next" not in self.buf:
                self.script_text.append(self.buf)
            self.in_script = False

    def handle_data(self, data):
        if self.skip:
            self.buf += data
        else:
            data = " ".join(data.split())
            if data:
                self.text.append(data)


def parse(raw):
    raw = re.sub(r"<!--.*?-->", "", raw, flags=re.S)
    page = Page()
    page.feed(raw)
    evidence = " ".join(page.urls) + " " + " ".join(page.script_text)
    flags = {f for f in ORIGIN_FLAGS if f in evidence}
    return page, flags


def mask_build_hashes(raw):
    raw = re.sub(r"/_next/static/[^\s\"'\\)]+", "/_next/static/X", raw)
    return re.sub(r'(\\?"b\\?":\\?")[A-Za-z0-9_-]+', r"\1X", raw)


def out_path(out_dir, route):
    if route.endswith((".txt", ".xml")):
        return os.path.join(out_dir, route.lstrip("/"))
    return os.path.join(out_dir, route.strip("/"), "index.html")


def snapshot_name(route):
    if route == "/":
        return "home.html"
    name = route.strip("/").replace("/", "__")
    return name if route.endswith((".txt", ".xml")) else name + ".html"


def fetch(base, route, snapshot):
    cached = os.path.join(snapshot, snapshot_name(route)) if snapshot else None
    if cached and os.path.exists(cached):
        return 200, open(cached, "rb").read()
    request = urllib.request.Request(base + route, headers={"User-Agent": "samori-compare/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            status, body = response.status, response.read()
    except urllib.error.HTTPError as error:
        return error.code, b""
    except OSError:
        return 0, b""
    if cached and status == 200:
        os.makedirs(snapshot, exist_ok=True)
        open(cached, "wb").write(body)
    return status, body


def describe_difference(live_raw, built_raw):
    live, live_flags = parse(live_raw)
    built, built_flags = parse(built_raw)
    ratio = difflib.SequenceMatcher(None, live.text, built.text, autojunk=False).ratio()
    lost, gained = sorted(live_flags - built_flags), sorted(built_flags - live_flags)
    parts = [f"text match {ratio:.0%}"]
    parts.append(f"links only on live: {len(live.urls - built.urls)}")
    parts.append(f"links only in build: {len(built.urls - live.urls)}")
    if lost:
        parts.append("live-only: " + "+".join(lost))
    if gained:
        parts.append("build-only: " + "+".join(gained))
    return "; ".join(parts)


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--out", default="out")
    parser.add_argument("--base", default="https://www.samori.net")
    parser.add_argument("--routes", default=os.path.join(os.path.dirname(__file__), "live-routes.txt"))
    parser.add_argument("--snapshot", help="folder to read live pages from, or fill on first run")
    parser.add_argument("--detail", metavar="ROUTE", help="print the visible-text differences for one route and exit")
    args = parser.parse_args()

    if args.detail:
        status, live = fetch(args.base, args.detail, args.snapshot)
        built = open(out_path(args.out, args.detail), "rb").read()
        live_text, built_text = parse(live.decode("utf-8", "replace"))[0].text, parse(built.decode("utf-8", "replace"))[0].text
        for line in difflib.unified_diff(live_text, built_text, "live", "build", lineterm="", n=0):
            if not line.startswith(("---", "+++", "@@")):
                print(line[:160])
        return 0

    routes = [line.strip() for line in open(args.routes) if line.strip() and not line.startswith("#")]
    results = []
    for route in routes:
        status, live = fetch(args.base, route, args.snapshot)
        path = out_path(args.out, route)
        if status != 200:
            results.append((route, "LIVE-ERROR", f"live returned {status}"))
        elif not os.path.exists(path):
            results.append((route, "NOT BUILT", "live has it, this build does not"))
        else:
            built = open(path, "rb").read()
            if built == live:
                results.append((route, "IDENTICAL", ""))
            elif path.endswith(".html") and mask_build_hashes(built.decode("utf-8", "replace")) == mask_build_hashes(
                live.decode("utf-8", "replace")
            ):
                results.append((route, "EQUIVALENT", "same content, only Next build hashes differ"))
            elif path.endswith(".html"):
                live_page, live_flags = parse(live.decode("utf-8", "replace"))
                built_page, built_flags = parse(built.decode("utf-8", "replace"))
                if live_page.text == built_page.text and live_page.urls == built_page.urls and live_flags == built_flags:
                    results.append((route, "CONTENT-MATCH", "same text, links and third-party scripts; markup differs"))
                else:
                    results.append((route, "DIFFERENT", describe_difference(live.decode("utf-8", "replace"), built.decode("utf-8", "replace"))))
            else:
                results.append((route, "DIFFERENT", f"live {len(live)} bytes, build {len(built)} bytes"))

    width = max(len(route) for route, _, _ in results)
    for route, status, detail in results:
        print(f"{route:<{width}}  {status:<10}  {detail}")

    counts = {}
    for _, status, _ in results:
        counts[status] = counts.get(status, 0) + 1
    print("\n" + ", ".join(f"{count} {status}" for status, count in sorted(counts.items())))

    listed = {r.strip("/") for r in routes}
    extra = []
    for root, _, files in os.walk(args.out):
        if "index.html" in files:
            rel = os.path.relpath(root, args.out).replace(os.sep, "/")
            if rel != "." and rel not in listed and not rel.startswith(("_next", "_not-found", "404")):
                extra.append("/" + rel + "/")
    if extra:
        print("Built but not on the live route list:", ", ".join(sorted(extra)))

    return 0 if all(status in ("IDENTICAL", "EQUIVALENT", "CONTENT-MATCH") for _, status, _ in results) else 1


if __name__ == "__main__":
    sys.exit(main())
