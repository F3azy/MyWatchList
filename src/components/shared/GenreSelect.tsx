import React, { useEffect } from "react";
import { Select, Skeleton } from "@chakra-ui/react";
import useFetch from "@/hooks/useFetch";
import { Genres, MediaType } from "@/types/common";
import { createApiUrl } from "@/utils";

const GenreSelect = ({
  media_type,
  setStateFun,
  changeFun,
  defaultValue,
}: {
  media_type: MediaType;
  setStateFun: React.Dispatch<React.SetStateAction<string>>;
  changeFun?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: string;
}) => {
  const { data: genre, loading } = useFetch<Genres>(
    createApiUrl(`genre/${media_type}` + "/list")
  );

  useEffect(() => {
    if (defaultValue) setStateFun(defaultValue as string);
    else setStateFun(genre?.genres?.at(0)?.id.toString() as string);
  }, [media_type, genre]);

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
