import { CollectionsList, WatchCardInfo } from "@/types/collection";

const url = "https://api.themoviedb.org/3/";

function getUrls(collectionArray: WatchCardInfo[]): string[] {
  return collectionArray.map(
    (coll) =>
      url +
      coll.media +
      "/" +
      coll.id +
      `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
  );
}

const MarvelArray: WatchCardInfo[] = [
  { title: "Captain America: The First Avenger", id: 1771, media: "movie" },
  { title: "Marvel's Agent Carter", id: 61550, media: "tv" },
  { title: "Captain Marvel", id: 299537, media: "movie" },
  { title: "Iron Man", id: 1726, media: "movie" },
  { title: "Iron Man 2", id: 10138, media: "movie" },
  { title: "The Incredible Hulk", id: 1724, media: "movie" },
  { title: "Thor", id: 10195, media: "movie" },
  { title: "The Avengers", id: 24428, media: "movie" },
  { title: "Iron Man 3", id: 68721, media: "movie" },
  { title: "Marvel's Agents of S.H.I.E.L.D.", id: 1403, media: "tv" },
  { title: "Thor: The Dark World", id: 76338, media: "movie" },
  { title: "Captain America: The Winter Soldier", id: 100402, media: "movie" },
  { title: "Guardians of the Galaxy", id: 118340, media: "movie" },
  { title: "Guardians of the Galaxy Vol. 2", id: 283995, media: "movie" },
  { title: "Avengers: Age of Ultron", id: 99861, media: "movie" },
  { title: "Ant-Man", id: 102899, media: "movie" },
  { title: "Captain America: Civil War", id: 271110, media: "movie" },
  { title: "Black Widow", id: 497698, media: "movie" },
  { title: "Doctor Strange", id: 284052, media: "movie" },
  { title: "Black Panther", id: 284054, media: "movie" },
  { title: "Spider-Man: Homecoming", id: 315635, media: "movie" },
  { title: "Thor: Ragnarok", id: 284053, media: "movie" },
  { title: "Ant-Man and the Wasp", id: 363088, media: "movie" },
  { title: "Avengers: Infinity War", id: 299536, media: "movie" },
  { title: "Avengers: Endgame", id: 299534, media: "movie" },
  { title: "Loki", id: 84958, media: "tv" },
  { title: "What If...?", id: 91363, media: "tv" },
  { title: "WandaVision", id: 85271, media: "tv" },
  { title: "The Falcon and the Winter Soldier", id: 88396, media: "tv" },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    id: 566525,
    media: "movie",
  },
  { title: "Eternals", id: 524434, media: "movie" },
  { title: "Spider-Man: Far From Home", id: 429617, media: "movie" },
  { title: "Spider-Man: No Way Home", id: 634649, media: "movie" },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    id: 453395,
    media: "movie",
  },
  { title: "Hawkeye", id: 88329, media: "tv" },
  { title: "Moon Knight", id: 92749, media: "tv" },
  { title: "She-Hulk: Attorney at Law", id: 92783, media: "tv" },
  { title: "Ms. Marvel", id: 92782, media: "tv" },
  { title: "Thor: Love and Thunder", id: 616037, media: "movie" },
  { title: "Black Panther: Wakanda Forever", id: 505642, media: "movie" },
  { title: "Ant-Man and the Wasp: Quantumania", id: 640146, media: "movie" },
  { title: "Guardians of the Galaxy Vol. 3", id: 447365, media: "movie" },
];

const HarryPotterArray: WatchCardInfo[] = [
  {
    title: "Fantastic Beasts and Where to Find Them",
    id: 259316,
    media: "movie",
  },
  {
    title: "Fantastic Beasts: The Crimes of Grindelwald",
    id: 338952,
    media: "movie",
  },
  {
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    id: 338953,
    media: "movie",
  },
  { title: "Harry Potter and the Philosopher's Stone", id: 671, media: "movie" },
  { title: "Harry Potter and the Chamber of Secrets", id: 672, media: "movie" },
  { title: "Harry Potter and the Prisoner of Azkaban", id: 673, media: "movie" },
  { title: "Harry Potter and the Goblet of Fire", id: 674, media: "movie" },
  {
    title: "Harry Potter and the Order of the Phoenix",
    id: 675,
    media: "movie",
  },
  { title: "Harry Potter and the Half-Blood Prince", id: 767, media: "movie" },
  {
    title: "Harry Potter and the Deathly Hallows: Part 1",
    id: 12444,
    media: "movie",
  },
  {
    title: "Harry Potter and the Deathly Hallows: Part 2",
    id: 12445,
    media: "movie",
  },
];

const StarWarsArray: WatchCardInfo[] = [
  {
    title: "Star Wars: Episode I - The Phantom Menace",
    id: 1893,
    media: "movie",
  },
  {
    title: "Star Wars: Episode II - Attack of the Clones",
    id: 1894,
    media: "movie",
  },
  { title: "Star Wars: The Clone Wars", id: 4194, media: "tv" },
  {
    title: "Star Wars: Episode III - Revenge of the Sith",
    id: 1895,
    media: "movie",
  },
  { title: "Solo: A Star Wars Story", id: 348350, media: "movie" },
  { title: "Obi-Wan Kenobi", id: 92830, media: "tv" },
  { title: "Star Wars Rebels", id: 60554, media: "tv" },
  { title: "Star Wars: Andor", id: 83867, media: "tv" },
  { title: "Rogue One: A Star Wars Story", id: 330459, media: "movie" },
  { title: "Star Wars", id: 11, media: "movie" },
  { title: "The Empire Strikes Back", id: 1891, media: "movie" },
  { title: "Return of the Jedi", id: 1892, media: "movie" },
  { title: "The Mandalorian", id: 82856, media: "tv" },
  { title: "The Book of Boba Fett", id: 115036, media: "tv" },
  { title: "Ahsoka", id: 114461, media: "tv" },
  { title: "Star Wars: Skeleton Crew", id: 202879, media: "tv" },
  { title: "Star Wars Resistance", id: 79093, media: "tv" },
  { title: "Star Wars: The Force Awakens", id: 140607, media: "movie" },
  { title: "Star Wars: The Last Jedi", id: 181808, media: "movie" },
  { title: "Star Wars: The Rise of Skywalker", id: 181812, media: "movie" },
];

const LordoftheRingsArray: WatchCardInfo[] = [
  { title: "The Lord of the Rings: The Rings of Power", id: 84773, media: "tv" },
  { title: "The Hobbit: An Unexpected Journey", id: 49051, media: "movie" },
  { title: "The Hobbit: The Desolation of Smaug", id: 57158, media: "movie" },
  {
    title: "The Hobbit: The Battle of the Five Armies",
    id: 122917,
    media: "movie",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 120,
    media: "movie",
  },
  { title: "The Lord of the Rings: The Two Towers", id: 121, media: "movie" },
  {
    title: "The Lord of the Rings: The Return of the King",
    id: 122,
    media: "movie",
  },
];

const PiratesOfCaribbeanArray: WatchCardInfo[] = [
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    id: 22,
    media: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Man's Chest",
    id: 58,
    media: "movie",
  },
  { title: "Pirates of the Caribbean: At World's End", id: 285, media: "movie" },
  {
    title: "Pirates of the Caribbean: On Stranger Tides",
    id: 1865,
    media: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Men Tell No Tales",
    id: 166426,
    media: "movie",
  },
];

const TwilightArray: WatchCardInfo[] = [
  { title: "Twilight", id: 8966, media: "movie" },
  { title: "The Twilight Saga: New Moon", id: 18239, media: "movie" },
  { title: "The Twilight Saga: Eclipse", id: 24021, media: "movie" },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 1",
    id: 50619,
    media: "movie",
  },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 2",
    id: 50620,
    media: "movie",
  },
];

export const CollectionsArrays: CollectionsList = {
  Marvel: {
    name: "Marvel",
    watchCards: MarvelArray,
    urls: getUrls(MarvelArray),
  },
  HarryPotter: {
    name: "Harry Potter",
    watchCards: HarryPotterArray,
    urls: getUrls(HarryPotterArray),
  },
  StarWars: {
    name: "Star Wars",
    watchCards: StarWarsArray,
    urls: getUrls(StarWarsArray),
  },
  LordoftheRings: {
    name: "Lord of the Rings",
    watchCards: LordoftheRingsArray,
    urls: getUrls(LordoftheRingsArray),
  },
  PiratesOfCaribbean: {
    name: "Pirates Of Caribbean",
    watchCards: PiratesOfCaribbeanArray,
    urls: getUrls(PiratesOfCaribbeanArray),
  },
  Twilight: {
    name: "Twilight",
    watchCards: TwilightArray,
    urls: getUrls(TwilightArray),
  },
};
