'use client';
import React from 'react';

type Row = { prop: string; type: string; def?: string; desc: string };

export default function PropsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="py-3 px-4">Prop</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Default</th>
            <th className="py-3 px-4">설명</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((r) => (
            <tr key={r.prop}>
              <td className="py-2 px-4 font-mono">{r.prop}</td>
              <td className="py-2 px-4 font-mono">{r.type}</td>
              <td className="py-2 px-4">{r.def ?? '-'}</td>
              <td className="py-2 px-4">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}