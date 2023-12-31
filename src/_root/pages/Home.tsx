import { Flex, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import Collection from "@/components/pages/Home/Collection";
import CollectionBoxes from "@/constans/CollectionBoxes";
import { HomeCarousels } from "@/constans/HomeCarousel";
import { APIResults, MultiMedia } from "@/types/common";
import useMultipleFetch from "@/hooks/useMultipleFetch";

const Home = () => {
  const {
    data: carousels,
    loading,
    error,
  } = useMultipleFetch<APIResults<MultiMedia[]>>(HomeCarousels.urls);

  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

  return (
    <Flex direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(6, 1fr)" }}
        rowGap={{ base: 4, xl: 5 }}
        columnGap={{ base: 3, xl: 5 }}
      >
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
          visibleElements={isLargerThan1280 ? 5 : 3.5}
          isloading={loading}
          isScrollable={!isLargerThan1280}
          showScroll={false}
          gap={isSmallerThan768 ? 10 : 20}
        >
          {carousel.results.map((watchcard) => (
            <CarouselItem key={watchcard.id}>
              <WatchCard
                watchCard={watchcard}
                media_type={
                  watchcard?.media_type || HomeCarousels.media_type[idx]
                }
              />
            </CarouselItem>
          ))}
        </Carousel>
      ))}
    </Flex>
  );
};

export default Home;
