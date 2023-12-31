import { useState, useEffect } from "react";
import { Image as ChakraIMG, Link, Skeleton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MediaType, MultiMedia } from "@/types/common";
import { MediaImages } from "@/types/common";
import useFetch from "@/hooks/useFetch";
import { imageURL } from "@/constans/APILinks";
import { createApiUrl } from "@/utils";

const WatchCard = ({
  watchCard,
  media_type,
  useBackdrop,
  loaded,
  isLink = true,
}: {
  watchCard: MultiMedia;
  media_type?: MediaType;
  useBackdrop?: boolean;
  loaded?: boolean;
  isLink?: boolean;
}) => {
  const [isloading, setIsLoading] = useState(true);

  const { data: images, loading: loadingImages } = useFetch<MediaImages>(
    createApiUrl(
      `${media_type || watchCard.media_type}/${watchCard.id}/images`,
      "&include_image_language=en"
    )
  );

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

  if (!isLink)
    return (
      <Skeleton
        h="full"
        borderRadius="4px"
        isLoaded={!isloading || loaded}
        startColor="brand.primary"
        endColor="brand.tertiary"
        fadeDuration={4}
        boxShadow={{ xl: "0px 20px 15px -10px black" }}
        transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
        _hover={{
          transform: { xl: "translate(0, -10px)" },
          boxShadow: { xl: "0px 30px 30px -10px black" },
        }}
      >
        <ChakraIMG
          h="full"
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
      </Skeleton>
    );

  return (
    <Skeleton
      h="full"
      borderRadius="4px"
      isLoaded={!isloading || loaded}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
      boxShadow={{ xl: "0px 20px 15px -10px black" }}
      transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
      _hover={{
        transform: { xl: "translate(0, -10px)" },
        boxShadow: { xl: "0px 30px 30px -10px black" },
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
          h="full"
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
