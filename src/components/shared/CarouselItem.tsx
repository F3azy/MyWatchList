import { GridItem } from "@chakra-ui/react";

const CarouselItem = ({children}: {children: React.ReactNode}) => {
  return (
    <GridItem>
        {children}
    </GridItem>
    )
};

export default CarouselItem;