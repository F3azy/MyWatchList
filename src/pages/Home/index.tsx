import { Flex } from '@chakra-ui/react';
import Slider from '../../components/Slider';
import Collections from '../../components/Collections';

const Home = () => {
  return (
    <Flex direction={"column"} rowGap={"28px"}>
      <Collections />
      <Flex direction={"column"} rowGap={"24px"}>
        <Slider />
        <Slider />
        <Slider />
        <Slider />
        <Slider />
        <Slider />
        <Slider />
      </Flex>
    </Flex>
  )
};

export default Home;