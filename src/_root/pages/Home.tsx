import { Flex } from "@chakra-ui/react";
import CollectionBoxList from "@/components/pages/Home/CollectionBoxList";
import TrendingToday from "@/components/pages/Home/TrendingToday";
import TrendingThisWeek from "@/components/pages/Home/TrendingThisWeek";
import NowPlaying from "@/components/pages/Home/NowPlaying";
import PopularMovies from "@/components/pages/Home/PopularMovies";
import TopRatedMovies from "@/components/pages/Home/TopRatedMovies";
import AiringToday from "@/components/pages/Home/AiringToday";
import OnTheAir from "@/components/pages/Home/OnTheAir";
import PopularSeries from "@/components/pages/Home/PopularSeries";
import TopRatedSeries from "@/components/pages/Home/TopRatedSeries";
import Upcoming from "@/components/pages/Home/UpComing";

const Home = () => {
  return (
    <Flex direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <CollectionBoxList />
      <TrendingToday />
      <TrendingThisWeek />
      <NowPlaying />
      <Upcoming />
      <PopularMovies />
      <TopRatedMovies />
      <AiringToday />
      <OnTheAir />
      <PopularSeries />
      <TopRatedSeries />
    </Flex>
  );
};

export default Home;
