import { useState, useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Episode, MultiDetails, Season } from "@/types/mediaInfo";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import EpisodeCard from "@/components/pages/MediaInfo/EpisodeCard";
import useFetch from "@/hooks/useFetch";

const TabSeasons = ({ details }: { details: MultiDetails | undefined }) => {
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

  return (
    <>
      <Tabs variant="seasons">
        <TabList>
          {details?.seasons
            .filter(
              (season) =>
                season.season_number !== 0 && season.episode_count !== 0
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
        <TabPanel>
          {seasonInfo && (
            <Carousel
              elementsTotal={
                seasonInfo?.episodes.filter((m) => m.still_path != null)
                  .length as number
              }
              visibleElements={5}
            >
              {seasonInfo?.episodes
                .filter((m) => m.still_path != null)
                ?.map((episode) => (
                  <CarouselItem key={episode.episode_number}>
                    <EpisodeCard
                      episode={episode}
                      onClick={() => openModal(episode.episode_number)}
                    />
                  </CarouselItem>
                ))}
            </Carousel>
          )}
        </TabPanel>
      </Tabs>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontWeight="semibold">
              S{episodeData?.season_number} E{episodeData?.episode_number} -{" "}
              {episodeData?.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{episodeData?.overview}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TabSeasons;
