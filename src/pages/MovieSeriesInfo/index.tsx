import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieSeriesInfo = () => {
  const { type, id } = useParams();

  const urlDetails = `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const urlWatchProviders = `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`;
  const urlSimilar = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const urlImages = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const urlVideos = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`;
  const [details, setDetails] = useState(() => {return {}});
  const [watchProviders, setWatchProviders] = useState(() => {return {}});
  const [similar, setSimilar] = useState(() => {return {}});
  const [images, setImages] = useState(() => {return []});
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
        setSimilar(imagesJSON.results)

        const videosResponse = await fetch(urlVideos);
        const videosJSON = await videosResponse.json();
        setSimilar(videosJSON.results)
        
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
  }, []);


  return (
    <div>
      Movie_Series_Info
    </div>
  )
};

export default MovieSeriesInfo;
