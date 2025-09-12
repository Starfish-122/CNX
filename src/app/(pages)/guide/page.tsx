import Link from 'next/link';
import Title from '@/components/base/Title';
import Text from '@/components/base/Text';

const components = [
  {
    name: 'Title',
    description: '페이지/섹션에 사용되는 타이틀 컴포넌트',
    link: '/guide/title',
  },
	{
		name: 'Text',
		description: '기본 텍스트 컴포넌트',
		link: '/guide/text',
	},
  // 필요 시 더 추가
];

export default function GuidePage(): React.JSX.Element {
  return (
    <div className="container mx-auto py-10">
      <Title>Component Guide</Title>
      <Text className="mt-5 mb-2">컴포넌트 가이드 페이지입니다.</Text>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full table-fixed text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="w-1/4 px-4 py-3 text-center w-1/6">이름</th>
              <th className="px-4 py-3 text-center">내용</th>
              <th className=" px-4 py-3 text-center w-1/6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {components.map((component) => (
              <tr
                key={component.name}
                className="transition-colors"
              >
                <td className="px-4 py-3 align-middle">
                  <Text className="font-medium">{component.name}</Text>
                </td>
                <td className="px-4 py-3 align-middle">
                  <Text className="text-gray-600 dark:text-gray-400">
                    {component.description}
                  </Text>
                </td>
                <td className="px-4 py-3 align-middle text-right">
                  <Link
                    href={component.link}
                    aria-label={`${component.name} 가이드로 이동`}
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors hover:translate-x-1 transition-transform duration-300"
                  >
                    보기
                    <svg
  aria-hidden="true"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
  className="h-4 w-4"
>
  <path d="M9 5l7 7-7 7" />
</svg>
                  </Link>
                </td>
              </tr>
            ))}

            {components.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center">
                  <Text className="text-gray-500 dark:text-gray-400">
                    아직 등록된 컴포넌트가 없습니다.
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
