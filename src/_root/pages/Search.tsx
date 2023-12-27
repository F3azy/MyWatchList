import { useState, FormEvent } from "react";
import {
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import WatchCard from "@/components/shared/WatchCard";
import { MultiMedia } from "@/types/common";
import { SearchIcon } from "@chakra-ui/icons";
import useFetch from "@/hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { createApiUrl } from "@/utils";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
  });

  const [title, setTitle] = useState(searchParams.get("q") as string);

  const { data: watchCards } = useFetch<MultiMedia>(
    createApiUrl(`search/multi`, `&query=${encodeURIComponent(title)}`)
  );

  function getTitle(event: FormEvent<HTMLInputElement>): void {
    setTitle(event.currentTarget.value);
    setSearchParams(
      (prev) => {
        prev.set("q", event.currentTarget.value);
        return prev;
      },
      { replace: true }
    );
    if (searchParams.get("q") === "") {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  }

  return (
    <Flex w="full" direction="column" rowGap={{ base: "16px", xl: "28px" }}>
      <InputGroup size={{base: "md", md: "lg"}}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon boxSize={{base: 5, md: 6}} color="brand.secondary" />}
        />
        <Input
          fontSize={{base: "20px", md:"28px"}}
          fontWeight="700"
          color="brand.secondary"
          size={{base: "md", md: "lg"}}
          borderColor="brand.secondary"
          _hover={{ borderColor: "brand.primary" }}
          type="text"
          placeholder="Title..."
          onInput={getTitle}
          value={title}
        />
      </InputGroup>
      <Grid
        templateColumns={{ base: "repeat(3, 1fr)", xl: "repeat(8, 1fr)" }}
        gap={{base: 3, md: 6}}
      >
        {watchCards?.results.map((watchcard) => (
          <GridItem key={watchcard.id}>
            <WatchCard
              watchCard={watchcard}
              media_type={watchcard.media_type}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Search;
