import { Flex, HStack, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import WatchCard from "@/components/shared/WatchCard";
import GenreSelect from "@/components/shared/GenreSelect";
import { MediaType, MultiMedia } from "@/types/common";
import useFetch from "@/hooks/useFetch";
import { createApiUrl } from "@/utils";

const url = "https://api.themoviedb.org/3/discover/";

const Browse = () => {
  const { media_type } = useParams<{ media_type: MediaType }>();

  const [genre, setGenre] = useState("");

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setGenre(event.currentTarget.value);
  }

  const { data: watchCards } = useFetch<MultiMedia>(
    createApiUrl( `discover/${media_type}`, `with_genres=${genre}`)
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
        {watchCards?.results.map((watchcard) => (
          <GridItem w="full" key={watchcard.id}>
            <WatchCard watchCard={watchcard} media_type={media_type} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Browse;
