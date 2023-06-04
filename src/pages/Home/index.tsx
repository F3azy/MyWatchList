import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';
import Collections from '../../components/Collections';
import { useState, useEffect } from 'react';
import { Movie } from '../../types/common';

interface HomeSlidersArrayType {
  title: string,
  url: string,
  type?: string,
}

const HomeSlidersArray: Array<HomeSlidersArrayType> = [
  {
    title: "Trending Today",
    url: "trending/all/day",
  },
  {
    title: "Trending This Week",
    url: "trending/all/week",
  },
  {
    title: "Now Playing",
    url: "/now_playing",
    type: "movie",
  },
  {
    title: "Popular Movies",
    url: "/popular",
    type: "movie",
  },
  {
    title: "Top Rated Movies",
    url: "/top_rated",
    type: "movie",
  },
  {
    title: "Upcoming Movies",
    url: "/upcoming",
    type: "movie",
  },
  {
    title: "Airing Today",
    url: "/airing_today",
    type: "tv",
  },
  {
    title: "On The Air",
    url: "/on_the_air",
    type: "tv",
  },
  {
    title: "Popular Series",
    url: "/popular",
    type: "tv",
  },
  {
    title: "Top Rated Series",
    url: "/top_rated",
    type: "tv",
  },
];

const Home = () => {
  const url = "https://api.themoviedb.org/3/";
  const [sliders, setSliders] = useState<Array<Movie[]>>(() => {return []});
  const [pages, setPages] = useState<Array<number>>(() => {return []});
  const [isloading, setIsLoading] = useState(() => {return true});

  useEffect(() => {
    setSliders([]);
    const fetching = async (sliderType: string  | undefined, sliderUrl: string, sliderTitle: string) => { 
      setIsLoading(true);
      try {
        const response  = await fetch(url+(sliderType ? sliderType : "")+sliderUrl+`?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`);
        const json = await response.json();
        
        setSliders(prev => [...prev, json.results]);
        setPages(prev => [...prev, Math.ceil(json.results.length/5)]);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
      catch (error) {
        console.error(`Error fetching for slider (${sliderTitle}):`, error);
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
      }
    }

    HomeSlidersArray.map((slider) => 
      fetching(slider.type, slider.url, slider.title)
    );
  }, []);

  return (
    <Flex direction="column" rowGap="28px">
      <Collections />
      <Flex direction="column" rowGap="24px">
        {sliders.map((slider, idx) => 
        <Slider isLink={true} key={idx} columnGap={20} sliderTitle={HomeSlidersArray[idx].title} sliderType={HomeSlidersArray[idx].type} pages={pages[idx]} visible={5} watchCards={slider} isloading={isloading} />
        )}
      </Flex>
    </Flex>
  )
};

export default Home;