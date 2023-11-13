import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "@/components/shared/Carousel";
import { Movie } from "@/types/common";

const MovieSeriesInfo = () => {
  const { type, id } = useParams();

  const urlDetails = `https://api.themoviedb.org/3/${type}/${id}?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const urlWatchProviders = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }`;
  const urlSimilar = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const urlImages = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&include_image_language=en,null`;
  const urlVideos = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;
  const [details, setDetails] = useState(() => {
    return {};
  });
  const [watchProviders, setWatchProviders] = useState(() => {
    return {};
  });
  const [similar, setSimilar] = useState<Movie[]>(() => {
    return [];
  });
  const [images, setImages] = useState(() => {
    return [];
  });
  const [videos, setVideos] = useState(() => {
    return [];
  });
  const [isloading, setIsLoading] = useState(() => {
    return true;
  });

  useEffect(() => {
    setIsLoading(true);
    setDetails({});
    setWatchProviders([]);
    setSimilar([]);
    setImages([]);
    setVideos([]);
    const fetching = async () => {
      try {
        const detailsResponse = await fetch(urlDetails);
        const detailsJSON = await detailsResponse.json();
        setDetails(detailsJSON);

        const watchProviderssResponse = await fetch(urlWatchProviders);
        const watchProvidersJSON = await watchProviderssResponse.json();
        setWatchProviders(watchProvidersJSON.results);

        const randomPage = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        const similarResponse = await fetch(urlSimilar + `&page=${randomPage}`);
        const similarJSON = await similarResponse.json();
        setSimilar(
          similarJSON.results.filter((m: Movie) => m.poster_path != null)
        );

        const imagesResponse = await fetch(urlImages);
        const imagesJSON = await imagesResponse.json();
        if (imagesJSON.backdrops.length > 30)
          setImages(imagesJSON.backdrops.slice(0, 30));
        else setImages(imagesJSON.backdrops);

        const videosResponse = await fetch(urlVideos);
        const videosJSON = await videosResponse.json();
        setVideos(videosJSON.results);

        // console.log(similarJSON.results);
      } catch (error) {
        console.error(`Error fetching movie info:`, error);
      }
    };

    fetching();
    setIsLoading(false);
  }, [id]);

  return (
    <Flex direction="column" rowGap="28px">
      <Carousel
        id={id}
        columnGap={20}
        watchCards={images}
        pages={images.length / 2}
        visible={2}
        isLink={false}
        animate={true}
        isloading={isloading}
        watchCardMinH="300px"
      />
      <Carousel
        id={id}
        isLink={true}
        columnGap={20}
        carouselTitle="Similar"
        carouselType={type}
        pages={similar.length / 7}
        visible={7}
        watchCardMinH="200px"
        watchCards={similar}
        isloading={isloading}
      />
    </Flex>
  );
};

export default MovieSeriesInfo;
