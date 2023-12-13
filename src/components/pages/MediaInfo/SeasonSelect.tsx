import { Select } from "@chakra-ui/react";
import { MultiDetails } from "@/types/mediaInfo";
import { isFutureDate } from "@/utils";

const SeasonSelect = ({
  details,
  setSeason,
}: {
  details: MultiDetails;
  setSeason: React.Dispatch<React.SetStateAction<number>>;
}) => {
  function seasonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.currentTarget.value);

    setSeason(parseInt(event.currentTarget.value));
  }
  return (
    <Select w={{md: "max-content"}} variant="base" mb={2} onChange={seasonChange}>
      {details?.seasons
        .filter(
          (season) =>
            season.season_number !== 0 &&
            season.episode_count !== 0 &&
            !isFutureDate(season.air_date)
        )
        .map((season) => (
          <option value={season.season_number} key={season.season_number}>
            Season {season.season_number}
          </option>
        ))}
      {details?.seasons
        .filter(
          (season) => season.season_number === 0 && season.episode_count !== 0
        )
        .map((season) => (
          <option value={season.season_number} key={season.season_number}>
            {season.name}
          </option>
        ))}
    </Select>
  );
};

export default SeasonSelect;
