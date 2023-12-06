import { Flex, HStack, Text, Select, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MovieSelect from "@/components/shared/GenreSelect";
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

  return (
    <Flex flex={1} direction="column" rowGap={20} align="center">
      <HStack w="100%" columnGap="16px">
        <Text fontSize="32px" fontWeight="bold">
          Search a random
        </Text>
        <Select
          w="200px"
          variant="base"
          defaultValue={media_type !== "" ? media_type : "movie"}
          onChange={(e) => changeType(e)}
        >
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Select>
        <MovieSelect
          media_type={media_type}
          setStateFun={(e) => setGenre(e)}
          changeFun={(e) => changeGenre(e)}
          defaultValue={defaultGenre}
        />
        <Button variant="full" borderRadius="full" onClick={() => searchRand()}>
          Search
        </Button>
      </HStack>
      <Flex w="60%" flex={1} justify="center" align="center">
        {mediaWatchCard ? (
          <WatchCard
            id={mediaWatchCard.id}
            media_type={media_type}
            title={mediaWatchCard.name || mediaWatchCard.title}
            SpecImageURL={
              mediaWatchCard.backdrop_path || mediaWatchCard.poster_path
            }
          />
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default RandomMedia;
