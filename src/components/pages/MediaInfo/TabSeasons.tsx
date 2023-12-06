import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
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
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Episode, MultiDetails, Season } from "@/types/mediaInfo";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import EpisodeCard from "@/components/pages/MediaInfo/EpisodeCard";
import useFetch from "@/hooks/useFetch";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import MediaDetail from "./MediaDetail";
import GuestStarMemberCard from "./GuestStarMemberCard";

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

  console.log(episodeData);

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
        size="3xl"
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
          <ModalBody overflowX="clip">
            <VStack w="full" align="flex-start" gap="12px">
              <Text textAlign="justify">{episodeData?.overview}</Text>
              <HStack w="full" justify="space-between">
                <MediaDetail
                  label="Runtime"
                  value={episodeData?.runtime + " min"}
                />
                <MediaDetail
                  label="Rating"
                  value={episodeData?.vote_average + "/10"}
                />
                <MediaDetail
                  label="Air date"
                  value={episodeData?.air_date as string}
                />
              </HStack>
              <Box w="full" px="60px">
                <Text color="brand.secondary" mb="8px">
                  Cast:
                </Text>
                <Carousel
                  elementsTotal={episodeData?.guest_stars.length as number}
                  visibleElements={4}
                >
                  {episodeData?.guest_stars.map((star) => (
                    <CarouselItem>
                      <GuestStarMemberCard star={star} />
                    </CarouselItem>
                  ))}
                </Carousel>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup mt="12px" gap="8px">
              <Button
                variant="full"
                leftIcon={
                  <BsBookmarkPlus size={20} /> || <BsBookmarkDash size={20} />
                }
              >
                {"Mark as watched" || "Unmark as watched"}
              </Button>
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TabSeasons;
