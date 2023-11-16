import { Flex, HStack, Text, Select, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import MovieSelect from "@/components/shared/GenreSelect";
import WatchCard from "@/components/shared/WatchCard";
import { Multi } from "@/types/common";
import { useSearchParams } from "react-router-dom";

const discoverURL = "https://api.themoviedb.org/3/discover/";
const mediaURL = "https://api.themoviedb.org/3/";

async function fetching(url: string) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error fetching in Random Page:`, error);
  }
}

const RandomMedia = () => {
  const [media_type, setMedia_type] = useState("movie");
  const [genre, setGenre] = useState("");
  const [isloadingGenres, setIsLoadingGenres] = useState(true);
  const [watchCard, setWatchCard] = useState<Multi>();

  const [searchParams, setSearchParams] = useSearchParams({
    media_type: "",
    genre: "",
    id: "",
  });

  useEffect(() => {
    if (searchParams.get("media_type") !== "")
      setMedia_type(searchParams.get("media_type") as string);
    if (searchParams.get("genre") !== "")
      setGenre(searchParams.get("genre") as string);
    if (searchParams.get("id") !== "") {
      Promise.resolve(
        fetching(
          mediaURL +
            searchParams.get("media_type") +
            "/" +
            searchParams.get("id") +
            `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
        )
      ).then((value) => {
        setWatchCard(value);
      });
    }
  }, []);

  function searchRand() {
    const randomPage = Math.floor(Math.random() * (500 - 1 + 1) + 1);
    Promise.resolve(
      fetching(
        discoverURL +
        media_type +
        `?api_key=${
            import.meta.env.VITE_MOVIE_API_KEY
          }&language=en-US&with_genres=${genre}&page=${randomPage}`
          )
          ).then((value) => {
            const randomIdx = Math.floor(Math.random() * 20);
            setWatchCard(value.results[randomIdx]);
            setSearchParams(
              (prev) => {
                prev.set("genre", genre);
                prev.set("media_type", media_type);
                prev.set("id", value.results[randomIdx].id);
                return prev;
              },
        { replace: true }
        );
      });
    }
    
    function changeType(event: React.ChangeEvent<HTMLSelectElement>) {
      setMedia_type(event.currentTarget.value);
    }
  
    function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
      setGenre(event.currentTarget.value);
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
          defaultValue="movie"
          onChange={changeType}
        >
          <option value="movie">Movie</option>
          <option value="tv">Serie</option>
        </Select>
        <MovieSelect
          isloading={isloadingGenres}
          setIsLoading={setIsLoadingGenres}
          media_type={media_type}
          setStateFun={setGenre}
          changeFun={changeGenre}
        />
        <Button variant="full" borderRadius="full" onClick={searchRand}>
          Search
        </Button>
      </HStack>
      <Flex w="60%" flex={1} justify="center" align="center">
        {watchCard ? (
          <WatchCard
            id={watchCard.id}
            media_type={media_type}
            title={watchCard.name || watchCard.title}
            SpecImageURL={watchCard.backdrop_path || watchCard.poster_path}
          />
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default RandomMedia;
