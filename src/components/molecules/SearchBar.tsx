'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { Icon, Input } from '@/components/atoms';

interface SearchBarProps {
  tags?: string[];
  defaultSelectedTags?: string[];
  onSearch?: (params: { searchTerm: string; tags: string[] }) => void;
  resetSignal?: number;
}

export default function SearchBar({
  tags = [],
  defaultSelectedTags = [],
  onSearch,
  resetSignal,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultSelectedTags);

  // 🔹 공통: 현재 상태를 부모(HomePage)에 알리는 함수
  const emitSearch = (nextSearchTerm?: string, nextTags?: string[]) => {
    const keyword = (nextSearchTerm ?? searchTerm).trim();
    const tagsToUse = nextTags ?? selectedTags;
    onSearch?.({ searchTerm: keyword, tags: tagsToUse });
  };

  // 🔹 돋보기 버튼 클릭
  const handleSearchClick = () => {
    setSelectedTags([]);
    emitSearch(undefined, []);
  };

  // 🔹 인풋에서 Enter 입력
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedTags([]);
      emitSearch(undefined, []);
    }
  };

  // 🔹 인풋 타이핑
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // 필요하면 여기서 emitSearch(value); 로 실시간 검색도 가능
  };

  // 🔹 X 버튼 (리셋)
  const handleReset = () => {
    setSearchTerm('');
    setSelectedTags([]);
    emitSearch('', []); // 검색어/태그 모두 비운 상태로 부모에 알리기
    inputRef.current?.focus();
  };

  // 🔹 태그 버튼 클릭
  const handleTagClick = (tag: string) => {
    if (tag === '전체') {
      setSelectedTags([]);
      emitSearch(searchTerm, []);
      return;
    }

    const isAlreadyOnlySelected = selectedTags.length === 1 && selectedTags[0] === tag;
    const next = isAlreadyOnlySelected ? [] : [tag];

    setSelectedTags(next);
    emitSearch(searchTerm, next);
  };

  useEffect(() => {
    if (resetSignal === undefined) return;
    setSearchTerm('');
    setSelectedTags([]);
  }, [resetSignal]);

  return (
    <div className={clsx(
      'pl-10 pr-10 absolute top-10 left-1/2 -translate-x-1/2 z-50 search-bar flex flex-col items-center gap-4 w-full max-w-full',
      'md:pl-0 md:pr-0 md:top-6 md:w-96 md:max-w-md',
    )}>
        <div
          className={clsx(
            'pt-2 pb-2 pl-6 pr-6',
            'flex items-center gap-2',
            'bg-white dark:bg-gray-800 backdrop-blur-md',
            'rounded-full shadow-xl',
            'transition-all duration-300',
            searchTerm
              ? 'w-full max-w-full md:w-96 md:max-w-md'
              : 'w-full max-w-full md:w-80 md:max-w-md'
          )}
        >
        <Input
          ref={inputRef}
          type="text"
          placeholder="맛집을 검색해보세요."
          value={searchTerm}
          size="full"
          showResetButton
          className="outline-none border-none"
          onChange={handleInputChange}
          onReset={handleReset}
          onKeyDown={handleKeyDown}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleSearchClick}
            className="
              p-2
              rounded-full
              bg-gray-400 dark:text-gray-500
              hover:bg-gray-600
              active:bg-gray-700
              transition-all duration-200
              shadow-md hover:shadow-lg
              flex items-center justify-center
            "
            aria-label="검색하기"
          >
            <Icon name="search" color="text-white" size="md" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {tags.map(tag => {
          const isSelected =
            tag === '전체' ? selectedTags.length === 0 : selectedTags.includes(tag);
          const isBestTag = tag === '추천';
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={clsx(
                'px-3 py-1 rounded-full text-sm border transition flex items-center gap-1',
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
                isBestTag &&
                  'text-white !bg-pink-500 !border-pink-500 hover:!bg-pink-600 hover:!border-pink-600'
              )}
            >
              {isBestTag && <Icon name="Crown" size="sm" color="text-white" />}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
