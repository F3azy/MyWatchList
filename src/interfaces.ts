import { IconType } from "react-icons/lib";
import { To } from "react-router-dom";

export interface LinkItemProps {
    name: string,
    to: To,
    icon: IconType,
};
