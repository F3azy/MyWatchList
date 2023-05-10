export interface CollectionProps {
    name?: string,
    logoSrc: string,
    videoSrc: string,
};

export const collections: Array<CollectionProps> = [
    {
      name: "Marvel",
      logoSrc: "./collections/images/marvel.png",
      videoSrc: "./collections/video/marvel.mp4",
    },
    {
      name: "HarryPotter",
      logoSrc: "./collections/images/harryPotter.png",
      videoSrc: "./collections/video/harryPotter.mp4",
    },
    {
      name: "StarWars",
      logoSrc: "./collections/images/starWars.png",
      videoSrc: "./collections/video/starWars.mp4",
    },
    {
      name: "LordoftheRings",
      logoSrc: "./collections/images/lordOfTheRings.png",
      videoSrc: "./collections/video/lordOfTheRings.mp4",
    },
    {
      name: "PiratesOfCaribbean",
      logoSrc: "./collections/images/piratesOfCaribbean.png",
      videoSrc: "./collections/video/piratesOfCaribbean.mp4",
    },
    {
      name: "Twilight",
      logoSrc: "./collections/images/twilight.png",
      videoSrc: "./collections/video/twilight.mp4",
    },
  ];