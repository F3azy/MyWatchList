import { useState, useEffect } from "react";
import { Image as ChakraIMG, Link, Skeleton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const WatchCard = ({
  givenWidth,
  id,
  type,
  title,
  SpecImageURL,
  isLink,
  minH,
}: {
  givenWidth?: string;
  id: number;
  type: string;
  title: string;
  SpecImageURL: string;
  isLink: boolean;
  minH?: string;
}) => {
  const imageURL = "https://image.tmdb.org/t/p/original/";

  const [isloading, setIsLoading] = useState(() => {
    return true;
  });

  useEffect(() => {
    setIsLoading(true);
    const decode = async () => {
      try {
        const image = new Image();
        image.src = imageURL + SpecImageURL;
        await image.decode();

        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error decoding image:", error);
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
      }
    };

    decode();
  }, [SpecImageURL]);

  return (
    <Skeleton
      w={givenWidth ? givenWidth : "calc(5%)"}
      minH={minH ? minH : "100px"}
      borderRadius="4px"
      isLoaded={!isloading}
      startColor="brand.primary"
      endColor="brand.tertiary"
      fadeDuration={4}
    >
      {isLink ? (
        <Link
          as={RouterLink}
          to={"/info/" + type + "/" + title + "/" + id}
          display="block"
          // w={givenWidth ? givenWidth : "calc(20% - 16px)"}
          transition="transform 500ms ease 0s, box-shadow 500ms ease 0s"
          _hover={{
            transform: "translate(0, -5px)",
          }}
        >
          <ChakraIMG
            w="100%"
            // h={givenHeight ? givenHeight : "auto"}
            borderRadius="8px"
            border="4px solid"
            borderColor="brand.dark.600"
            boxShadow="0px 20px 15px -10px black"
            background="linear-gradient(#141414 97%, #030303) border-box"
            _hover={{
              borderColor: "transparent",
              background:
                "linear-gradient(#141414, #141414) padding-box, linear-gradient(to right, #0B92F0, #0FF4C6) border-box",
            }}
            src={imageURL + SpecImageURL}
            alt={title}
          />
        </Link>
      ) : (
        <ChakraIMG
          w="100%"
          // h={givenHeight ? givenHeight : "auto"}
          borderRadius="8px"
          border="4px solid"
          borderColor="brand.dark.600"
          boxShadow="0px 20px 15px -10px black"
          background="linear-gradient(#141414 97%, #030303) border-box"
          src={imageURL + SpecImageURL}
          alt={title}
        />
      )}
    </Skeleton>
  );
};

export default WatchCard;
