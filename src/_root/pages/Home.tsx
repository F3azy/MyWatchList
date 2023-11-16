import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import Collection from "@/components/Collection";
import CollectionBoxes from "@/constans/CollectionBoxes";
import { HomeCarousels } from "@/constans/HomeCarousel";
import { Multi } from "@/types/common";
import useMultipleFetch from "@/hooks/useMultipleFetch";

const Home = () => {
  const {
    data: carousels,
    loading,
    error,
  } = useMultipleFetch<{ results: Multi[] }>(HomeCarousels.urls);

  console.log(carousels);

  return (
    <Flex direction="column" rowGap="28px">
      <Grid templateColumns="repeat(6, 1fr)" gap={5}>
        {CollectionBoxes.map((collection) => (
          <GridItem key={collection.name}>
            <Collection
              name={collection.name}
              logoSrc={collection.logoSrc}
              videoSrc={collection.videoSrc}
            />
          </GridItem>
        ))}
      </Grid>
      {carousels?.map((carousel, idx) => (
        <Carousel
          key={idx}
          carouselTitle={HomeCarousels.titles[idx]}
          elementsTotal={carousel.results.length}
          visibleElements={5}
          isloading={loading}
        >
          {carousel.results.map((watchcard) => (
            <CarouselItem key={watchcard.id}>
              <WatchCard
                id={watchcard.id}
                media={watchcard.media_type}
                title={watchcard.name || watchcard.title}
                SpecImageURL={watchcard.poster_path}
              />
            </CarouselItem>
          ))}
        </Carousel>
      ))}
    </Flex>
  );
};

export default Home;
