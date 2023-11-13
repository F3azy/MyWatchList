import { BsGoogle, BsTwitter, BsFacebook } from "react-icons/bs";
import { IconType } from "react-icons/lib";

type SocialIcon = {
  name: string;
  icon: IconType;
};

export const Icons = [
  {
    name: "Google",
    icon: BsGoogle,
  },
  {
    name: "Twitter",
    icon: BsTwitter,
  },
  {
    name: "Facebook",
    icon: BsFacebook,
  },
];
