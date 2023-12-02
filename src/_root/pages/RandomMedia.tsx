import { Flex, HStack, Text, Select, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MovieSelect from "@/components/shared/GenreSelect";
import WatchCard from "@/components/shared/WatchCard";
import { Multi } from "@/types/common";
import { useSearchParams } from "react-router-dom";
import useFetchRandomPage from "@/hooks/useFetchRandomPage";
import useFetch from "@/hooks/useFetch";

const discoverURL = "https://api.themoviedb.org/3/discover/";
const mediaURL = "https://api.themoviedb.org/3/";

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
  const [discover, setDiscover] = useState<string>("");
  const [media, setMedia] = useState<string>("");

  const { data: discoverWatchCard } = useFetchRandomPage<Multi>(discover, true);
  const { data: mediaWatchCard } = useFetch<Multi>(media);

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
  }, []);

  useEffect(() => {
    if (discoverWatchCard) {
      setSearchParams(
        (prev) => {
          prev.set("genre", genre);
          prev.set("media_type", media_type);
          prev.set("id", discoverWatchCard?.id.toString() as string);
          return prev;
        },
        { replace: true }
      );
    }
  }, [discoverWatchCard]);

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
    setDiscover(
      discoverURL +
        media_type +
        `?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US&with_genres=${genre}`
    );
    setMedia("");
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
          onChange={changeType}
        >
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Select>
        <MovieSelect
          media_type={media_type}
          setStateFun={setGenre}
          changeFun={changeGenre}
          defaultValue={defaultGenre}
        />
        <Button variant="full" borderRadius="full" onClick={searchRand}>
          Search
        </Button>
      </HStack>
      <Flex w="60%" flex={1} justify="center" align="center">
        {discoverWatchCard ? (
          <WatchCard
            id={discoverWatchCard.id}
            media_type={media_type}
            title={discoverWatchCard.name || discoverWatchCard.title}
            SpecImageURL={
              discoverWatchCard.backdrop_path || discoverWatchCard.poster_path
            }
          />
        ) : mediaWatchCard ? (
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
