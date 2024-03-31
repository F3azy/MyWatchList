import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import useFetch from "@/hooks/useFetch";
import { APIResults, MultiMedia } from "@/types/common";
import { createApiUrl } from "@/utils";
import { useMediaQuery } from "@chakra-ui/react";

const TrendingToday = () => {
  const {
    data: carousel,
    loading,
    error,
  } = useFetch<APIResults<MultiMedia[]>>(createApiUrl("trending/all/day"));

  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

  return (
    <Carousel
      carouselTitle="Trending Today"
      elementsTotal={carousel?.results.length as number}
      visibleElements={isLargerThan1280 ? 5 : 3.5}
      isloading={loading}
      isScrollable={!isLargerThan1280}
      showScroll={false}
      gap={isSmallerThan768 ? 10 : 20}
    >
      {carousel?.results.map((watchcard) => (
        <CarouselItem key={watchcard.id}>
          <WatchCard watchCard={watchcard} media_type={watchcard?.media_type} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default TrendingToday;
