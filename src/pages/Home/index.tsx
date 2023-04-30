import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';

const Home = () => {
  return (
    <Flex direction={"column"} rowGap={"20px"}>
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