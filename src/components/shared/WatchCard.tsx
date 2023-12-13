import { useState, useEffect } from "react";
import { Image as ChakraIMG, Link, Skeleton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MultiMediaResult } from "@/types/common";
import { MediaImages } from "@/types/common";
import useFetch from "@/hooks/useFetch";

const imageURL = "https://image.tmdb.org/t/p/original/";

const WatchCard = ({
  watchCard,
  media_type,
  useBackdrop,
  loaded,
}: {
  watchCard: MultiMediaResult;
  media_type?: string;
  useBackdrop?: boolean;
  loaded?: boolean;
}) => {
  const [isloading, setIsLoading] = useState(true);

  const urlImages = `https://api.themoviedb.org/3/${
    media_type || watchCard.media_type
  }/${watchCard.id}/images?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&include_image_language=en`;

  const { data: images, loading: loadingImages } =
    useFetch<MediaImages>(urlImages);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + watchCard.poster_path;
        await image.decode();

        setIsLoading(false);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error decoding image:", error);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
    };

    decode();
  }, [watchCard]);

  return (
    <Skeleton
      h="100%"
      borderRadius="4px"
      isLoaded={!isloading || loaded}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
      boxShadow={{xl: "0px 20px 15px -10px black"}}
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        transform: {xl: "translate(0, -10px)"},
        boxShadow: {xl: "0px 30px 30px -10px black"},
      }}
    >
      <Link
        as={RouterLink}
        to={
          "/info/" +
          (media_type || watchCard.media_type) +
          "/" +
          watchCard.id +
          "/" +
          (watchCard.title?.replaceAll(" ", "-") ||
            watchCard.name?.replaceAll(" ", "-"))
        }
      >
        <ChakraIMG
          h="100%"
          borderRadius="8px"
          border="4px solid"
          borderColor="brand.dark.600"
          background="linear-gradient(#141414 97%, #030303) border-box"
          _hover={{
            borderColor: "transparent",
            background:
              "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
          }}
          src={
            imageURL +
            (useBackdrop
              ? images?.backdrops.at(0)?.file_path
              : watchCard.poster_path)
          }
          alt={watchCard.title || watchCard.name}
        />
      </Link>
    </Skeleton>
  );
};

export default WatchCard;
