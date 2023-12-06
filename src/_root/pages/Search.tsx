import { useState, FormEvent } from "react";
import {
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import WatchCard from "@/components/shared/WatchCard";
import { MultiMedia } from "@/types/common";
import { SearchIcon } from "@chakra-ui/icons";
import useFetch from "@/hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const url = "https://api.themoviedb.org/3/search/multi";

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });

  const [title, setTitle] = useState(searchParams.get("q") as string);

  const { data: watchCards } = useFetch<MultiMedia>(
    url +
      `?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&query=${encodeURIComponent(title)}&language=en-US`
  );

  function getTitle(event: FormEvent<HTMLInputElement>): void {
    setTitle(event.currentTarget.value);
    setSearchParams(
      (prev) => {
        prev.set("q", event.currentTarget.value);
        return prev;
      },
      { replace: true }
    );
    if (searchParams.get("q") === "") {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
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
          value={title}
        />
      </InputGroup>
      <Grid w="100%" templateColumns="repeat(8, 1fr)" gap={6}>
        {watchCards?.results.map((watchcard) => (
          <GridItem w="100%" key={watchcard.id}>
            <WatchCard
              id={watchcard.id}
              media_type={watchcard.media_type}
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
