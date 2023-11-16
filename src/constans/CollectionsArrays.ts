import { CollectionsList, WatchCardInfo } from "@/types/collection";

const url = "https://api.themoviedb.org/3/";

function getUrls(collectionArray: WatchCardInfo[]): string[] {
  return collectionArray.map(
    (coll) =>
      url +
      coll.media_type +
      "/" +
      coll.id +
      `?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&language=en-US`
  );
}

const MarvelArray: WatchCardInfo[] = [
  { title: "Captain America: The First Avenger", id: 1771, media_type: "movie" },
  { title: "Marvel's Agent Carter", id: 61550, media_type: "tv" },
  { title: "Captain Marvel", id: 299537, media_type: "movie" },
  { title: "Iron Man", id: 1726, media_type: "movie" },
  { title: "Iron Man 2", id: 10138, media_type: "movie" },
  { title: "The Incredible Hulk", id: 1724, media_type: "movie" },
  { title: "Thor", id: 10195, media_type: "movie" },
  { title: "The Avengers", id: 24428, media_type: "movie" },
  { title: "Iron Man 3", id: 68721, media_type: "movie" },
  { title: "Marvel's Agents of S.H.I.E.L.D.", id: 1403, media_type: "tv" },
  { title: "Thor: The Dark World", id: 76338, media_type: "movie" },
  { title: "Captain America: The Winter Soldier", id: 100402, media_type: "movie" },
  { title: "Guardians of the Galaxy", id: 118340, media_type: "movie" },
  { title: "Guardians of the Galaxy Vol. 2", id: 283995, media_type: "movie" },
  { title: "Avengers: Age of Ultron", id: 99861, media_type: "movie" },
  { title: "Ant-Man", id: 102899, media_type: "movie" },
  { title: "Captain America: Civil War", id: 271110, media_type: "movie" },
  { title: "Black Widow", id: 497698, media_type: "movie" },
  { title: "Doctor Strange", id: 284052, media_type: "movie" },
  { title: "Black Panther", id: 284054, media_type: "movie" },
  { title: "Spider-Man: Homecoming", id: 315635, media_type: "movie" },
  { title: "Thor: Ragnarok", id: 284053, media_type: "movie" },
  { title: "Ant-Man and the Wasp", id: 363088, media_type: "movie" },
  { title: "Avengers: Infinity War", id: 299536, media_type: "movie" },
  { title: "Avengers: Endgame", id: 299534, media_type: "movie" },
  { title: "Loki", id: 84958, media_type: "tv" },
  { title: "What If...?", id: 91363, media_type: "tv" },
  { title: "WandaVision", id: 85271, media_type: "tv" },
  { title: "The Falcon and the Winter Soldier", id: 88396, media_type: "tv" },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    id: 566525,
    media_type: "movie",
  },
  { title: "Eternals", id: 524434, media_type: "movie" },
  { title: "Spider-Man: Far From Home", id: 429617, media_type: "movie" },
  { title: "Spider-Man: No Way Home", id: 634649, media_type: "movie" },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    id: 453395,
    media_type: "movie",
  },
  { title: "Hawkeye", id: 88329, media_type: "tv" },
  { title: "Moon Knight", id: 92749, media_type: "tv" },
  { title: "She-Hulk: Attorney at Law", id: 92783, media_type: "tv" },
  { title: "Ms. Marvel", id: 92782, media_type: "tv" },
  { title: "Thor: Love and Thunder", id: 616037, media_type: "movie" },
  { title: "Black Panther: Wakanda Forever", id: 505642, media_type: "movie" },
  { title: "Ant-Man and the Wasp: Quantumania", id: 640146, media_type: "movie" },
  { title: "Guardians of the Galaxy Vol. 3", id: 447365, media_type: "movie" },
];

const HarryPotterArray: WatchCardInfo[] = [
  {
    title: "Fantastic Beasts and Where to Find Them",
    id: 259316,
    media_type: "movie",
  },
  {
    title: "Fantastic Beasts: The Crimes of Grindelwald",
    id: 338952,
    media_type: "movie",
  },
  {
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    id: 338953,
    media_type: "movie",
  },
  { title: "Harry Potter and the Philosopher's Stone", id: 671, media_type: "movie" },
  { title: "Harry Potter and the Chamber of Secrets", id: 672, media_type: "movie" },
  { title: "Harry Potter and the Prisoner of Azkaban", id: 673, media_type: "movie" },
  { title: "Harry Potter and the Goblet of Fire", id: 674, media_type: "movie" },
  {
    title: "Harry Potter and the Order of the Phoenix",
    id: 675,
    media_type: "movie",
  },
  { title: "Harry Potter and the Half-Blood Prince", id: 767, media_type: "movie" },
  {
    title: "Harry Potter and the Deathly Hallows: Part 1",
    id: 12444,
    media_type: "movie",
  },
  {
    title: "Harry Potter and the Deathly Hallows: Part 2",
    id: 12445,
    media_type: "movie",
  },
];

const StarWarsArray: WatchCardInfo[] = [
  {
    title: "Star Wars: Episode I - The Phantom Menace",
    id: 1893,
    media_type: "movie",
  },
  {
    title: "Star Wars: Episode II - Attack of the Clones",
    id: 1894,
    media_type: "movie",
  },
  { title: "Star Wars: The Clone Wars", id: 4194, media_type: "tv" },
  {
    title: "Star Wars: Episode III - Revenge of the Sith",
    id: 1895,
    media_type: "movie",
  },
  { title: "Solo: A Star Wars Story", id: 348350, media_type: "movie" },
  { title: "Obi-Wan Kenobi", id: 92830, media_type: "tv" },
  { title: "Star Wars Rebels", id: 60554, media_type: "tv" },
  { title: "Star Wars: Andor", id: 83867, media_type: "tv" },
  { title: "Rogue One: A Star Wars Story", id: 330459, media_type: "movie" },
  { title: "Star Wars", id: 11, media_type: "movie" },
  { title: "The Empire Strikes Back", id: 1891, media_type: "movie" },
  { title: "Return of the Jedi", id: 1892, media_type: "movie" },
  { title: "The Mandalorian", id: 82856, media_type: "tv" },
  { title: "The Book of Boba Fett", id: 115036, media_type: "tv" },
  { title: "Ahsoka", id: 114461, media_type: "tv" },
  { title: "Star Wars: Skeleton Crew", id: 202879, media_type: "tv" },
  { title: "Star Wars Resistance", id: 79093, media_type: "tv" },
  { title: "Star Wars: The Force Awakens", id: 140607, media_type: "movie" },
  { title: "Star Wars: The Last Jedi", id: 181808, media_type: "movie" },
  { title: "Star Wars: The Rise of Skywalker", id: 181812, media_type: "movie" },
];

const LordoftheRingsArray: WatchCardInfo[] = [
  { title: "The Lord of the Rings: The Rings of Power", id: 84773, media_type: "tv" },
  { title: "The Hobbit: An Unexpected Journey", id: 49051, media_type: "movie" },
  { title: "The Hobbit: The Desolation of Smaug", id: 57158, media_type: "movie" },
  {
    title: "The Hobbit: The Battle of the Five Armies",
    id: 122917,
    media_type: "movie",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 120,
    media_type: "movie",
  },
  { title: "The Lord of the Rings: The Two Towers", id: 121, media_type: "movie" },
  {
    title: "The Lord of the Rings: The Return of the King",
    id: 122,
    media_type: "movie",
  },
];

const PiratesOfCaribbeanArray: WatchCardInfo[] = [
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    id: 22,
    media_type: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Man's Chest",
    id: 58,
    media_type: "movie",
  },
  { title: "Pirates of the Caribbean: At World's End", id: 285, media_type: "movie" },
  {
    title: "Pirates of the Caribbean: On Stranger Tides",
    id: 1865,
    media_type: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Men Tell No Tales",
    id: 166426,
    media_type: "movie",
  },
];

const TwilightArray: WatchCardInfo[] = [
  { title: "Twilight", id: 8966, media_type: "movie" },
  { title: "The Twilight Saga: New Moon", id: 18239, media_type: "movie" },
  { title: "The Twilight Saga: Eclipse", id: 24021, media_type: "movie" },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 1",
    id: 50619,
    media_type: "movie",
  },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 2",
    id: 50620,
    media_type: "movie",
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
