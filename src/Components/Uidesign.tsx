import { useEffect, useState, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUiItems } from '../Admin/api/uiItems';
import type { UiItem } from '../Admin/types';

export default function UiDesign() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ui-items'],
    queryFn: fetchUiItems,
  });

  const [visibleItems, setVisibleItems] = useState<UiItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 3;

  // 🧠 Fetch next N items and append with preview image
  const loadMoreItems = useCallback(async () => {
    if (!data || loadingMore || currentIndex >= data.length) return;

    setLoadingMore(true);

    const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);

    const updatedItems = await Promise.all(
      nextItems.map(async (item) => {
        try {
          const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(item.url)}`);
          const json = await res.json();
          return {
            ...item,
            image: json?.data?.image?.url || '',
          };
        } catch {
          return item;
        }
      })
    );

    setVisibleItems((prev) => [...prev, ...updatedItems]);
    setCurrentIndex((prev) => prev + itemsPerPage);
    setLoadingMore(false);
  }, [data, currentIndex, loadingMore]);

  // 🔁 Intersection Observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMoreItems();
      }
    },
    [loadMoreItems]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (data && visibleItems.length === 0) {
      // Load initial items
      loadMoreItems();
    }
  }, [data, visibleItems.length, loadMoreItems]);

  if (isLoading) return <div className="text-center p-10">Loading UI Items...</div>;
  if (error) return <div className="text-center p-10 text-red-600">Failed to load items</div>;

  return (
    <section className="px-4 py-10 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {visibleItems.map((item, index) => (
          <div key={index} className="group overflow-hidden">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover object-top group-hover:scale-102 transition-transform duration-300 rounded-sm shadow-sm"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </a>
            <div className="p-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline text-center block"
              >
                {item.name}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Only show loader if more items exist */}
      {currentIndex < (data?.length || 0) && (
        <div ref={loaderRef} className="text-center py-6">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"></span>
        </div>
      )}
    </section>
  );
}
