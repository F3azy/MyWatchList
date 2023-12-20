import { FirebaseProviders } from "@/types/Auth";
import { IconType } from "react-icons";
import { BsGoogle, BsTwitter, BsFacebook } from "react-icons/bs";

export const Icons: { name: FirebaseProviders; icon: IconType }[] = [
  {
    name: "Google",
    icon: BsGoogle,
  },
  // {
  //   name: "Twitter",
  //   icon: BsTwitter,
  // },
  // {
  //   name: "Facebook",
  //   icon: BsFacebook,
  // },
];
