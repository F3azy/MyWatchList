import React, { useEffect } from "react";
import { Select, Skeleton } from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";

type Genres = {
  genres: {
    id: number;
    name: string;
  }[];
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
  const { data: genre, loading } = useFetch<Genres>(
    url + media_type + `/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
  );

  useEffect(() => {
    if (defaultValue !== "") setStateFun(defaultValue as string);
    else setStateFun(genre?.genres?.at(0)?.id.toString() as string);
  }, [media_type]);

  return (
    <Skeleton
      w={{ base: "full", md: "200px" }}
      borderRadius="md"
      isLoaded={!loading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={3}
    >
      <Select variant="base" defaultValue={defaultValue} onChange={changeFun}>
        {genre?.genres?.map((genre) => (
          <option key={genre?.id} value={genre?.id}>
            {genre?.name}
          </option>
        ))}
      </Select>
    </Skeleton>
  );
};

export default GenreSelect;
