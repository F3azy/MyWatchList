import { Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import WatchCard from "@/components/shared/WatchCard";
import { useFetch } from "@/hooks/fetchData";

const imageURL = "https://image.tmdb.org/t/p/original/";

const MovieSeriesInfo = () => {
  const { type, name, id } = useParams();

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
  const [details, setDetails] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [videos, setVideos] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDetails({});
    setWatchProviders([]);

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

        const imagesResponse = await fetch(urlImages);
        const imagesJSON = await imagesResponse.json();

        const videosResponse = await fetch(urlVideos);
        const videosJSON = await videosResponse.json();
        setVideos(videosJSON.results);
      } catch (error) {
        console.error(`Error fetching movie info:`, error);
      }
    };

    fetching();
    setIsLoading(false);
  }, [id]);

  const { data: images, loading: loadingImages } = useFetch<{
    backdrops: {
      file_path: string;
    }[];
  }>(urlImages);

  const { data: similar } = useFetch<{
    results: {
      id: number;
      poster_path: string;
      name?: string;
      title?: string;
    }[];
  }>(urlSimilar);

  return (
    <Flex direction="column" rowGap="28px">
      <Carousel
        elementsTotal={images?.backdrops?.length as number}
        visibleElements={3}
        animate={true}
        isloading={loadingImages}
      >
        {images?.backdrops.map((image, idx) => (
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
      </Carousel>
      <Carousel
        carouselTitle={"Similar"}
        elementsTotal={similar?.results.length as number}
        visibleElements={8}
      >
        {similar?.results?.map((watchcard) => (
          <CarouselItem key={watchcard.id}>
            <WatchCard
              id={watchcard.id}
              type={type}
              title={watchcard?.name || watchcard?.title}
              SpecImageURL={watchcard?.poster_path}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </Flex>
  );
};

export default MovieSeriesInfo;
