import { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, Tabs } from "@chakra-ui/react";
import { MultiDetails, Season } from "@/types/mediaInfo";
import Carousel from "@/components/shared/Carousel";
import CarouselItem from "@/components/shared/CarouselItem";
import EpisodeCard from "@/components/pages/MediaInfo/EpisodeCard";
import useFetch from "@/hooks/useFetch";

const TabSeasons = ({ details }: { details: MultiDetails | undefined }) => {
  const [currentSeason, setCurrentSeason] = useState(1);

  useEffect(() => {
    setCurrentSeason(1);
  }, [details]);

  const seasonUrl = `https://api.themoviedb.org/3/tv/${details?.id}/season/${currentSeason}?api_key=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&language=en-US`;

  const { data: seasonInfo } = useFetch<Season>(seasonUrl);

  return (
    <Tabs variant="seasons">
      <TabList>
        {details?.seasons
          .filter(
            (season) => season.season_number !== 0 && season.episode_count !== 0
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
            (season) => season.season_number === 0 && season.episode_count !== 0
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
                  <EpisodeCard episode={episode} />
                </CarouselItem>
              ))}
          </Carousel>
        )}
      </TabPanel>
    </Tabs>
  );
};

export default TabSeasons;
