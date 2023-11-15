import { frameData } from "framer-motion";
import { useEffect, useReducer, useState } from "react";

export function useMultipleFetch<T = unknown>(
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

        if (!response.ok) throw new Error("In useMultipleFetch");

        const json = await response.json();

        setLoading(false);
        return json.results;
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

export function useFetch<T = unknown>(url: string, options: object = {}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    // setData();
    setError("");

    const fetchData = async (url: string, options: object = {}) => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) throw new Error("In useFetch");

        const json = await response.json();

        setLoading(false);
        setData(json);
      } catch (error) {
        setLoading(false);
        setError(error as string);
      }
    };

    fetchData(url, options);
  }, [url]);

  return { data, loading, error };
}