import { useState, useEffect } from "react";
import RateStarIcon from "@/assets/StarIcon";
import { Flex, Text } from "@chakra-ui/react";

const Ratings = ({ rating }: {rating: number}) => {
  const [rateStars, setRateStars] = useState<Array<string>>([]);

  useEffect(() => {
    setRateStars([]);

    const rate: number = rating / 2;

    for (let i = 0; i < Math.floor(rate); i++)
      setRateStars((old) => [...old, "100%"]);

    for (let i = 0; i < rate % Math.floor(rate); i++)
      setRateStars((old) => [
        ...old,
        (rate % Math.floor(rate)) * 100 + "%",
      ]);

      for (let i = 0; i < 5 - Math.ceil(rate); i++)
        setRateStars((old) => [...old, "0%"]);

  }, [rating]);

  return (
    <Flex align="center" columnGap={{ base: "4px", md: "8px" }}>
      {rateStars.map((rate, idx) => (
        <RateStarIcon key={idx} offset={rate} id={idx} />
      ))}
    </Flex>
  );
};

export default Ratings;