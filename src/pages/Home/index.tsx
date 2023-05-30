import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';
import Collections from '../../components/Collections';

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
  // {
  //   title: "Trending This Week",
  //   url: "trending/all/week",
  // },
  // {
  //   title: "Now Playing",
  //   url: "/now_playing",
  //   type: "movie",
  // },
  // {
  //   title: "Popular Movies",
  //   url: "/popular",
  //   type: "movie",
  // },
  // {
  //   title: "Top Rated Movies",
  //   url: "/top_rated",
  //   type: "movie",
  // },
  // {
  //   title: "Upcoming Movies",
  //   url: "/upcoming",
  //   type: "movie",
  // },
  // {
  //   title: "Airing Today",
  //   url: "/airing_today",
  //   type: "tv",
  // },
  // {
  //   title: "On The Air",
  //   url: "/on_the_air",
  //   type: "tv",
  // },
  // {
  //   title: "Popular Series",
  //   url: "/popular",
  //   type: "tv",
  // },
  // {
  //   title: "Top Rated Series",
  //   url: "/top_rated",
  //   type: "tv",
  // },
];

const Home = () => {
  return (
    <Flex direction="column" rowGap="28px">
      <Collections />
      <Flex direction="column" rowGap="24px">
        {HomeSlidersArray.map((slider) => 
        <Slider key={slider.title} sliderTitle={slider.title} sliderUrl={slider.url} sliderType={slider.type}/>
        )}
      </Flex>
    </Flex>
  )
};

export default Home;