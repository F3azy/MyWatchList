import { images, videos } from "@/assets/collections";
import { CollectionBox } from "@/types/collection";

export const CollectionBoxes: Array<CollectionBox> = [
  {
    name: "Marvel",
    logoSrc: images.marvel,
    videoSrc: videos.marvel,
  },
  {
    name: "HarryPotter",
    logoSrc: images.harryPotter,
    videoSrc: videos.harryPotter,
  },
  {
    name: "StarWars",
    logoSrc: images.starWars,
    videoSrc: videos.starWars,
  },
  {
    name: "LordoftheRings",
    logoSrc: images.lordOfTheRings,
    videoSrc: videos.lordOfTheRings,
  },
  {
    name: "PiratesOfCaribbean",
    logoSrc: images.piratesOfCaribbean,
    videoSrc: videos.piratesOfCaribbean,
  },
  {
    name: "Twilight",
    logoSrc: images.twilight,
    videoSrc: videos.twilight,
  },
];
