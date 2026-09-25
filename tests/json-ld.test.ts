import assert from 'node:assert/strict';
import { test } from 'node:test';
import { serializeJsonLd } from '../src/lib/json-ld.ts';

test('escapes angle brackets so a value cannot close the script tag', () => {
  const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
  assert.ok(!out.includes('<'));
  assert.ok(!out.includes('>'));
  assert.ok(out.includes('\\u003c/script\\u003e'));
});

test('escapes ampersands', () => {
  const out = serializeJsonLd({ name: 'Tom & Jerry &amp; friends' });
  assert.ok(!out.includes('&'));
  assert.ok(out.includes('Tom \\u0026 Jerry \\u0026amp; friends'));
});

test('output is still valid JSON that round-trips to the original data', () => {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [{ '@type': 'Question', name: 'Is 5 < 6 & 7 > 6?', text: '<b>yes</b>' }],
  };
  assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
});

test('leaves data without special characters identical to JSON.stringify', () => {
  const data = { '@type': 'Product', name: 'Plain name', price: 12.5 };
  assert.equal(serializeJsonLd(data), JSON.stringify(data));
});
