import { Episode } from "@/types/mediaInfo";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsBookmarkDash, BsBookmarkPlus } from "react-icons/bs";
import MediaDetail from "./MediaDetail";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import GuestStarMemberCard from "./GuestStarMemberCard";

export const OverLayContent = ({
  episodeData,
  visible,
}: {
  episodeData: Episode;
  visible: number;
}) => {
  return (
    <VStack w="full" align="flex-start" gap="12px">
      <Text textAlign="justify">{episodeData?.overview}</Text>
      <HStack w="full" justify="space-between">
        <MediaDetail label="Runtime" value={episodeData?.runtime + " min"} />
        <MediaDetail label="Rating" value={episodeData?.vote_average + "/10"} />
        <MediaDetail label="Air date" value={episodeData?.air_date as string} />
      </HStack>
      {episodeData?.guest_stars.length && (
        <Box
          w="full"
          overflowX={
            episodeData?.guest_stars.length < visible ? "clip" : "visible"
          }
        >
          <Text color="brand.secondary" mb="8px">
            Episode guest cast:
          </Text>
          <Carousel
            elementsTotal={episodeData?.guest_stars.length as number}
            visibleElements={visible}
            isScrollable
          >
            {episodeData?.guest_stars.map((star, idx) => (
              <CarouselItem key={idx}>
                <GuestStarMemberCard star={star} />
              </CarouselItem>
            ))}
          </Carousel>
        </Box>
      )}
    </VStack>
  );
};

export const OverLayHeader = ({ episodeData }: { episodeData: Episode }) => {
  return (
    <Text fontWeight="semibold">
      S{episodeData?.season_number} E{episodeData?.episode_number} -{" "}
      {episodeData?.name}
    </Text>
  );
};

export const OverLayFooter = ({
  episodeData,
  closeOverlay,
}: {
  episodeData: Episode;
  closeOverlay: () => void;
}) => {
  return (
    <ButtonGroup mt={episodeData?.guest_stars.length ? "12px" : 0} gap="8px">
      <Button
        variant="full"
        leftIcon={<BsBookmarkPlus size={20} /> || <BsBookmarkDash size={20} />}
      >
        {"Mark as watched" || "Unmark as watched"}
      </Button>
      <Button variant="outline" onClick={closeOverlay}>
        Close
      </Button>
    </ButtonGroup>
  );
};
