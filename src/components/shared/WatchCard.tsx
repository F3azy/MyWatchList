import { useState, useEffect } from "react";
import { Image as ChakraIMG, Link, Skeleton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MultiMediaResult } from "@/types/common";

const WatchCard = ({
  watchCard,
  media_type,
}: {
  watchCard: MultiMediaResult;
  media_type?: string;
}) => {
  const imageURL = "https://image.tmdb.org/t/p/original/";

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + watchCard.poster_path;
        await image.decode();

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
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
      boxShadow="0px 20px 15px -10px black"
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        transform: "translate(0, -10px)",
        boxShadow: "0px 30px 30px -10px black",
      }}
    >
      <Link
        as={RouterLink}
        to={
          "/info/" +
          (media_type || watchCard.media_type) +
          "/" +
          (watchCard.title?.replaceAll(" ", "-") ||
            watchCard.name?.replaceAll(" ", "-")) +
          "/" +
          watchCard.id
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
          src={imageURL + watchCard.poster_path}
          alt={watchCard.title || watchCard.name}
        />
      </Link>
    </Skeleton>
  );
};

export default WatchCard;
