import {
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { MultiDetails, Videos } from "@/types/mediaInfo";
import { MediaImageProp } from "@/types/common";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import Ratings from "@/components/pages/MediaInfo/Ratings";
import { getYear, minutesToHours } from "@/utils";

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
  details: MultiDetails;
  videos: Videos;
  media_logo: MediaImageProp;
  media_certification: string;
}) => {
  const trailers = videos?.results.filter(
    (video) =>
      video?.type.toLowerCase() === "trailer" &&
      video?.site.toLowerCase() === "youtube"
  );

  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  return (
    <VStack
      w="full"
      h="full"
      maxH="full"
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
        <Heading as="h1" w={{xl: "80%"}} textAlign="center">
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
        <HStack w={{base: "full", md: "auto"}} justify="space-between" gap="60px" m="0 !important">
          {(details?.runtime || details?.number_of_seasons) && (
            <Text>
              {details?.runtime
                ? minutesToHours(details?.runtime as number)
                : "Seasons: " + details?.number_of_seasons}
            </Text>
          )}

          {media_certification && <Text>{media_certification}</Text>}

          {(details?.release_date || details?.first_air_date) && (
            <Text>
              {details?.release_date
                ? getYear(details?.release_date)
                : getYear(details?.first_air_date) +
                  "-" +
                  getYear(details?.last_air_date)}
            </Text>
          )}
        </HStack>
      )}

      {details?.tagline !== "" && (
        <Text as="em" maxW={{xl: "50%"}} textAlign="center" m="0 !important">
          <q>{details?.tagline}</q>
        </Text>
      )}

      {details?.overview && (
        <Text
          w={{xl: "80%"}}
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
        <Tooltip
          hasArrow
          fontSize="16px"
          label={"Add to watchlist" || "Remove from watchlist"}
          placement={isLargerThan1280 ? "right" : "top"}
        >
          <IconButton
            isRound={true}
            variant="full"
            aria-label="Add to list"
            p="4px"
            icon={<Icon as={IoAdd || IoCheckmark} boxSize="full" />}
          />
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default MainMediaInfo;
