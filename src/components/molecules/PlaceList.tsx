'use client';

import { useEffect, useState } from 'react';
import { PlaceCard } from '@/components/molecules';
import { Text, Title } from '@/components/atoms';
import { TagCategory } from '@/components/atoms/categoryColors';
// Tag 타입 정의
type Tag = {
  label: string;
  category: TagCategory;
}

interface NotionItem {
  id: string;
  name: string;
  summary: string;
  location: string;
  status: string;
  partySize: string;
  partnered: boolean;
  score: number;
}

export default function PlaceList(): React.JSX.Element {
    const [notionData, setNotionData] = useState<NotionItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotionData() {
            try {
                const response = await fetch('/api/notion?pageSize=100', { cache: 'no-store' });
                const data = await response.json();
                console.log('[MAP PAGE - NOTION DATA]', data);
                if (data.ok) {
                    setNotionData(data.items);
                } else {
                    console.error('[NOTION API ERROR]', data.error || data);
                }
            } catch (error) {
                console.error('Failed to fetch notion data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchNotionData();
    }, []);

    return (
      <div className="place-list">
          <Title element="h2">
              맛집 목록 ({notionData.length}개)
          </Title>
          {loading ? (
              <Text>데이터를 불러오는 중...</Text>
          ) : (
              <div className="w-full grid grid-cols-1 gap-6">
                  {notionData.map((item) => {
                      const tags: Tag[] = [];
                      if (item.location) {
                          tags.push({ label: item.location, category: 'location' });
                      }
                      if (item.status) {
                          tags.push({ label: item.status, category: 'status' });
                      }
                      if (item.partySize) {
                          tags.push({ label: item.partySize, category: 'mood' });
                      }
                      if (item.partnered) {
                          tags.push({ label: '임직원 할인', category: 'service' });
                      }
                      return (
                          <PlaceCard
                              key={item.id}
                              name={item.name || '이름 없음'}
                              description={item.summary || ''}
                              tags={tags}
                              rating={item.score}
                          />
                      );
                  })}
              </div>
          )}
        </div>
    );
}
