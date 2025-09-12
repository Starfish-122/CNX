'use client';
import React from 'react';

export default function ExampleCard({
  demo,
  code,
}: {
  demo?: React.ReactNode;
  code?: string;
}) {
  return (
    <>
      {demo && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          {demo}
        </div>
      )}
      {code && (
        <pre className="bg-gray-900 text-gray-100 text-sm rounded-md p-4 mt-4 overflow-x-auto">
          {code}
        </pre>
      )}
    </>
  );
}