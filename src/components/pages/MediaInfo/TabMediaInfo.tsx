import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  MediaProductionMember,
  MultiDetails,
  Providers,
} from "@/types/mediaInfo";
import MediaDetail from "@/components/pages/MediaInfo/MediaDetail";
import WatchProviders from "@/components/pages/MediaInfo/WatchProvider";
import { getYear, minutesToHours } from "@/utils";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import ProductionMemberCard from "./ProductionMemberCard";
import SeasonSelect from "./SeasonSelect";

const TabMediaInfo = ({
  details,
  media_certification,
  providers,
  cast,
  crew,
  media_type,
  setSeason,
}: {
  details: MultiDetails;
  media_certification: string;
  providers: Providers;
  cast: MediaProductionMember[];
  crew: MediaProductionMember[];
  media_type: string;
  setSeason: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

  return (
    <VStack gap={{ base: "16px", xl: "24px" }} align="flex-start">
      <Heading as="h2" fontSize={{ base: "24px", xl: "auto" }}>
        {details?.name || details?.title}
      </Heading>
      <Flex
        direction={{ base: "column", xl: "row" }}
        gap={{ base: "20px", xl: "120px" }}
      >
        {details?.overview && (
          <Text flex={0.6} textAlign="justify" fontSize="20px">
            {details?.overview}
          </Text>
        )}
        <Grid
          flex={0.4}
          templateColumns="repeat(2, 1fr)"
          columnGap={{ base: "60px", xl: "32px" }}
          rowGap={{ base: "20px", xl: "16px" }}
        >
          <GridItem
            display={
              details?.runtime || details?.episode_run_time?.length
                ? ""
                : "none"
            }
          >
            <MediaDetail
              label="Run time:"
              value={
                details?.runtime
                  ? minutesToHours(details?.runtime as number)
                  : details?.episode_run_time + " min"
              }
            />
          </GridItem>

          <GridItem
            display={
              details?.release_date || details?.first_air_date ? "" : "none"
            }
          >
            <MediaDetail
              label="Released:"
              value={
                details?.release_date
                  ? getYear(details?.release_date)
                  : getYear(details?.first_air_date) +
                    "-" +
                    getYear(details?.last_air_date)
              }
            />
          </GridItem>

          <GridItem display={details?.genres ? "" : "none"}>
            <MediaDetail
              label="Genres:"
              value={details?.genres?.map((genre) => genre.name).join(", ")}
            />
          </GridItem>

          <GridItem display={media_certification ? "" : "none"}>
            <MediaDetail label="Age:" value={media_certification} />
          </GridItem>

          <GridItem
            display={
              details?.created_by && details?.created_by.length ? "" : "none"
            }
          >
            <MediaDetail
              label="Created by:"
              value={details?.created_by
                ?.map((creator) => creator.name)
                .join(", ")}
            />
          </GridItem>

          <GridItem display={details?.vote_average !== 0 ? "" : "none"}>
            <MediaDetail
              label="Rating:"
              value={details?.vote_average + "/10"}
            />
          </GridItem>

          <GridItem display={details?.next_episode_to_air ? "" : "none"}>
            <MediaDetail
              label="Next episode:"
              value={details?.next_episode_to_air?.air_date}
            />
          </GridItem>
        </Grid>
      </Flex>

      <Flex
        display={providers?.results["US"] ? "flex" : "none"}
        gap={{ base: "20px 40px", xl: "40px 60px" }}
        wrap="wrap"
        mt={5}
      >
        {Object.keys(providers?.results["US"] || {})?.map((keyName, i) => {
          type ProvidersKey = keyof Providers["results"]["US"];
          if (keyName !== "link")
            return (
              <WatchProviders
                key={i}
                label={keyName.toUpperCase()}
                providers={providers?.results["US"][keyName as ProvidersKey]}
              />
            );
        })}
      </Flex>

      <Box mt={5}>
        {media_type === "tv" && (
          <SeasonSelect details={details} setSeason={setSeason} />
        )}
        <VStack align="flex-start" minH="200px">
          <Text fontWeight="semibold" fontSize="20px" color="brand.secondary">
            Cast:
          </Text>
          {!!cast?.length ? (
            <Carousel
              elementsTotal={cast?.length}
              visibleElements={
                isLargerThan1280
                  ? cast?.length < 8
                    ? 6
                    : 8
                  : isSmallerThan768
                  ? 2.5
                  : 4.5
              }
              isScrollable={!isLargerThan1280}
              showScroll={false}
              gap={isSmallerThan768 ? 10 : 20}
            >
              {cast?.map((member) => (
                <CarouselItem key={member.id}>
                  <ProductionMemberCard member={member} />
                </CarouselItem>
              ))}
            </Carousel>
          ) : (
            <Text fontWeight="semibold" fontSize="20px">
              Nothing found
            </Text>
          )}
        </VStack>
        <VStack mt="12px" align="flex-start" minH="200px">
          <Text fontWeight="semibold" fontSize="20px" color="brand.secondary">
            Crew:
          </Text>
          {!!crew?.length ? (
            <Carousel
              elementsTotal={crew?.length as number}
              visibleElements={
                isLargerThan1280
                  ? cast?.length < 10
                    ? 6
                    : 10
                  : isSmallerThan768
                  ? 3.5
                  : 5.5
              }
              isScrollable={!isLargerThan1280}
              showScroll={false}
              gap={isSmallerThan768 ? 10 : 20}
            >
              {crew?.map((member, idx) => (
                <CarouselItem key={idx}>
                  <ProductionMemberCard member={member} />
                </CarouselItem>
              ))}
            </Carousel>
          ) : (
            <Text fontWeight="semibold" fontSize="20px">
              Nothing found
            </Text>
          )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default TabMediaInfo;
