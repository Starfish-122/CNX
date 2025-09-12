export default function CodeTag({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1">{children}</code>
  );
}
