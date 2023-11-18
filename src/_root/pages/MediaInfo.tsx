import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import useFetch from "@/hooks/useFetch";
import { Multi } from "@/types/common";
import { MediaImages, MultiDetails, Providers, Similar, Videos } from "@/types/mediaInfo";

const imageURL = "https://image.tmdb.org/t/p/original/";
const maxElements = 50;

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

  const { data: images, loading: loadingImages } = useFetch<MediaImages>(urlImages);

  const { data: details } = useFetch<MultiDetails>(urlDetails);

  const { data: providers } = useFetch<Providers>(urlWatchProviders);
  
  const { data: videos } = useFetch<Videos>(urlVideos);

  const { data: similar } = useFetch<Similar>(urlSimilar);

  return (
    <Flex direction="column" rowGap="28px">
      <Flex overflow="hidden" position="relative">
        <Box flex={0.4} position="relative" zIndex={11} bg="brand.dark.base">
          <VStack pr="60px" py="40px">
            {images?.logos[0] ? (
              <Image
                w="60%"
                src={imageURL + images?.logos[0].file_path}
                alt={name ? name + "logo" : "media_logo"}
              />
            ) : (
              <Heading>{details?.name || details?.title}</Heading>
            )}
          </VStack>
        </Box>
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left="40%"
          right="30%"
          zIndex={10}
          bg="linear-gradient(to right, #141414, #14141400)"
        />
        <Box flex={0.6}>
          <Carousel
            elementsTotal={
              images?.backdrops.slice(0, maxElements).length as number
            }
            showButtons={false}
            gap={0}
            visibleElements={1}
            animate={true}
            isloading={loadingImages}
          >
            {images?.backdrops.slice(0, maxElements).map((image, idx) => (
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
      {/* <Carousel
        elementsTotal={images?.backdrops.slice(0, maxElements).length as number}
        visibleElements={3}
        animate={true}
        isloading={loadingImages}
      >
        {images?.backdrops.slice(0, maxElements).map((image, idx) => (
          <CarouselItem key={idx}>
            <Image
              borderRadius="8px"
              border="4px solid"
              borderColor="brand.dark.600"
              boxShadow="0px 20px 15px -10px black"
              background="linear-gradient(#141414 97%, #030303) border-box"
              src={imageURL + image.file_path}
              alt={name ? name + idx : idx.toString()}
            />
          </CarouselItem>
        ))}
      </Carousel> */}
      <Carousel
        carouselTitle={"Similar"}
        elementsTotal={similar?.results.filter((m) => m.poster_path != null).length as number}
        visibleElements={8}
      >
        {similar?.results.filter((m) => m.poster_path != null)?.map((watchcard) => (
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
    </Flex>
  );
};

export default MediaInfo;
