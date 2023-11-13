import { useEffect, useState, FormEvent } from "react";
import {
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import WatchCard from "@/components/shared/WatchCard";
import { Movie } from "@/types/common";
import { SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  const url = "https://api.themoviedb.org/3/search/";
  const [title, setTitle] = useState(() => {
    return "";
  });
  const [watchCards, setWatchCards] = useState<Movie[]>(() => {
    return [];
  });

  useEffect(() => {
    fetch(
      url +
        "multi" +
        `?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&query=${title}&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((movie) => {
        setWatchCards(
          movie.results.filter(
            (m: Movie) => m.media_type != "person" && m.poster_path != null
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching movies or series data:", error);
      });
  }, [title]);

  function getTitle(event: FormEvent<HTMLInputElement>): void {
    setTitle(event.currentTarget.value);
  }

  return (
    <Flex w="100%" direction="column" rowGap="28px">
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon boxSize={6} color="brand.secondary" />}
        />
        <Input
          fontSize="28px"
          fontWeight="700"
          color="brand.secondary"
          size="lg"
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
          type="text"
          placeholder="Title..."
          onInput={getTitle}
        />
      </InputGroup>
      <Grid w="100%" templateColumns="repeat(8, 1fr)" gap={6}>
        {watchCards.map((watchcard) => (
          <GridItem w="100%" key={watchcard.id}>
            <WatchCard
              isLink={true}
              minH="200px"
              givenWidth="100%"
              id={watchcard.id}
              type={watchcard.media_type as string}
              title={
                watchcard?.name ? watchcard?.name : (watchcard?.title as string)
              }
              SpecImageURL={watchcard?.poster_path as string}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Search;
