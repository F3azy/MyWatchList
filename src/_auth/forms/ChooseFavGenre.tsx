import FavGenreInput from "@/components/forms/FavGenreInput";
import { useAuth } from "@/contexts/AuthContext";
import useFetch from "@/hooks/useFetch";
import { Genres } from "@/types/common";
import { addToCollection, handleErrors } from "@/utils/firebase";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "https://api.themoviedb.org/3/genre/";

const ChooseFavGenre = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [movieFavGenres, setMovieFavGenres] = useState<string[]>([]);
  const [tvFavGenres, setTvFavGenres] = useState<string[]>([]);

  const { data: movieGenre } = useFetch<Genres>(
    url + `movie/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
  );

  const { data: tvGenre } = useFetch<Genres>(
    url + `tv/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`
  );

  const navigate = useNavigate();

  const { user } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (movieFavGenres.length < 1 || tvFavGenres.length < 1) {
      setError("Select at least 1 favorite genre for each media.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      if (user)
        await addToCollection(
          "favGenres",
          {
            movie: movieFavGenres.join(","),
            tv: tvFavGenres.join(","),
          },
          user?.uid
        );
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(handleErrors(error));
    }

    setLoading(false);
  }

  return (
    <Stack w="full" spacing={8} textAlign="center" letterSpacing={1}>
      {error !== "" && <Text color="red.500">{error}</Text>}
      <Heading color="brand.secondary">Choose favorite genres</Heading>
      <VStack as="form" w="full" spacing={5} onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel color={"brand.secondary"}>
            Favorite movie genres:
          </FormLabel>
          <FavGenreInput
            genres={movieGenre?.genres}
            favGenres={movieFavGenres}
            setFavGenres={setMovieFavGenres}
            setError={setError}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color={"brand.secondary"}>
            Favorite series genres:
          </FormLabel>
          <FavGenreInput
            genres={tvGenre?.genres}
            favGenres={tvFavGenres}
            setFavGenres={setTvFavGenres}
            setError={setError}
          />
        </FormControl>
        <Button w="full" variant="full" type="submit" isLoading={isLoading}>
          Save
        </Button>
      </VStack>
    </Stack>
  );
};

export default ChooseFavGenre;
