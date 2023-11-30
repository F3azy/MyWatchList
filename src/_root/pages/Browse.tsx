import { Flex, HStack, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import WatchCard from "@/components/shared/WatchCard";
import MovieSelect from "@/components/shared/GenreSelect";
import { Multi } from "@/types/common";
import useFetch from "@/hooks/useFetch";

const url = "https://api.themoviedb.org/3/discover/";

const Browse = () => {
  const { media_type } = useParams();

  const [genre, setGenre] = useState("");

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  const { data: watchCards } = useFetch<{ results: Multi[] }>(
    url +
      media_type +
      `?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&language=en-US&with_genres=${genre}`
  );

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <HStack columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          {media_type === "tv" ? "Series" : "Movies"}
        </Text>
        <MovieSelect
          media_type={media_type as string}
          setStateFun={setGenre}
          changeFun={changeGenre}
        />
      </HStack>
      <Grid w="100%" templateColumns="repeat(8, 1fr)" gap={6}>
        {watchCards?.results.map((watchcard) => (
          <GridItem w="100%" key={watchcard.id}>
            <WatchCard
              id={watchcard.id}
              media_type={media_type}
              title={watchcard.name || watchcard.title}
              SpecImageURL={watchcard.poster_path}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Browse;
