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
  isScrollable?: boolean;
  showScroll?: boolean;
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
  isScrollable,
  showScroll = true,
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
        if (clicked) break;
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

  useEffect(() => {
    setCurrentPage(0);
  }, [pages]);

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
          <Text fontSize={{ base: "20px", md: "24px" }} fontWeight="bold">
            {carouselTitle}
          </Text>
        </SkeletonText>
      )}
      <Box
        position="relative"
        mx={{ base: "-16px", xl: 0 }}
        px={{ base: "16px", xl: 0 }}
        overflowX={isScrollable && pages > 1 ? "scroll" : "visible"}
        css={
          showScroll
            ? {
                "&::-webkit-scrollbar": {
                  width: "14px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#56B4DC",
                  border: "4px solid rgba(0, 0, 0, 0)",
                  backgroundClip: "padding-box",
                  borderRadius: "24px",
                },
              }
            : {
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }
        }
      >
        <ScrollButton
          as={ChevronLeftIcon}
          direction="left"
          showButton={showButtons && pages > 1 && !isScrollable}
          onClick={() => changePage(ACTIONS.PREVIOUS)}
        />
        <Grid
          w={`calc(${(100 * elementsTotal) / visibleElements}% + ${
            (gap * elementsTotal) / visibleElements - gap
          }px)`}
          templateColumns={`repeat(${elementsTotal}, 1fr)`}
          columnGap={pages > 1 ? `min(${gap}px, 1%)` : `${gap}px`}
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
          showButton={showButtons && pages > 1 && !isScrollable}
          onClick={() => changePage(ACTIONS.NEXT)}
        />
      </Box>
    </Flex>
  );
};

export default Carousel;
