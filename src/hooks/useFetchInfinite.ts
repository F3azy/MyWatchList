import { useEffect, useState } from "react";

export default function useFetchInfinite<T = unknown>(
  url: string,
  options: object = {}
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setData(undefined);
    setError("");

    const fetchData = async (url: string, options: object = {}) => {
      try {
        const response = await fetch(url, options);

        if (!response.ok)
          throw new Error(
            "\nCode: " + response.status + " \nurl: " + response.url
          );

        const json = await response.json();

        setLoading(false);
        setData((prev) => {
          return [...[prev], json] as T;
        });
      } catch (error) {
        setLoading(false);
        setError(error as string);
      }
    };

    fetchData(url, options);
  }, [url]);

  return { data, loading, error };
}
