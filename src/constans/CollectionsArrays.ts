import { CollectionsList, WatchCardInfo } from "@/types/collection";

const MarvelArray: WatchCardInfo[] = [
  { title: "Captain America: The First Avenger", id: 1771, type: "movie" },
  { title: "Marvel's Agent Carter", id: 61550, type: "tv" },
  { title: "Captain Marvel", id: 299537, type: "movie" },
  { title: "Iron Man", id: 1726, type: "movie" },
  { title: "Iron Man 2", id: 10138, type: "movie" },
  { title: "The Incredible Hulk", id: 1724, type: "movie" },
  { title: "Thor", id: 10195, type: "movie" },
  { title: "The Avengers", id: 24428, type: "movie" },
  { title: "Iron Man 3", id: 68721, type: "movie" },
  { title: "Marvel's Agents of S.H.I.E.L.D.", id: 1403, type: "tv" },
  { title: "Thor: The Dark World", id: 76338, type: "movie" },
  { title: "Captain America: The Winter Soldier", id: 100402, type: "movie" },
  { title: "Guardians of the Galaxy", id: 118340, type: "movie" },
  { title: "Guardians of the Galaxy Vol. 2", id: 283995, type: "movie" },
  { title: "Avengers: Age of Ultron", id: 99861, type: "movie" },
  { title: "Ant-Man", id: 102899, type: "movie" },
  { title: "Captain America: Civil War", id: 271110, type: "movie" },
  { title: "Black Widow", id: 497698, type: "movie" },
  { title: "Doctor Strange", id: 284052, type: "movie" },
  { title: "Black Panther", id: 284054, type: "movie" },
  { title: "Spider-Man: Homecoming", id: 315635, type: "movie" },
  { title: "Thor: Ragnarok", id: 284053, type: "movie" },
  { title: "Ant-Man and the Wasp", id: 363088, type: "movie" },
  { title: "Avengers: Infinity War", id: 299536, type: "movie" },
  { title: "Avengers: Endgame", id: 299534, type: "movie" },
  { title: "Loki", id: 84958, type: "tv" },
  { title: "What If...?", id: 91363, type: "tv" },
  { title: "WandaVision", id: 85271, type: "tv" },
  { title: "The Falcon and the Winter Soldier", id: 88396, type: "tv" },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    id: 566525,
    type: "movie",
  },
  { title: "Eternals", id: 524434, type: "movie" },
  { title: "Spider-Man: Far From Home", id: 429617, type: "movie" },
  { title: "Spider-Man: No Way Home", id: 634649, type: "movie" },
  {
    title: "Doctor Strange in the Multiverse of Madness",
    id: 453395,
    type: "movie",
  },
  { title: "Hawkeye", id: 88329, type: "tv" },
  { title: "Moon Knight", id: 92749, type: "tv" },
  { title: "She-Hulk: Attorney at Law", id: 92783, type: "tv" },
  { title: "Ms. Marvel", id: 92782, type: "tv" },
  { title: "Thor: Love and Thunder", id: 616037, type: "movie" },
  { title: "Black Panther: Wakanda Forever", id: 505642, type: "movie" },
  { title: "Ant-Man and the Wasp: Quantumania", id: 640146, type: "movie" },
  { title: "Guardians of the Galaxy Vol. 3", id: 447365, type: "movie" },
];

const HarryPotterArray: WatchCardInfo[] = [
  {
    title: "Fantastic Beasts and Where to Find Them",
    id: 259316,
    type: "movie",
  },
  {
    title: "Fantastic Beasts: The Crimes of Grindelwald",
    id: 338952,
    type: "movie",
  },
  {
    title: "Fantastic Beasts: The Secrets of Dumbledore",
    id: 338953,
    type: "movie",
  },
  { title: "Harry Potter and the Philosopher's Stone", id: 671, type: "movie" },
  { title: "Harry Potter and the Chamber of Secrets", id: 672, type: "movie" },
  { title: "Harry Potter and the Prisoner of Azkaban", id: 673, type: "movie" },
  { title: "Harry Potter and the Goblet of Fire", id: 674, type: "movie" },
  {
    title: "Harry Potter and the Order of the Phoenix",
    id: 675,
    type: "movie",
  },
  { title: "Harry Potter and the Half-Blood Prince", id: 767, type: "movie" },
  {
    title: "Harry Potter and the Deathly Hallows: Part 1",
    id: 12444,
    type: "movie",
  },
  {
    title: "Harry Potter and the Deathly Hallows: Part 2",
    id: 12445,
    type: "movie",
  },
];

const StarWarsArray: WatchCardInfo[] = [
  {
    title: "Star Wars: Episode I - The Phantom Menace",
    id: 1893,
    type: "movie",
  },
  {
    title: "Star Wars: Episode II - Attack of the Clones",
    id: 1894,
    type: "movie",
  },
  { title: "Star Wars: The Clone Wars", id: 4194, type: "tv" },
  {
    title: "Star Wars: Episode III - Revenge of the Sith",
    id: 1895,
    type: "movie",
  },
  { title: "Solo: A Star Wars Story", id: 348350, type: "movie" },
  { title: "Obi-Wan Kenobi", id: 92830, type: "tv" },
  { title: "Star Wars Rebels", id: 60554, type: "tv" },
  { title: "Star Wars: Andor", id: 83867, type: "tv" },
  { title: "Rogue One: A Star Wars Story", id: 330459, type: "movie" },
  { title: "Star Wars", id: 11, type: "movie" },
  { title: "The Empire Strikes Back", id: 1891, type: "movie" },
  { title: "Return of the Jedi", id: 1892, type: "movie" },
  { title: "The Mandalorian", id: 82856, type: "tv" },
  { title: "The Book of Boba Fett", id: 115036, type: "tv" },
  { title: "Ahsoka", id: 114461, type: "tv" },
  { title: "Star Wars: Skeleton Crew", id: 202879, type: "tv" },
  { title: "Star Wars Resistance", id: 79093, type: "tv" },
  { title: "Star Wars: The Force Awakens", id: 140607, type: "movie" },
  { title: "Star Wars: The Last Jedi", id: 181808, type: "movie" },
  { title: "Star Wars: The Rise of Skywalker", id: 181812, type: "movie" },
];

const LordoftheRingsArray: WatchCardInfo[] = [
  { title: "The Lord of the Rings: The Rings of Power", id: 84773, type: "tv" },
  { title: "The Hobbit: An Unexpected Journey", id: 49051, type: "movie" },
  { title: "The Hobbit: The Desolation of Smaug", id: 57158, type: "movie" },
  {
    title: "The Hobbit: The Battle of the Five Armies",
    id: 122917,
    type: "movie",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 120,
    type: "movie",
  },
  { title: "The Lord of the Rings: The Two Towers", id: 121, type: "movie" },
  {
    title: "The Lord of the Rings: The Return of the King",
    id: 122,
    type: "movie",
  },
];

const PiratesOfCaribbeanArray: WatchCardInfo[] = [
  {
    title: "Pirates of the Caribbean: The Curse of the Black Pearl",
    id: 22,
    type: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Man's Chest",
    id: 58,
    type: "movie",
  },
  { title: "Pirates of the Caribbean: At World's End", id: 285, type: "movie" },
  {
    title: "Pirates of the Caribbean: On Stranger Tides",
    id: 1865,
    type: "movie",
  },
  {
    title: "Pirates of the Caribbean: Dead Men Tell No Tales",
    id: 166426,
    type: "movie",
  },
];

const TwilightArray: WatchCardInfo[] = [
  { title: "Twilight", id: 8966, type: "movie" },
  { title: "The Twilight Saga: New Moon", id: 18239, type: "movie" },
  { title: "The Twilight Saga: Eclipse", id: 24021, type: "movie" },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 1",
    id: 50619,
    type: "movie",
  },
  {
    title: "The Twilight Saga: Breaking Dawn - Part 2",
    id: 50620,
    type: "movie",
  },
];

export const CollectionsArrays: CollectionsList = {
  Marvel: {
    name: "Marvel",
    watchCards: MarvelArray,
  },
  HarryPotter: {
    name: "Harry Potter",
    watchCards: HarryPotterArray,
  },
  StarWars: {
    name: "Star Wars",
    watchCards: StarWarsArray,
  },
  LordoftheRings: {
    name: "Lord of the Rings",
    watchCards: LordoftheRingsArray,
  },
  PiratesOfCaribbean: {
    name: "Pirates Of Caribbean",
    watchCards: PiratesOfCaribbeanArray,
  },
  Twilight: {
    name: "Twilight",
    watchCards: TwilightArray,
  },
};
