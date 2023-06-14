import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import WatchCard from '../WatchCard';
import { Flex, Text, SkeletonText } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import ScrollButton from './ScrollButton';
import { SliderProps } from './SliderProps';


const Slider = ({sliderTitle, sliderType, watchCards, isloading, pages, visible, isLink, columnGap, id, animate, watchCardMinH}: SliderProps) => {

  const [showLeftButton, setLeftShowButton] = useState(() => {return false});
  const [showRightButton, setRightShowButton] = useState(() => {return false});
  const [page, setPage] = useState(() => {return 0});
  const sliderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(() => {return 0});
  const [watchCardWidth, setWatchCardWidth] = useState(() => {return 100/(pages*visible)});

  useLayoutEffect (() => {
    function handleResize(): void {
      if (sliderRef.current) {
        setWidth(((sliderRef.current?.getBoundingClientRect().width-((pages*visible-1)*columnGap))/(pages*visible))*visible+(visible*columnGap));
      } 
    }
    
    if(pages==1) {
      setLeftShowButton(false);
      setRightShowButton(false);
    }

    setWatchCardWidth(100/(pages*visible))

    window.addEventListener("resize", handleResize);
    
    handleResize();

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    //   clearTimeout(timer);
    // };

  }, [pages, visible, id]);

  useEffect(() => {
    (page == 0) ? setTimeout(() => { setLeftShowButton(false) }, 500) : setLeftShowButton(true);
    (page == Math.ceil(pages-1)) ? setTimeout(() => {setRightShowButton(false) }, 500) : setRightShowButton(true);
  }, [page, pages]); 

  // console.log(sliderType);

  if (sliderRef.current) {
    if(width < ((sliderRef.current?.getBoundingClientRect().width-((pages*visible-1)*columnGap))/(pages*visible))*visible+(visible*columnGap))
    setWidth(((sliderRef.current?.getBoundingClientRect().width-((pages*visible-1)*columnGap))/(pages*visible))*visible+(visible*columnGap));
  } 

  return (
    <Flex minW="100%" direction="column" rowGap="8px">
      {sliderTitle ? <SkeletonText 
        skeletonHeight='36px' 
        noOfLines={1} 
        isLoaded={!isloading}
        startColor='brand.primary' 
        endColor='brand.tertiary'
        fadeDuration={3} 
        >  
        <Text fontSize="24px" fontWeight="bold">
          {sliderTitle}
        </Text>
      </SkeletonText>
      : ""}
      <Flex position="relative" align="center" >
        <ScrollButton 
          as={ChevronLeftIcon} 
          direction="left" 
          showButton={showLeftButton} 
          slider={sliderRef}
          sliderWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
          id={id}
        />
        <Flex minW={`calc(${100*pages}% + ${columnGap*(pages-1)}px)`} minH={watchCardMinH} ref={sliderRef} columnGap={`${columnGap}px`} style={{transform: "translate(0px)"}}>
        {watchCards.map((watchcard) => 
          <WatchCard 
          key={watchcard.id ? watchcard.id : watchcard?.file_path} 
          givenWidth={`calc(${watchCardWidth}%)`}
          minH={watchCardMinH}
          isLink={isLink}
          id={watchcard.id} 
          type={sliderType ? sliderType : watchcard.media_type as string}
          title={watchcard?.name ? watchcard?.name : watchcard?.title as string}
          SpecImageURL={watchcard?.poster_path ? watchcard?.poster_path : watchcard?.file_path as string}
        />)}
        </Flex>
        <ScrollButton 
          as={ChevronRightIcon} 
          direction="right" 
          showButton={showRightButton} 
          slider={sliderRef}
          sliderWidth={width}
          currentPage={page}
          setCurrentPage={setPage}
          animate={watchCards.length==1 ? false : animate}
          pages={pages}
          isloading={isloading}
        />
      </Flex>
    </Flex>
  )
};

export default Slider;