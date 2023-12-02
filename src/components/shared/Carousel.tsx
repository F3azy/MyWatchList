import { useEffect, useState } from "react";
import { Flex, Text, SkeletonText, Grid, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ScrollButton from "./ScrollButton";
import useInterval from "@/hooks/useInterval";

type CarouselProps = {
  carouselTitle?: string;
  isloading?: boolean;
  elementsTotal: number;
  visibleElements: number;
  gap?: number;
  showButtons?: boolean;
  animate?: boolean;
  children: React.ReactNode;
};

const ACTIONS = {
  NEXT: "NEXT",
  PREVIOUS: "PREVIOUS",
};

const Carousel = ({
  carouselTitle,
  isloading,
  elementsTotal,
  visibleElements,
  showButtons = true,
  gap = 20,
  children,
  animate,
}: CarouselProps) => {
  const pages = Math.ceil(elementsTotal / visibleElements);
  const [currentPage, setCurrentPage] = useState(0);
  const [clicked, setClicked] = useState(false);

  function changePage(action: string) {
    switch (action) {
      case ACTIONS.NEXT:
        if(clicked) break;
        if (currentPage >= pages - 1) setCurrentPage(0);
        else setCurrentPage((prev) => prev + 1);
        break;
      case ACTIONS.PREVIOUS:
        if (currentPage <= 0 || clicked) break;
        setCurrentPage((prev) => prev - 1);
        break;
      default:
        console.log("No case worked");
        break;
    }
    setClicked(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => setClicked(false), 800);

    return () => clearTimeout(timer);
  }, [clicked]);

  useInterval(
    () => {
      changePage(ACTIONS.NEXT);
    },
    !clicked && !isloading && animate ? 5000 : null
  );

  return (
    <Flex direction="column" rowGap="8px">
      {carouselTitle && (
        <SkeletonText
          skeletonHeight="36px"
          noOfLines={1}
          isLoaded={!isloading}
          startColor="brand.primary"
          endColor="brand.tertiary"
          fadeDuration={3}
        >
          <Text fontSize="24px" fontWeight="bold">
            {carouselTitle}
          </Text>
        </SkeletonText>
      )}
      <Box position="relative">
        <ScrollButton
          as={ChevronLeftIcon}
          direction="left"
          showButton={showButtons && pages > 1}
          onClick={() => changePage(ACTIONS.PREVIOUS)}
        />
        <Grid
          w={`calc(${(100 * elementsTotal) / visibleElements}% + ${
            (gap * elementsTotal) / visibleElements - gap
          }px)`}
          templateColumns={`repeat(${elementsTotal}, 1fr)`}
          columnGap={`${gap}px`}
          transition={`transform ${800}ms ease-in-out`}
          style={{
            transform: `translateX(calc((-${
              (100 * visibleElements) / elementsTotal
            }% - ${
              gap * (visibleElements / elementsTotal)
            }px) * ${currentPage})`,
          }}
        >
          {children}
        </Grid>
        <ScrollButton
          as={ChevronRightIcon}
          direction="right"
          showButton={showButtons && pages > 1}
          onClick={() => changePage(ACTIONS.NEXT)}
        />
      </Box>
    </Flex>
  );
};

export default Carousel;
