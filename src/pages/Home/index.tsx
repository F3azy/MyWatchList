import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';
import Collections from '../../components/Collections';
import { useState, useEffect } from 'react';
import { Movie } from '../../types/common';
import { HomeMovieSlidersArray, HomeTrendingSlidersArray, HomeTVSlidersArray } from './HomeSlidersArray';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [trendingSliders, setTrendingSliders] = useState<Array<Movie[]>>(() => {return []});
  const [movieSliders, setMovieSliders] = useState<Array<Movie[]>>(() => {return []});
  const [tvSliders, setTVSliders] = useState<Array<Movie[]>>(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});

  const location = useLocation();

  useEffect(() => {
    setTrendingSliders([]);
    setMovieSliders([]);
    setTVSliders([]);
    setIsLoading(true);
    
    const fetching = async (sliderType: string, sliderUrl: string, sliderTitle: string, random?: boolean, pageQuantity: number = 10) => { 
      try {
        const randomPage = Math.floor(Math.random() * (pageQuantity - 1 + 1) + 1);
        const response  = await fetch(url+(sliderType ? sliderType : "")+sliderUrl+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US${random ? `&page=${randomPage}` : ""}`);
        const json = await response.json();
        
        return json.results.filter((m: Movie) => (m.poster_path != null));

        // if(sliderType=="movie") setMovieSliders(prev => [...prev, json.results]);
        // else if(sliderType=="tv") setTVSliders(prev => [...prev, json.results]);
        // else setTrendingSliders(prev => [...prev, json.results]);
      }
      catch (error) {
        console.error(`Error fetching for slider (${sliderTitle}):`, error);
      }
    }

    const trendingFetchPromises = HomeTrendingSlidersArray.map((slider) => 
      fetching("", slider.url, slider.title, slider.randomPage, slider.pageQuantity)
    );
    Promise.all(trendingFetchPromises)
    .then((fetchedData) => {
      setTrendingSliders(fetchedData);
    })
    .catch((error) => {
      console.error('Error fetching trending sliders:', error);
    });

    const movieFetchPromises = HomeMovieSlidersArray.map((slider) => 
      fetching("movie", slider.url, slider.title, slider.randomPage)
    );
    Promise.all(movieFetchPromises)
    .then((fetchedData) => {
      setMovieSliders(fetchedData);
    })
    .catch((error) => {
      console.error('Error fetching movie sliders:', error);
    });

    const tvFetchPromises = HomeTVSlidersArray.map((slider) => 
      fetching("tv", slider.url, slider.title, slider.randomPage)
    );
    Promise.all(tvFetchPromises)
    .then((fetchedData) => {
      setTVSliders(fetchedData);
    })
    .catch((error) => {
      console.error('Error fetching tv sliders:', error);
    });

    setIsLoading(false)
  }, [location]);

  return (
    <Flex direction="column" rowGap="28px">
      <Collections />
      <Flex direction="column" rowGap="24px">
        {trendingSliders?.map((slider, idx) => 
        <Slider isLink={true} key={idx} columnGap={20} sliderTitle={HomeTrendingSlidersArray[idx].title} pages={slider.length/5} visible={5} watchCardMinH='300px' watchCards={slider} isloading={isloading} />
        )}
        {movieSliders?.map((slider, idx) => 
        <Slider isLink={true} key={idx} columnGap={20} sliderTitle={HomeMovieSlidersArray[idx].title} sliderType="movie" pages={slider.length/5} visible={5} watchCardMinH='300px' watchCards={slider} isloading={isloading} />
        )}
        {tvSliders?.map((slider, idx) => 
        <Slider isLink={true} key={idx} columnGap={20} sliderTitle={HomeTVSlidersArray[idx].title} sliderType="tv" pages={slider.length/5 } visible={5} watchCardMinH='300px' watchCards={slider} isloading={isloading} />
        )}
      </Flex>
    </Flex>
  )
};

export default Home;