import React, { useState, useEffect } from "react";
import { Select, Skeleton } from "@chakra-ui/react";

type Genres = {
  id: number;
  name: string;
};

const url = "https://api.themoviedb.org/3/genre/";

const GenreSelect = ({
  media_type,
  setStateFun,
  changeFun,
  defaultValue,
}: {
  media_type: string;
  setStateFun: React.Dispatch<React.SetStateAction<string>>;
  changeFun?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string;
}) => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetching = async () => {
      try {
        const response = await fetch(
          url +
            (media_type === "tv" ? "tv" : "movie") +
            `/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
        );
        const json = await response.json();
        setGenres(json.genres);
        if (defaultValue !== "") setStateFun(defaultValue as string);
        else setStateFun(json.genres[0].id);
        setTimeout(() => setIsLoading(false), 800);
      } catch (error) {
        console.error("Error fetching genres:", error);
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
      }
    };

    fetching();
  }, [media_type]);

  return (
    <Skeleton
      borderRadius="full"
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={3}
    >
      <Select
        w={{base: "full",md: "200px"}}
        variant="base"
        defaultValue={defaultValue}
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

export default GenreSelect;
