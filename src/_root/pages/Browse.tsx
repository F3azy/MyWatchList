import {
  Flex,
  HStack,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import WatchCard from "@/components/shared/WatchCard";
import GenreSelect from "@/components/shared/GenreSelect";
import { APIResults, MediaType, MultiMedia } from "@/types/common";
import { createApiUrl } from "@/utils";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";

const Browse = () => {
  const { media_type } = useParams<{ media_type: MediaType }>();

  const [genre, setGenre] = useState("");

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setGenre(event.currentTarget.value);
  }

  const {
    data: APIResults,
    loading,
    lastElementRef,
  } = useInfiniteFetch<APIResults<MultiMedia[]>>(
    createApiUrl(`discover/${media_type}`, `with_genres=${genre}`)
  );

  return (
    <Flex w="full" direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <HStack columnGap="16px">
        <Heading as="h1" fontSize="32px" fontWeight="bold">
          {media_type === "tv" ? "Series" : "Movies"}
        </Heading>
        <GenreSelect
          media_type={media_type as MediaType}
          setStateFun={setGenre}
          changeFun={changeGenre}
        />
      </HStack>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(8, 1fr)" }}
        gap={{ base: 3, md: 6 }}
      >
        {APIResults.map((results, mainIdx) =>
          results.results?.map((watchCard, idx, filtered) =>
            APIResults.length - 1 === mainIdx && filtered.length - 1 === idx ? (
              <GridItem ref={lastElementRef} key={watchCard.id}>
                <WatchCard
                  watchCard={watchCard}
                  media_type={media_type}
                />
              </GridItem>
            ) : (
              <GridItem key={watchCard.id}>
                <WatchCard
                  watchCard={watchCard}
                  media_type={media_type}
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

export default Browse;
