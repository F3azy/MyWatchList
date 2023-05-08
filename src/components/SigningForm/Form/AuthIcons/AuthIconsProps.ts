import { BsGoogle, BsTwitter, BsFacebook } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';

export interface SocialIconProps{
  name: string,
  icon: IconType,
};

export const Icons: Array<SocialIconProps> = [
    {
        name: "Google", 
        icon: BsGoogle
    },
    {
        name: "Twitter", 
        icon: BsTwitter
    },
    {
        name: "Facebook", 
        icon: BsFacebook
    },
];