import React, { useState, useEffect } from "react";
import { Select, Skeleton } from "@chakra-ui/react";

type Genres = {
  id: number;
  name: string;
};

const MovieSelect = ({
  type,
  isloading,
  setIsLoading,
  setStateFun,
  changeFun,
}: {
  type: string;
  isloading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setStateFun: React.Dispatch<React.SetStateAction<string>>;
  changeFun?: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  const [genres, setGenres] = useState<Genres[]>(() => {
    return [];
  });
  const [defaultVal, setDefaultVal] = useState(() => {
    return "";
  });
  const url = "https://api.themoviedb.org/3/genre/";

  useEffect(() => {
    setIsLoading(true);
    const fetching = async () => {
      try {
        const response = await fetch(
          url +
            (type === "tv" ? "tv" : "movie") +
            `/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
        );
        const json = await response.json();
        setGenres(json.genres);
        setStateFun(json.genres[0].id);
        setDefaultVal(json.genres[0].name);
        setTimeout(() => setIsLoading(false), 800);
      } catch (error) {
        console.error("Error fetching genres:", error);
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
      }
    };

    fetching();
  }, [type]);

  return (
    <Skeleton
      borderRadius="full"
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={3}
    >
      <Select
        w="200px"
        variant="base"
        defaultValue={defaultVal}
        onChange={changeFun}
      >
        {genres?.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </Select>
    </Skeleton>
  );
};

export default MovieSelect;
