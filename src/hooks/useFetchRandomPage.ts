import { useState, useEffect } from "react";

export default function useFetchRandomPage<T = unknown>(
  url: string,
  randomElement: boolean = false,
  options: object = {}
) {
  const [data, setData] = useState<T | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    setError("");

    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(`Error fetching in useFetchRandomPage:`, error);
        setLoading(false);
        setError(error as string);
      }
    };

    if(url !== "")
    Promise.resolve(fetchData(url)).then((pages) => {
      const randomPage = Math.floor(
        Math.random() * (Math.min(pages.total_pages, 500) - 1 + 1) + 1
      );
      
      Promise.resolve(fetchData(url + `&page=${randomPage}`)).then((value) => {
        if (randomElement) {
          const randomIdx = Math.floor(Math.random() * 20);
          setData(value.results[randomIdx]);
        } else {
          setData(value);
        }
        setLoading(false);
      });
    });
  }, [url]);

  return { data, loading, error };
}
