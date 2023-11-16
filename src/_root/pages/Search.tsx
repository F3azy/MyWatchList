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
import { Multi } from "@/types/common";
import { SearchIcon } from "@chakra-ui/icons";
import useFetch from "@/hooks/useFetch";

const Search = () => {
  const url = "https://api.themoviedb.org/3/search/multi";
  const [title, setTitle] = useState("");

  const { data: watchCards } = useFetch<{ results: Multi[] }>(
    url +
      `?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&query=${title}&language=en-US`
  );

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
        {watchCards?.results.map((watchcard) => (
          <GridItem w="100%" key={watchcard.id}>
            <WatchCard
              id={watchcard.id}
              type={watchcard.media_type}
              title={watchcard.name || watchcard.title}
              SpecImageURL={watchcard.poster_path}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Search;
