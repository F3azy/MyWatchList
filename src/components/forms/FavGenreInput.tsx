import { Flex } from "@chakra-ui/react";
import React from "react";
import GenreTag from "../shared/GenreTag";
import { Genres } from "@/types/common";

const FavGenreInput = ({
  genres,
  favGenres,
  setFavGenres,
  setError,
  maxSelect = 3,
}: {
  genres: Genres["genres"] | undefined;
  favGenres: string[];
  setFavGenres: React.Dispatch<React.SetStateAction<string[]>>;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  maxSelect?: number;
}) => {
  function chooseFavGenre(
    favGenres: string[],
    setFavGenre: React.Dispatch<React.SetStateAction<string[]>>,
    genre: string
  ): void {
    if (favGenres.includes(genre)) {
      setFavGenre(favGenres.filter((favGenre) => favGenre !== genre));
    } else {
      if (favGenres.length === maxSelect) {
        if (setError) setError(`You can select max ${maxSelect} genres for movie and tv.`);
        return;
      }
      setFavGenre([...favGenres, genre]);
    }
  }

  return (
    <Flex flexWrap="wrap" gap={2}>
      {genres?.map((genre) => (
        <GenreTag
          key={genre.name}
          _variant={favGenres.includes(genre.name) ? "selected" : "outline"}
          _onClick={() => chooseFavGenre(favGenres, setFavGenres, genre.name)}
        >
          {genre.name}
        </GenreTag>
      ))}
    </Flex>
  );
};

export default FavGenreInput;
