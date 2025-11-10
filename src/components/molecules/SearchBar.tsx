'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon, Input } from '@/components/atoms';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-bar flex items-center gap-2 absolute">
      {/* absolute top-1/2 transform -translate-y-1/2 right-0 */}
      {isOpen && (
        <Input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-64 transition-all search-bar__input"
          onBlur={() => setIsOpen(false)}
        />
      )}
      <button 
        onClick={handleToggle}
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors search-bar__button"
      >
        <Icon name="search" text="검색하기" />
      </button>
    </div>
  );
}

