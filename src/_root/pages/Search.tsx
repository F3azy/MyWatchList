import { useState, FormEvent } from "react";
import {
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import WatchCard from "@/components/shared/WatchCard";
import { APIResults, MultiMedia } from "@/types/common";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";
import { createApiUrl } from "@/utils";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });

  const [title, setTitle] = useState(searchParams.get("q") as string);

  const {
    data: APIResults,
    loading,
    lastElementRef,
  } = useInfiniteFetch<APIResults<MultiMedia[]>>(
    createApiUrl(`search/multi`, `query=${encodeURIComponent(title)}`)
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
    <Flex w="full" direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <InputGroup size={{ base: "md", md: "lg" }}>
        <InputLeftElement
          pointerEvents="none"
          children={
            <SearchIcon boxSize={{ base: 5, md: 6 }} color="brand.secondary" />
          }
        />
        <Input
          fontSize={{ base: "20px", md: "28px" }}
          fontWeight="700"
          color="brand.secondary"
          size={{ base: "md", md: "lg" }}
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
          type="text"
          placeholder="Title..."
          onInput={getTitle}
          value={title}
        />
      </InputGroup>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(8, 1fr)" }}
        gap={{ base: 3, md: 6 }}
      >
        {APIResults.map((results, mainIdx) =>
          results.results
            ?.filter(
              (WatchCard) =>
                WatchCard.media_type === "movie" ||
                WatchCard.media_type === "tv"
            )
            ?.map((watchCard, idx, filtered) =>
              APIResults.length - 1 === mainIdx &&
              filtered.length - 1 === idx ? (
                <GridItem ref={lastElementRef} key={watchCard.id}>
                  <WatchCard
                    watchCard={watchCard}
                    media_type={watchCard.media_type}
                  />
                </GridItem>
              ) : (
                <GridItem key={watchCard.id}>
                  <WatchCard
                    watchCard={watchCard}
                    media_type={watchCard.media_type}
                  />
                </GridItem>
              )
            )
        )}
      </Grid>
      {loading && (
        <Spinner thickness="8px" size="xl" mx="auto" color="brand.secondary" />
      )}
    </Flex>
  );
};

export default Search;
