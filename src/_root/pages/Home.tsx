import { useState, useEffect } from "react";
import Carousel from "@/components/shared/Carousel";
import { Movie } from "@/types/common";
import {
  HomeMovieCarouselsArray,
  HomeTrendingCarouselsArray,
 HomeTVCarouselsArray,
} from "@/constans/HomeCarousel";
import { useLocation } from "react-router-dom";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { CollectionBoxes } from "@/constans/CollectionBoxes";
import Collection from "@/components/Collection";

const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [trendingCarousels, setTrendingCarousels] = useState<Array<Movie[]>>([]);
  const [movieCarousels, setMovieCarousels] = useState<Array<Movie[]>>([]);
  const [tvCarousels, setTVCarousels] = useState<Array<Movie[]>>([]);
  const [isloading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setTrendingCarousels([]);
    setMovieCarousels([]);
    setTVCarousels([]);
    setIsLoading(true);

    const fetching = async (
      carouselType: string,
      carouselUrl: string,
      carouselTitle: string,
      random?: boolean,
      pageQuantity: number = 10
    ) => {
      try {
        const randomPage = Math.floor(
          Math.random() * (pageQuantity - 1 + 1) + 1
        );
        const response = await fetch(
          url +
            (carouselType ? carouselType : "") +
            carouselUrl +
            `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${
              random ? `&page=${randomPage}` : ""
            }`
        );
        const json = await response.json();

        return json.results.filter((m: Movie) => m.poster_path != null);

      } catch (error) {
        console.error(`Error fetching for carousel (${carouselTitle}):`, error);
      }
    };

    const trendingFetchPromises = HomeTrendingCarouselsArray.map((carousel) =>
      fetching(
        "",
        carousel.url,
        carousel.title,
        carousel.randomPage,
        carousel.pageQuantity
      )
    );
    Promise.all(trendingFetchPromises)
      .then((fetchedData) => {
        setTrendingCarousels(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching trending carousels:", error);
      });

    const movieFetchPromises = HomeMovieCarouselsArray.map((carousel) =>
      fetching("movie", carousel.url, carousel.title, carousel.randomPage)
    );
    Promise.all(movieFetchPromises)
      .then((fetchedData) => {
        setMovieCarousels(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching movie carousels:", error);
      });

    const tvFetchPromises =HomeTVCarouselsArray.map((carousel) =>
      fetching("tv", carousel.url, carousel.title, carousel.randomPage)
    );
    Promise.all(tvFetchPromises)
      .then((fetchedData) => {
        setTVCarousels(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching tv carousels:", error);
      });

    setIsLoading(false);
  }, [location]);

  return (
    <Flex direction="column" rowGap="28px">
      <Grid w="100%" templateColumns="repeat(6, 1fr)" gap={6}>
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
      <Flex direction="column" rowGap="24px">
        {trendingCarousels?.map((carousel, idx) => (
          <Carousel
            isLink={true}
            key={idx}
            columnGap={20}
            carouselTitle={HomeTrendingCarouselsArray[idx].title}
            pages={carousel.length / 5}
            visible={5}
            watchCardMinH="300px"
            watchCards={carousel}
            isloading={isloading}
          />
        ))}
        {movieCarousels?.map((carousel, idx) => (
          <Carousel
            isLink={true}
            key={idx}
            columnGap={20}
            carouselTitle={HomeMovieCarouselsArray[idx].title}
            carouselType="movie"
            pages={carousel.length / 5}
            visible={5}
            watchCardMinH="300px"
            watchCards={carousel}
            isloading={isloading}
          />
        ))}
        {tvCarousels?.map((carousel, idx) => (
          <Carousel
            isLink={true}
            key={idx}
            columnGap={20}
            carouselTitle={HomeTVCarouselsArray[idx].title}
            carouselType="tv"
            pages={carousel.length / 5}
            visible={5}
            watchCardMinH="300px"
            watchCards={carousel}
            isloading={isloading}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
