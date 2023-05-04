import WatchCard from './WatchCard';
import { Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';

const Slider = () => {

  return (
    <Flex direction={"column"} rowGap={"8px"}>
      <Text fontSize={"24px"} fontWeight={"bold"}>
        Marvel
      </Text>
      <Flex position={"relative"} align={"center"} >
        <ScrollButton as={ChevronLeftIcon} direction="left" />
        <Flex id={"slider"} columnGap={"20px"} style={{transform: "translate(0px)"}}>
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