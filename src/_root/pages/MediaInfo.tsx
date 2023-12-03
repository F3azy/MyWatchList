import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  MediaImages,
  MultiDetails,
  Providers,
  Similar,
  Videos,
  MultiCertification,
  Recommended,
  Season,
  MediaImageProp,
} from "@/types/mediaInfo";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import Ratings from "@/components/Ratings";
import EpisodeCard from "@/components/EpisodeCard";
import useFetch from "@/hooks/useFetch";
import useFetchRandomPage from "@/hooks/useFetchRandomPage";
import MediaDetail from "@/components/MediaDetail";
import WatchProvider from "@/components/WatchProvider";

const imageURL = "https://image.tmdb.org/t/p/original/";

function switchWidthForLogoImage(height: number, width: number): string {
  if (width / height < 1.5) return "15%";
  if (width / height < 2) return "25%";
  if (width / height < 2.5) return "35%";
  if (width / height < 3) return "45%";

  return "60%";
}

const MediaInfo = () => {
  const { media_type, name, id } = useParams();

  const urlDetails = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const urlWatchProviders = `https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }`;
  const urlSimilar = `https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const urlImages = `https://api.themoviedb.org/3/${media_type}/${id}/images?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&include_image_language=en,null`;
  const urlVideos = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const urlRecommended = `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US&page=1`;
  const urlCertification =
    media_type === "movie"
      ? `https://api.themoviedb.org/3/${media_type}/${id}/release_dates?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US`
      : `https://api.themoviedb.org/3/${media_type}/${id}/content_ratings?api_key=${
          import.meta.env.VITE_MOVIE_API_KEY
        }&language=en-US`;

  const { data: images, loading: loadingImages } =
    useFetch<MediaImages>(urlImages);

  const { data: details } = useFetch<MultiDetails>(urlDetails);

  const { data: providers } = useFetch<Providers>(urlWatchProviders);

  const { data: videos } = useFetch<Videos>(urlVideos);

  const { data: recommended } = useFetchRandomPage<Recommended>(urlRecommended);

  const { data: similar } = useFetchRandomPage<Similar>(urlSimilar);

  const { data: certification } =
    useFetch<MultiCertification>(urlCertification);

  const hours: string =
    Math.floor((details?.runtime as number) / 60) +
    "h " +
    ((details?.runtime as number) % 60 === 0
      ? ""
      : ((details?.runtime as number) % 60) + "min");

  const media_certification =
    media_type === "movie"
      ? certification?.results
          .find((cer) => cer.iso_3166_1 === "US")
          ?.release_dates?.at(0)?.certification
      : certification?.results.find((cer) => cer.iso_3166_1 === "US")?.rating;

  const trailers = videos?.results.filter(
    (video) =>
      video?.type.toLowerCase() === "trailer" &&
      video?.site.toLowerCase() === "youtube"
  );

  const [media_logo, setMedia_logo] = useState<MediaImageProp>();
  const [currentSeason, setCurrentSeason] = useState(1);

  useEffect(() => {
    setCurrentSeason(1);
  }, [id]);

  useEffect(() => {
    setMedia_logo(
      images?.logos[
        Math.round(Math.random() * (images?.logos.length - 1))
      ] as MediaImageProp
    );
  }, [images]);

  const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${currentSeason}?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;

  const { data: seasonInfo } = useFetch<Season>(seasonUrl);

  return (
    <Flex direction="column" rowGap="28px">
      <Flex overflow="hidden" position="relative">
        <Box flex={0.4} position="relative" zIndex={11} bg="brand.dark.base">
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
                alt={name ? name + "-logo" : "media_logo"}
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
                      : new Date(details?.first_air_date)
                          .getFullYear()
                          .toString() +
                        "-" +
                        new Date(details?.last_air_date)
                          .getFullYear()
                          .toString()}
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
                    genre.name +
                    (idx != details?.genres.length - 1 ? " | " : "")
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
        </Box>
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right="30%"
          left="40%"
          zIndex={10}
          bg="linear-gradient(to right, #141414, transparent)"
        />
        <Box flex={0.6}>
          <Carousel
            elementsTotal={images?.backdrops.length as number}
            showButtons={false}
            gap={0}
            visibleElements={1}
            animate={(images?.backdrops.length as number) <= 2 ? false : true}
            isloading={loadingImages}
          >
            {images?.backdrops.map((image, idx) => (
              <CarouselItem key={idx}>
                <Image
                  src={imageURL + image.file_path}
                  alt={name ? name + idx : idx.toString()}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      </Flex>
      <Tabs variant="brandColor">
        <TabList>
          {media_type === "tv" && <Tab>Seasons</Tab>}
          {!!recommended?.results.length && <Tab>Recommended</Tab>}
          {!!similar?.results.length && <Tab>Similar</Tab>}
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          {media_type === "tv" && (
            <TabPanel px={0} minH="200px">
              {details?.seasons && (
                <Tabs variant="seasons">
                  <TabList>
                    {details?.seasons
                      .filter(
                        (season) =>
                          season.season_number !== 0 &&
                          season.episode_count !== 0
                      )
                      .map((season) => (
                        <Tab
                          key={season.season_number}
                          onClick={() => setCurrentSeason(season.season_number)}
                        >
                          {season.name}
                        </Tab>
                      ))}
                    {details?.seasons
                      .filter(
                        (season) =>
                          season.season_number === 0 &&
                          season.episode_count !== 0
                      )
                      .map((season) => (
                        <Tab
                          key={season.season_number}
                          onClick={() => setCurrentSeason(season.season_number)}
                        >
                          {season.name}
                        </Tab>
                      ))}
                  </TabList>
                  <TabPanel>
                    {seasonInfo && (
                      <Carousel
                        elementsTotal={
                          seasonInfo?.episodes.filter(
                            (m) => m.still_path != null
                          ).length as number
                        }
                        visibleElements={5}
                      >
                        {seasonInfo?.episodes
                          .filter((m) => m.still_path != null)
                          ?.map((episode) => (
                            <CarouselItem key={episode.episode_number}>
                              <EpisodeCard episode={episode} />
                            </CarouselItem>
                          ))}
                      </Carousel>
                    )}
                  </TabPanel>
                </Tabs>
              )}
            </TabPanel>
          )}

          {!!recommended?.results.length && (
            <TabPanel px={0}>
              <Carousel
                elementsTotal={
                  recommended?.results.filter((m) => m.poster_path != null)
                    .length as number
                }
                visibleElements={8}
              >
                {recommended?.results
                  .filter((m) => m.poster_path != null)
                  ?.map((watchcard) => (
                    <CarouselItem key={watchcard.id}>
                      <WatchCard
                        id={watchcard.id}
                        media_type={watchcard.media_type}
                        title={watchcard?.name || watchcard?.title}
                        SpecImageURL={watchcard?.poster_path}
                      />
                    </CarouselItem>
                  ))}
              </Carousel>
            </TabPanel>
          )}

          {!!similar?.results.length && (
            <TabPanel px={0}>
              <Carousel
                elementsTotal={
                  similar?.results.filter((m) => m.poster_path != null)
                    .length as number
                }
                visibleElements={8}
              >
                {similar?.results
                  .filter((m) => m.poster_path != null)
                  ?.map((watchcard) => (
                    <CarouselItem key={watchcard.id}>
                      <WatchCard
                        id={watchcard.id}
                        media_type={media_type}
                        title={watchcard?.name || watchcard?.title}
                        SpecImageURL={watchcard?.poster_path}
                      />
                    </CarouselItem>
                  ))}
              </Carousel>
            </TabPanel>
          )}

          <TabPanel px={0}>
            <VStack gap="12px" align="flex-start">
              <Heading as="h2">{details?.name || details?.title}</Heading>
              <Flex justify="space-between">
                {details?.overview && (
                  <Text flex={0.5} textAlign="justify" fontSize="20px">
                    {details?.overview}
                  </Text>
                )}
                <Flex flex={0.5} justify="space-evenly">
                  <VStack gap="16px" align="flex-start">
                    {(details?.runtime || details?.episode_run_time) && (
                      <MediaDetail
                        label="Run time:"
                        value={
                          details?.runtime
                            ? hours
                            : details?.episode_run_time + " min"
                        }
                      />
                    )}

                    {(details?.release_date || details?.first_air_date) && (
                      <MediaDetail
                        label="Released:"
                        value={
                          details?.release_date
                            ? new Date(details?.release_date)
                                .getFullYear()
                                .toString()
                            : new Date(details?.first_air_date)
                                .getFullYear()
                                .toString() +
                              "-" +
                              new Date(details?.last_air_date)
                                .getFullYear()
                                .toString()
                        }
                      />
                    )}

                    {details?.genres && (
                      <MediaDetail
                        label="Genres:"
                        value={details?.genres
                          .map((genre) => genre.name)
                          .join(", ")}
                      />
                    )}
                  </VStack>
                  <VStack gap="16px" align="flex-start">
                    {media_certification && (
                      <MediaDetail label="Age:" value={media_certification} />
                    )}
                    {details?.created_by && (
                      <MediaDetail
                        label="Created by:"
                        value={details?.created_by
                          .map((creator) => creator.name)
                          .join(", ")}
                      />
                    )}
                    {details?.vote_average && (
                      <MediaDetail
                        label="Rating:"
                        value={details?.vote_average + "/10"}
                      />
                    )}
                  </VStack>
                </Flex>
              </Flex>
              {providers?.results["US"] && (
                <Flex gap="60px">
                  {Object.keys(providers?.results["US"]).map((keyName, i) => {
                    type ProvidersKey = keyof Providers["results"]["US"];
                    if (keyName !== "link")
                      return (
                        <WatchProvider
                          key={i}
                          label={keyName.toUpperCase()}
                          providers={providers?.results["US"][keyName as ProvidersKey]}
                        />
                      );
                  })}
                </Flex>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MediaInfo;
