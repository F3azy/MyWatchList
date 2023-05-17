import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Select, Skeleton } from '@chakra-ui/react';

const MovieSelect = ({type, setStateFun, changeFun}: {type: string, setStateFun: React.Dispatch<React.SetStateAction<string>>, changeFun?: React.ChangeEventHandler<HTMLSelectElement>}) => {

  const [genres, setGenres] = useState<any>(() => {return []});
  const [defaultVal, setDefaultVal] = useState(() => {return ""});
  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/genre/"});
  const [isloading, setIsLoading] = useState(() => {return true});
  
  useLayoutEffect(() => {
    setIsLoading(true);
    const fetching = async () => {
      const response  = await fetch(url+(type.toLocaleLowerCase()=="series" ? "tv" : "movie")+`/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
      const json = await response .json();
      setGenres(json.genres);
      setStateFun(json.genres[0].id);
      setDefaultVal(json.genres[0].name);
      setTimeout(() => setIsLoading(false), 1000);
    }

    fetching();
  }, [type]);

  return (
    <Skeleton 
    borderRadius="full" 
    fadeDuration={3} 
    startColor='brand.primary' 
    endColor='brand.tertiary' 
    isLoaded={!isloading}
    >
      <Select w="200px" variant="base" defaultValue={defaultVal} onChange={changeFun}>
          {genres?.map((genre: any) => 
          <option key={genre.id} value={genre.id}>{genre.name}</option>
          )}
      </Select>
    </Skeleton>
  )
};

export default MovieSelect;