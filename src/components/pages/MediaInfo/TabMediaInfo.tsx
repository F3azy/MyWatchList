import { Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import { MultiDetails, Providers } from "@/types/mediaInfo";
import MediaDetail from "@/components/pages/MediaInfo/MediaDetail";
import WatchProviders from "@/components/pages/MediaInfo/WatchProvider";

const TabMediaInfo = ({
  details,
  media_certification,
  providers,
}: {
  details: MultiDetails | undefined;
  media_certification: string | undefined;
  providers: Providers | undefined;
}) => {
  const hours: string =
    Math.floor((details?.runtime as number) / 60) +
    "h " +
    ((details?.runtime as number) % 60 === 0
      ? ""
      : ((details?.runtime as number) % 60) + "min");

console.log(providers);


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
                  details?.runtime ? hours : details?.episode_run_time + " min"
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
                    ? new Date(details?.release_date).getFullYear().toString()
                    : new Date(details?.first_air_date)
                        .getFullYear()
                        .toString() +
                      "-" +
                      new Date(details?.last_air_date).getFullYear().toString()
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
          {details?.created_by && details?.created_by.length && (
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
    </VStack>
  );
};

export default TabMediaInfo;
