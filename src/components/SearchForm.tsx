'use client';

import { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

export default function SearchForm({ fields, submitLabel }: { fields: Field[]; submitLabel: string }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((field) => [field.name, ''])),
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-xl shadow-teal-900/5 dark:border-white/10 dark:bg-zinc-900 sm:flex-row sm:items-center sm:gap-2 sm:p-2"
    >
      {fields.map((field, index) => (
        <div key={field.name} className="contents">
          <label className="flex flex-1 flex-col gap-1 rounded-xl px-3 py-2 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{field.label}</span>
            <input
              type={field.type}
              value={values[field.name] ?? ''}
              onChange={(e) => setValues((previous) => ({ ...previous, [field.name]: e.target.value }))}
              placeholder={field.placeholder}
              className="bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 [color-scheme:light] dark:[color-scheme:dark]"
            />
          </label>
          {index < fields.length - 1 && <div className="hidden h-8 w-px bg-zinc-200 dark:bg-zinc-700 sm:block" />}
        </div>
      ))}
      <button
        type="submit"
        className="mt-1 shrink-0 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 sm:mt-0"
      >
        {submitLabel}
      </button>
    </form>
  );
}
