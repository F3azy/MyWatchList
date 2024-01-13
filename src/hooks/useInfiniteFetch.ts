import { useCallback, useEffect, useRef, useState } from "react";

export default function useInfiniteFetch<T = unknown>(
  url: string,
  maxPage: number = 20,
  options: object = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setData([]);
    setPage((prev) => (prev = 1));
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    const fetchData = async (url: string, options: object = {}) => {
      try {
        const response = await fetch(url + `&page=${page}`, options);

        if (!response.ok)
          throw new Error(
            "\nCode: " + response.status + " \nurl: " + response.url
          );

        const json = await response.json();

        setLoading(false);
        setData((prev) => {
          return [...prev, ...json.results];
        });
        setHasMore(json.total_pages > page);
      } catch (error) {
        setLoading(false);
        setError(error as string);
      }
    };

    fetchData(url, { ...options, signal: controller.signal });

    return () => controller.abort();
  }, [url, page]);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && page < maxPage) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return { data, loading, error, lastElementRef };
}
