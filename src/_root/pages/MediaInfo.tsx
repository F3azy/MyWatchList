import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  MediaImages,
  MultiDetails,
  Providers,
  Similar,
  Videos,
  MultiCertification,
  Recommended,
  MediaImageProp,
} from "@/types/mediaInfo";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import useFetch from "@/hooks/useFetch";
import useFetchRandomPage from "@/hooks/useFetchRandomPage";
import MainMediaInfo from "@/components/pages/MediaInfo/MainMediaInfo";
import TabMediaInfo from "@/components/pages/MediaInfo/TabMediaInfo";
import TabSeasons from "@/components/pages/MediaInfo/TabSeasons";

const imageURL = "https://image.tmdb.org/t/p/original/";

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

  const media_certification =
    media_type === "movie"
      ? certification?.results
          .find((cer) => cer.iso_3166_1 === "US")
          ?.release_dates?.at(0)?.certification
      : certification?.results.find((cer) => cer.iso_3166_1 === "US")?.rating;

  const media_logo =
    images?.logos[Math.round(Math.random() * (images?.logos.length - 1))];

  return (
    <Flex direction="column" rowGap="28px">
      <Flex overflow="hidden" position="relative">
        <Box flex={0.4} position="relative" zIndex={11} bg="brand.dark.base">
          <MainMediaInfo
            details={details as MultiDetails}
            media_logo={media_logo as MediaImageProp}
            media_certification={media_certification as string}
            videos={videos as Videos}
          />
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
              {details?.seasons && <TabSeasons details={details as MultiDetails} />}
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
            <TabMediaInfo
              details={details as MultiDetails}
              media_certification={media_certification as string}
              providers={providers as Providers}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MediaInfo;
