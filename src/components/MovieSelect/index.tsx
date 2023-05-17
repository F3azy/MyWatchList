import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Select, Skeleton } from '@chakra-ui/react';

const MovieSelect = ({type, isloading, setIsLoading, setStateFun, changeFun}: 
  { type: string, 
    isloading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setStateFun: React.Dispatch<React.SetStateAction<string>>, 
    changeFun?: React.ChangeEventHandler<HTMLSelectElement>
  }) => {

  const [genres, setGenres] = useState<any>(() => {return []});
  const [defaultVal, setDefaultVal] = useState(() => {return ""});
  const [url, setUrl] = useState(() => {return "https://api.themoviedb.org/3/genre/"});
  
  useLayoutEffect(() => {
    setIsLoading(true);
    const fetching = async () => {
      const response  = await fetch(url+(type.toLocaleLowerCase()=="series" ? "tv" : "movie")+`/list?api_key=${import.meta.env.VITE_MOVIE_API_KEY}`);
      const json = await response .json();
      setGenres(json.genres);
      setStateFun(json.genres[0].id);
      setDefaultVal(json.genres[0].name);
      setTimeout(() => setIsLoading(false), 800);
    }

    fetching();
  }, [type]);

  return (
    <Skeleton 
    borderRadius="full" 
    isLoaded={!isloading}
    startColor='brand.primary' 
    endColor='brand.tertiary' 
    fadeDuration={3} 
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