import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Episode, MultiDetails, Season } from "@/types/mediaInfo";
import EpisodeCard from "@/components/pages/MediaInfo/EpisodeCard";
import useFetch from "@/hooks/useFetch";
import { isFutureDate } from "@/utils";
import SeasonSelect from "./SeasonSelect";
import { OverLayContent, OverLayFooter, OverLayHeader } from "./OverLayContent";

const TabSeasons = ({ details }: { details: MultiDetails }) => {
  const [currentSeason, setCurrentSeason] = useState(1);

  useEffect(() => {
    setCurrentSeason(1);
  }, [details]);

  const seasonUrl = `https://api.themoviedb.org/3/tv/${
    details?.id
  }/season/${currentSeason}?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;

  const { data: seasonInfo } = useFetch<Season>(seasonUrl);

  const [loading, setLoading] = useState(false);
  const [episodeData, setEpisodeData] = useState<Episode>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function openModal(episode_number: number) {
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/tv/${
        details?.id
      }/season/${currentSeason}/episode/${episode_number}?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&language=en-US`
    )
      .then((response) => response.json())
      .then((episode) => {
        setLoading(false);
        setEpisodeData(episode);
      });

    onOpen();
  }

  function closeModal() {
    onClose();
    setEpisodeData(undefined);
  }

  const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Tabs variant="seasons">
        <SeasonSelect details={details} setSeason={setCurrentSeason} isMobile />
        <TabList display={{ base: "none", xl: "flex" }}>
          {details?.seasons
            .filter(
              (season) =>
                season.season_number !== 0 &&
                season.episode_count !== 0 &&
                !isFutureDate(season.air_date)
            )
            .map((season) => (
              <Tab
                key={season.season_number}
                onClick={() => setCurrentSeason(season.season_number)}
              >
                {season.name}
              </Tab>
            ))}
          {details?.seasons
            .filter(
              (season) =>
                season.season_number === 0 && season.episode_count !== 0
            )
            .map((season) => (
              <Tab
                key={season.season_number}
                onClick={() => setCurrentSeason(season.season_number)}
              >
                {season.name}
              </Tab>
            ))}
        </TabList>
        <TabPanel px={0}>
          {seasonInfo && (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(5, 1fr)",
              }}
              gap="20px"
            >
              {seasonInfo?.episodes?.map((episode) => {
                if (!isFutureDate(episode.air_date))
                  return (
                    <GridItem key={episode.episode_number}>
                      <EpisodeCard
                        episode={episode}
                        onClick={() => openModal(episode.episode_number)}
                      />
                    </GridItem>
                  );
              })}
            </Grid>
          )}
        </TabPanel>
      </Tabs>
      <Modal
        isOpen={isSmallerThan768 ? false : isOpen}
        onClose={closeModal}
        blockScrollOnMount={true}
        isCentered
        size={{
          base: "md",
          md: episodeData?.guest_stars.length ? "2xl" : "lg",
          "2xl": episodeData?.guest_stars.length ? "3xl" : "xl",
        }}
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <OverLayHeader episodeData={episodeData as Episode} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowX="clip">
            <OverLayContent episodeData={episodeData as Episode} visible={4} />
          </ModalBody>
          <ModalFooter>
            <OverLayFooter
              episodeData={episodeData as Episode}
              closeOverlay={() => closeModal()}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isSmallerThan768 ? isOpen : false}
        variant="brand"
        placement="bottom"
        onClose={onClose}
        returnFocusOnClose={false}
        blockScrollOnMount={true}
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="24px">
          <DrawerHeader>
            <OverLayHeader episodeData={episodeData as Episode} />
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <OverLayContent
              episodeData={episodeData as Episode}
              visible={2.5}
            />
          </DrawerBody>
          <DrawerFooter>
            <OverLayFooter
              episodeData={episodeData as Episode}
              closeOverlay={() => closeModal()}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TabSeasons;
