import { useState, useEffect } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Movie } from "@/types/common";
import Carousel from "@/components/shared/Carousel";
import Collection from "@/components/Collection";
import { CollectionBoxes } from "@/constans/CollectionBoxes";
import {
  HomeMovieCarouselsArray,
  HomeTrendingCarouselsArray,
  HomeTVCarouselsArray,
} from "@/constans/HomeCarousel";

const URL = "https://api.themoviedb.org/3/";

const Home = () => {
  const [trendingCarousels, setTrendingCarousels] = useState<Array<Movie[]>>(
    []
  );
  const [movieCarousels, setMovieCarousels] = useState<Array<Movie[]>>([]);
  const [tvCarousels, setTVCarousels] = useState<Array<Movie[]>>([]);
  const [isloading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    // setTrendingCarousels([]);
    // setMovieCarousels([]);
    // setTVCarousels([]);
    setIsLoading(true);

    async function fetchData(fetchUrl: string) {
      try {
        const response = await fetch(fetchUrl);
        const json = await response.json();

        return json.results;
      } catch (error) {
        console.error(`Error fetching for carousel:`, error);
      }
    };

    const trendingFetchPromises = HomeTrendingCarouselsArray.map((carousel) => {
      const randomPage = Math.floor(
        Math.random() * ((carousel.pageQuantity || 10) - 1 + 1) + 1
      );

      return fetchData(
        URL +
          carousel.url +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${
            carousel.randomPage ? `&page=${randomPage}` : ""
          }`
      );
    });
    Promise.all(trendingFetchPromises)
      .then((fetchedData) => {
        setTrendingCarousels(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching trending carousels:", error);
      });

    const movieFetchPromises = HomeMovieCarouselsArray.map((carousel) => {
      const randomPage = Math.floor(
        Math.random() * ((carousel.pageQuantity || 10) - 1 + 1) + 1
      );

      return fetchData(
        URL +
          "movie" +
          carousel.url +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${
            carousel.randomPage ? `&page=${randomPage}` : ""
          }`
      );
    });

    Promise.all(movieFetchPromises)
      .then((fetchedData) => {
        setMovieCarousels(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching movie carousels:", error);
      });

    const tvFetchPromises = HomeTVCarouselsArray.map((carousel) => {
      const randomPage = Math.floor(
        Math.random() * ((carousel.pageQuantity || 10) - 1 + 1) + 1
      );

      return fetchData(
        URL +
          "tv" +
          carousel.url +
          `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${
            carousel.randomPage ? `&page=${randomPage}` : ""
          }`
      );
    });
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
