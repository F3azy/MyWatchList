import WatchCard from './WatchCard';
import { Flex, Text, Box, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';

const Slider = () => {
  return (
    <Flex w={"100%"} direction={"column"} rowGap={"8px"}>
      <Text fontSize={"24px"} fontWeight={"bold"}>
        Marvel
      </Text>
      <Flex w={"100%"} position={"relative"} >
        <ScrollButton as={ChevronLeftIcon} direction="left" />
        <Flex id={"slider"} w={"100%"} minH={"194px"} columnGap={"20px"} overflowX={"scroll"}>
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
          <WatchCard />
        </Flex>
        <ScrollButton as={ChevronRightIcon} direction="right" />
      </Flex>
    </Flex>
  )
};

export default Slider;