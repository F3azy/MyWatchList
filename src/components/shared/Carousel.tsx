import { useEffect, useState, useRef, useLayoutEffect } from "react";
import WatchCard from "./WatchCard";
import { Flex, Text, SkeletonText, Grid, Box } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ScrollButton from "./ScrollButton";
import { Movie } from "../../types/common";

type CarouselProps = {
  carouselTitle?: string;
  carouselType?: string | null;
  watchCards: Movie[];
  isloading?: boolean;
  pages: number;
  visible: number;
  isLink: boolean;
  columnGap: number;
  id?: string;
  animate?: boolean;
  watchCardMinH?: string;
};

// const Carousel = ({
//   carouselTitle,
//   carouselType,
//   watchCards,
//   isloading,
//   pages,
//   visible,
//   isLink,
//   columnGap,
//   id,
//   animate,
//   watchCardMinH,
// }: CarouselProps) => {
//   const [showLeftButton, setLeftShowButton] = useState(false);
//   const [showRightButton, setRightShowButton] = useState(false);
//   const [page, setPage] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState<number>(0);
//   const [watchCardWidth, setWatchCardWidth] = useState(100 / (pages * visible));

//   useLayoutEffect(() => {
//     function handleResize(): void {
//       if (carouselRef.current) {
//         setWidth(
//           ((carouselRef.current?.getBoundingClientRect().width -
//             (pages * visible - 1) * columnGap) /
//             (pages * visible)) *
//             visible +
//             visible * columnGap
//         );
//       }
//     }

//     if (pages == 1) {
//       setLeftShowButton(false);
//       setRightShowButton(false);
//     }

//     setWatchCardWidth(100 / (pages * visible));

//     window.addEventListener("resize", handleResize);

//     handleResize();

//     // return () => {
//     //   window.removeEventListener("resize", handleResize);
//     //   clearTimeout(timer);
//     // };
//   }, [pages, visible, id]);

//   useEffect(() => {
//     page == 0
//       ? setTimeout(() => {
//           setLeftShowButton(false);
//         }, 500)
//       : setLeftShowButton(true);
//     page == Math.ceil(pages - 1)
//       ? setTimeout(() => {
//           setRightShowButton(false);
//         }, 500)
//       : setRightShowButton(true);
//   }, [page, pages]);

//   // console.log(CarouselType);

//   if (carouselRef.current) {
//     if (
//       width <
//       ((carouselRef.current?.getBoundingClientRect().width -
//         (pages * visible - 1) * columnGap) /
//         (pages * visible)) *
//         visible +
//         visible * columnGap
//     )
//       setWidth(
//         ((carouselRef.current?.getBoundingClientRect().width -
//           (pages * visible - 1) * columnGap) /
//           (pages * visible)) *
//           visible +
//           visible * columnGap
//       );
//   }

//   return (
//     <Flex minW="100%" direction="column" rowGap="8px">
//       {carouselTitle ? (
//         <SkeletonText
//           skeletonHeight="36px"
//           noOfLines={1}
//           isLoaded={!isloading}
//           startColor="brand.primary"
//           endColor="brand.tertiary"
//           fadeDuration={3}
//         >
//           <Text fontSize="24px" fontWeight="bold">
//             {carouselTitle}
//           </Text>
//         </SkeletonText>
//       ) : (
//         ""
//       )}
//       <Flex position="relative" align="center">
//         <ScrollButton
//           as={ChevronLeftIcon}
//           direction="left"
//           showButton={showLeftButton}
//           carousel={carouselRef}
//           carouselWidth={width}
//           currentPage={page}
//           setCurrentPage={setPage}
//           id={id}
//         />
//         <Flex
//           minW={`calc(${100 * pages}% + ${columnGap * (pages - 1)}px)`}
//           minH={watchCardMinH}
//           ref={carouselRef}
//           columnGap={`${columnGap}px`}
//           style={{ transform: "translate(0px)" }}
//         >
//           {watchCards.map((watchcard) => (
//             <WatchCard
//               key={watchcard.id ? watchcard.id : watchcard?.file_path}
//               givenWidth={`calc(${watchCardWidth}%)`}
//               minH={watchCardMinH}
//               isLink={isLink}
//               id={watchcard.id}
//               type={carouselType ? carouselType : (watchcard.media_type as string)}
//               title={
//                 watchcard?.name ? watchcard?.name : (watchcard?.title as string)
//               }
//               SpecImageURL={
//                 watchcard?.poster_path
//                   ? watchcard?.poster_path
//                   : (watchcard?.file_path as string)
//               }
//             />
//           ))}
//         </Flex>
//         <ScrollButton
//           as={ChevronRightIcon}
//           direction="right"
//           showButton={showRightButton}
//           carousel={carouselRef}
//           carouselWidth={width}
//           currentPage={page}
//           setCurrentPage={setPage}
//           animate={watchCards.length == 1 ? false : animate}
//           pages={pages}
//           isloading={isloading}
//         />
//       </Flex>
//     </Flex>
//   );
// };

const Carousel = ({
  carouselTitle,
  isloading,
  elementsTotal,
  visibleElements,
  showButtons = true,
  children,
}: {
  carouselTitle?: string;
  isloading: boolean;
  elementsTotal: number;
  showButtons?: boolean;
  visibleElements: number;
  children: React.ReactNode;
}) => {

  const [page, setPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  // const [watchCardWidth, setWatchCardWidth] = useState(100 / (pages * visible));
  

  return (
    <Flex direction="column" rowGap="8px">
      {carouselTitle && 
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
      }
      <Box position="relative">
        <ScrollButton
          as={ChevronLeftIcon}
          direction="left"
          showButton={showButtons}
          carousel={carouselRef}
          carouselWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
          // id={id}
        />
        <Grid
          ref={carouselRef}
          w={`${(100 * elementsTotal) / visibleElements}%`}
          templateColumns={`repeat(${elementsTotal}, 1fr)`}
          columnGap="20px"
          // transform={`translate(${0}%)`}
          style={{ transform: "translate(0%)" }}
        >
          {children}
        </Grid>
        <ScrollButton
          as={ChevronRightIcon}
          direction="right"
          showButton={showButtons}
          carousel={carouselRef}
          carouselWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
          // animate={watchCards.length == 1 ? false : animate}
          // pages={pages}
          isloading={isloading}
        />
      </Box>
    </Flex>
  );
};

export default Carousel;
