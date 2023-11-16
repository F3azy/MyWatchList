import { IconType } from "react-icons/lib";
import { To } from "react-router-dom";
import {
  BiHomeAlt,
  BiSearch,
  BiMovie,
  BiCameraMovie,
  BiTable,
} from "react-icons/bi";
import { FaRandom, FaUserFriends } from "react-icons/fa";
import { FiSettings, FiLogOut, FiUser } from "react-icons/fi";

type LinkItem = {
  name: string;
  to: To;
  icon: IconType;
};

export const NavLinks: Array<LinkItem> = [
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
    to: "/browse/movie",
    icon: BiCameraMovie,
  },
  {
    name: "Series",
    to: "/browse/tv",
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

export const MenuLinks: Array<LinkItem> = [
  {
    name: "Profile",
    to: "/",
    icon: FiUser,
  },
  {
    name: "Settings",
    to: "/",
    icon: FiSettings,
  },
  {
    name: "Log Out",
    to: "/",
    icon: FiLogOut,
  },
];
