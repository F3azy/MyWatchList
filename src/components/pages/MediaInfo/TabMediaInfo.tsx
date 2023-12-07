import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
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
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}) => {


  return (
    <VStack gap="24px" align="flex-start">
      <Heading as="h2">{details?.name || details?.title}</Heading>
      <Flex gap="120px">
        {details?.overview && (
          <Text flex={0.5} textAlign="justify" fontSize="20px">
            {details?.overview}
          </Text>
        )}
        <Grid flex={0.5} templateColumns="repeat(2, 1fr)" gap="16px">
          {!!(details?.runtime || details?.episode_run_time.length) && (
            <GridItem>
              <MediaDetail
                label="Run time:"
                value={
                  details?.runtime
                    ? minutesToHours(details?.runtime as number)
                    : details?.episode_run_time + " min"
                }
              />
            </GridItem>
          )}
          {(details?.release_date || details?.first_air_date) && (
            <GridItem>
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
          )}
          {details?.genres && (
            <GridItem>
              <MediaDetail
                label="Genres:"
                value={details?.genres.map((genre) => genre.name).join(", ")}
              />
            </GridItem>
          )}
          {media_certification && (
            <GridItem>
              <MediaDetail label="Age:" value={media_certification} />
            </GridItem>
          )}
          {!!(details?.created_by && details?.created_by.length) && (
            <GridItem>
              <MediaDetail
                label="Created by:"
                value={details?.created_by
                  .map((creator) => creator.name)
                  .join(", ")}
              />
            </GridItem>
          )}
          {details?.vote_average && (
            <GridItem>
              <MediaDetail
                label="Rating:"
                value={details?.vote_average + "/10"}
              />
            </GridItem>
          )}
        </Grid>
      </Flex>
      {providers?.results["US"] && (
        <Flex gap="40px 60px" wrap="wrap">
          {Object.keys(providers?.results["US"]).map((keyName, i) => {
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
      )}
      <Box>
        {media_type === "tv" && (
          <SeasonSelect details={details} setSeason={setSeason} />
        )}
        <VStack align="flex-start" minH="200px">
          <Text fontWeight="semibold" fontSize="20px" color="brand.secondary">
            Cast:
          </Text>
          {!!cast?.length ? (
            <Carousel elementsTotal={cast?.length} visibleElements={8}>
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
        <VStack align="flex-start" minH="200px">
          <Text fontWeight="semibold" fontSize="20px" color="brand.secondary">
            Crew:
          </Text>
          {!!crew?.length ? (
            <Carousel
              elementsTotal={crew?.length as number}
              visibleElements={10}
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
