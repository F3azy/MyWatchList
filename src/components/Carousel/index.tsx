import WatchCard from './WatchCard';
import { Flex, Text, Box, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';

const Carousel = () => {
  return (
    <Flex w={"100%"} direction={"column"} rowGap={"8px"}>
      <Text fontSize={"24px"} fontWeight={"bold"} pl={"50px"}>Marvel</Text>
      <Flex w={"100%"} position={"relative"}>
        <Box w={"40px"} h={"170px"} display={'flex'} justifyContent={"center"} alignItems={"center"} bg={"blackAlpha.700"} position={"absolute"} >
          <Icon as={ChevronLeftIcon} boxSize={10} />
        </Box>
        <Flex w={"100%"} align={"center"} columnGap={"12px"} overflowX={"hidden"} pl={"50px"}>
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
        <Box w={"40px"} h={"170px"} display={'flex'} justifyContent={"center"} alignItems={"center"} bg={"blackAlpha.700"} position={"absolute"} right={0}>
          <Icon as={ChevronRightIcon} boxSize={10} />
        </Box>
      </Flex>
    </Flex>
  )
};

export default Carousel;