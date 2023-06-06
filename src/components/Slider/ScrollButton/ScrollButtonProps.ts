import { ComponentWithAs } from '@chakra-ui/react';
import React from 'react';

export interface ScrollButtonProps {
    as: ComponentWithAs<"svg">, 
    direction: string, 
    showButton: boolean,
    slider: React.RefObject<HTMLDivElement>,
    sliderWidth: number | undefined,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>, 
    id?: string,
    animate?: boolean,
    pages?: number,
    isloading?: boolean,
};