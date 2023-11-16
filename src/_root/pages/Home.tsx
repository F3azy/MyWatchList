import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { Movie } from "@/types/common";
import Carousel from "@/components/shared/Carousel";
import Collection from "@/components/Collection";
import { CollectionBoxes } from "@/constans/CollectionBoxes";
import { HomeCarousels } from "@/constans/HomeCarousel";
import useMultipleFetch from "@/hooks/useMultipleFetch";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";

const Home = () => {
  const { data, loading, error } = useMultipleFetch<Movie[]>(
    HomeCarousels.urls
  );

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
      <Flex direction="column" rowGap="28px">
        {data?.map((carousel, idx) => 
          <Carousel
            key={idx}
            carouselTitle={HomeCarousels.titles[idx]}
            elementsTotal={carousel.length}
            visibleElements={5}
            isloading={loading}
          >
            {carousel.map((watchcard) => 
              <CarouselItem key={watchcard.id}>
                <WatchCard
                  id={watchcard.id}
                  type={
                    watchcard.media_type
                      ? (watchcard.media_type as string)
                      : "tv"
                  }
                  title={watchcard?.name || (watchcard?.title as string)}
                  SpecImageURL={
                    watchcard?.poster_path || (watchcard?.file_path as string)
                  }
                />
              </CarouselItem>
            )}
          </Carousel>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
