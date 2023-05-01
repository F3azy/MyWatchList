import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';
import Collections from '../../components/Collections';

const Home = () => {
  return (
    <Flex direction={"column"} rowGap={"20px"}>
      <Collections />
      <Slider />
      <Slider />
      <Slider />
      <Slider />
      <Slider />
      <Slider />
      <Slider />
    </Flex>
  )
};

export default Home;