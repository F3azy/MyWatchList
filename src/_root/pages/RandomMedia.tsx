import {
  Flex,
  Text,
  Select,
  Button,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GenreSelect from "@/components/shared/GenreSelect";
import WatchCard from "@/components/shared/WatchCard";
import { MultiMediaResult } from "@/types/common";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

const discoverURL = "https://api.themoviedb.org/3/discover/";
const mediaURL = "https://api.themoviedb.org/3/";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching in useFetchRandomPage:`, error);
  }
};

const RandomMedia = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: "movie",
    genre: "",
    id: "",
  });

  const [media_type, setMedia_type] = useState(
    searchParams.get("media_type") as string
  );
  const [defaultGenre, setdefaultGenre] = useState(
    searchParams.get("genre") as string
  );
  const [genre, setGenre] = useState("");
  const [media, setMedia] = useState<string>("");

  const [mediaID, setMediaID] = useState<number>();
  const { data: mediaWatchCard } = useFetch<MultiMediaResult>(media);

  useEffect(() => {
    setMedia("");
    if (searchParams.get("id") !== "") {
      setMedia(
        mediaURL +
          searchParams.get("media_type") +
          "/" +
          searchParams.get("id") +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (mediaID) {
      setSearchParams((prev) => {
        prev.set("genre", genre);
        prev.set("media_type", media_type);
        prev.set("id", mediaID?.toString() as string);
        return prev;
      });
    }
  }, [mediaID]);

  function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setMedia_type(event.currentTarget.value);
    setdefaultGenre("");
  }

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setGenre(event.currentTarget.value);
  }

  function searchRand() {
    Promise.resolve(
      fetchData(
        discoverURL +
          media_type +
          `?api_key=${
            import.meta.env.VITE_MOVIE_API_KEY
          }&language=en-US&with_genres=${genre}`
      )
    ).then((pages) => {
      const randomPage = Math.floor(
        Math.random() * (Math.min(pages.total_pages, 500) - 1 + 1) + 1
      );
      Promise.resolve(
        fetchData(
          discoverURL +
            media_type +
            `?api_key=${
              import.meta.env.VITE_MOVIE_API_KEY
            }&language=en-US&with_genres=${genre}` +
            `&page=${randomPage}`
        )
      ).then((value) => {
        const randomIdx = Math.floor(Math.random() * 20);
        setMediaID(value.results[randomIdx].id);
      });
    });
  }

  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <Flex
      w="full"
      direction="column"
      rowGap={{ base: 5, xl: 20 }}
      align="center"
    >
      <Flex w="full" direction={{ base: "column", xl: "row" }} gap="16px">
        <Text fontSize="32px" fontWeight="bold">
          Search a random
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="16px"
          h="min-content"
        >
          <Select
            w={{ base: "full", md: "200px" }}
            variant="base"
            defaultValue={media_type !== "" ? media_type : "movie"}
            onChange={(e) => changeType(e)}
          >
            <option value="movie">Movie</option>
            <option value="tv">Serie</option>
          </Select>
          <GenreSelect
            media_type={media_type}
            setStateFun={(e) => setGenre(e)}
            changeFun={(e) => changeGenre(e)}
            defaultValue={defaultGenre}
          />
          <Button variant="full" borderRadius="md" onClick={() => searchRand()}>
            Search
          </Button>
        </Flex>
      </Flex>
      <Flex w={{ xl: "60%" }} minH="100px" justify="center" align="center">
        {mediaWatchCard && (
          <WatchCard
            watchCard={mediaWatchCard}
            media_type={media_type}
            {...(isLargerThan1280 ? { useBackdrop: true } : null)}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default RandomMedia;
