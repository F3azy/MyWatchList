import { IconType } from "react-icons/lib";
import { To } from "react-router-dom";
import { BiHomeAlt, BiSearch, BiMovie, BiCameraMovie, BiTable } from 'react-icons/bi';
import { FaRandom, FaUserFriends } from 'react-icons/fa';

export interface LinkItemProps {
    name: string,
    to: To,
    icon: IconType,
};

export const Links: Array<LinkItemProps> = [
    {
      name: "Home",
      to: "/",
      icon: BiHomeAlt,
    },
    {
      name: "Search",
      to: "/search",
      icon: BiSearch,
    },
    {
      name: "Movies",
      to: "/movies",
      icon: BiCameraMovie,
    },
    {
      name: "Series",
      to: "/series",
      icon: BiMovie,
    },
    {
      name: "My List",
      to: "/myList",
      icon: BiTable,
    },
    {
      name: "Random",
      to: "/random",
      icon: FaRandom,
    },
    // {
    //   name: "Friends",
    //   to: "/friends",
    //   icon: FaUserFriends,
    // }
  ];
