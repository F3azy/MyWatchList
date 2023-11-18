import { useEffect, useState } from "react";

export default function useMultipleFetch<T = unknown>(
  urls: string[],
  options: object = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setData([]);
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
        return json;
      } catch (error) {
        setLoading(false);
        setError(error as string);
      }
    };

    Promise.all(urls.map((url) => fetchData(url, options))).then(
      (results: T[]) => setData(results)
    );
  }, [urls]);

  return { data, loading, error };
}
