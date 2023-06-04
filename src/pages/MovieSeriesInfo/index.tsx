import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from '../../components/Slider';
import { Movie } from '../../types/common';

const MovieSeriesInfo = () => {
  const { type, id } = useParams();

  const urlDetails = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const urlWatchProviders = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`;
  const urlSimilar = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const urlImages = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&include_image_language=null`;
  const urlVideos = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const [details, setDetails] = useState(() => {return {}});
  const [watchProviders, setWatchProviders] = useState(() => {return {}});
  const [similar, setSimilar] = useState<Movie[]>(() => {return []});
  const [images, setImages] = useState<any[]>(() => {return []});
  const [videos, setVideos] = useState(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});

  useEffect(() => {
    setIsLoading(true);
    const fetching = async () => {
      try {
        const detailsResponse = await fetch(urlDetails);
        const detailsJSON = await detailsResponse.json();
        setDetails(detailsJSON);

        const watchProviderssResponse = await fetch(urlWatchProviders);
        const watchProvidersJSON = await watchProviderssResponse.json();
        setWatchProviders(watchProvidersJSON.results)

        const similarResponse = await fetch(urlSimilar);
        const similarJSON = await similarResponse.json();
        setSimilar(similarJSON.results)
        
        const imagesResponse = await fetch(urlImages);
        const imagesJSON = await imagesResponse.json();
        setImages(imagesJSON.backdrops);

        const videosResponse = await fetch(urlVideos);
        const videosJSON = await videosResponse.json();
        setVideos(videosJSON.results)

        console.log(similarJSON.results);
        
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
      catch (error) {
        console.error(`Error fetching movie info:`, error);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
    }

    fetching();
  }, [id]);

  return (
    <Flex direction="column" rowGap="28px">
      <Slider columnGap={20} watchCards={images} pages={images.length/2} visible={2} isLink={false}/>
      {/* <Slider sliderTitle='Similar' columnGap={20} watchCards={similar} pages={images.length/5} sliderType='movie' visible={5} isLink={true}/> */}
      <Slider isLink={true} columnGap={20} sliderTitle='Similar' sliderType='movie' pages={images.length/5} visible={5} watchCards={similar} isloading={isloading} />

    </Flex>
  )
};

export default MovieSeriesInfo;
