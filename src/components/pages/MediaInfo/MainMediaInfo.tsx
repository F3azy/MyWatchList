import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MultiDetails, Videos, MediaImageProp } from "@/types/mediaInfo";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import Ratings from "@/components/pages/MediaInfo/Ratings";

const imageURL = "https://image.tmdb.org/t/p/original/";

function switchWidthForLogoImage(height: number, width: number): string {
  if (width / height < 1.5) return "15%";
  if (width / height < 2) return "25%";
  if (width / height < 2.5) return "35%";
  if (width / height < 3) return "45%";

  return "60%";
}

const MainMediaInfo = ({
  details,
  videos,
  media_logo,
  media_certification,
}: {
  details: MultiDetails | undefined;
  videos: Videos | undefined;
  media_logo: MediaImageProp | undefined;
  media_certification: string | undefined;
}) => {
  const hours: string =
    Math.floor((details?.runtime as number) / 60) +
    "h " +
    ((details?.runtime as number) % 60 === 0
      ? ""
      : ((details?.runtime as number) % 60) + "min");

  const trailers = videos?.results.filter(
    (video) =>
      video?.type.toLowerCase() === "trailer" &&
      video?.site.toLowerCase() === "youtube"
  );

  return (
    <VStack
      h="100%"
      maxH="100%"
      justify="center"
      gap="20px"
      fontWeight="bold"
      letterSpacing="1px"
    >
      {media_logo ? (
        <Image
          w={switchWidthForLogoImage(media_logo.height, media_logo.width)}
          src={imageURL + media_logo.file_path}
          alt={details?.name || details?.title}
        />
      ) : (
        <Heading as="h1" w="80%" textAlign="center">
          {details?.name || details?.title}
        </Heading>
      )}

      <Ratings rating={details?.vote_average as number} />

      {!(
        details?.runtime ||
        details?.number_of_seasons ||
        media_certification ||
        details?.release_date ||
        details?.first_air_date
      ) ? (
        ""
      ) : (
        <HStack justify="space-between" gap="60px" m="0 !important">
          {(details?.runtime || details?.number_of_seasons) && (
            <Text>
              {details?.runtime
                ? hours
                : "Seasons: " + details?.number_of_seasons}
            </Text>
          )}

          {media_certification && <Text>{media_certification}</Text>}

          {(details?.release_date || details?.first_air_date) && (
            <Text>
              {details?.release_date
                ? new Date(details?.release_date).getFullYear().toString()
                : new Date(details?.first_air_date).getFullYear().toString() +
                  "-" +
                  new Date(details?.last_air_date).getFullYear().toString()}
            </Text>
          )}
        </HStack>
      )}

      {details?.tagline !== "" && (
        <Text as="em" maxW="50%" textAlign="center" m="0 !important">
          <q>{details?.tagline}</q>
        </Text>
      )}

      {details?.overview && (
        <Text
          w="80%"
          m="0 !important"
          pr="4px"
          textAlign="justify"
          overflowY="scroll"
          maxH="120px"
          css={{
            "&::-webkit-scrollbar": {
              width: "13px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#56B4DC",
              border: "4px solid rgba(0, 0, 0, 0)",
              backgroundClip: "padding-box",
              borderRadius: "24px",
            },
          }}
        >
          {details?.overview}
        </Text>
      )}

      {details?.genres && (
        <Text m="0 !important">
          {details?.genres.map(
            (genre, idx) =>
              genre.name + (idx != details?.genres.length - 1 ? " | " : "")
          )}
        </Text>
      )}

      <HStack gap="16px" m="0 !important">
        {trailers?.length && (
          <Button
            variant="outline"
            leftIcon={<FaPlay />}
            onClick={() => {
              if (trailers?.length)
                window.open(
                  "https://www.youtube.com/watch/" +
                    trailers?.at(
                      Math.round(Math.random() * (trailers?.length - 1))
                    )?.key,
                  "_blank"
                );
            }}
          >
            Trailer
          </Button>
        )}
        {details?.homepage !== "" && (
          <Button
            variant="outline"
            leftIcon={<FaExternalLinkAlt />}
            onClick={() => {
              if (details?.homepage !== "")
                window.open(details?.homepage, "_blank");
            }}
          >
            Homepage
          </Button>
        )}
        <Box
          h="full"
          m="0 !important"
          p="4px"
          border="solid 1px"
          borderColor="brand.secondary"
          borderRadius="full"
          color="brand.secondary"
          _hover={{
            bg: "#56B4DC",
            color: "#141414",
            borderColor: "#56B4DC",
            cursor: "pointer",
          }}
          _active={{
            bg: "#3492BA",
            borderColor: "#3492BA",
          }}
        >
          <Icon as={IoAdd || IoCheckmark} boxSize="full" />
        </Box>
      </HStack>
    </VStack>
  );
};

export default MainMediaInfo;
