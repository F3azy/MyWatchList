import { ComponentWithAs } from '@chakra-ui/react';
import React from 'react';

export interface ScrollButtonProps {
    as: ComponentWithAs<"svg">, 
    direction: string, 
    showButton: boolean,
    slider: React.RefObject<HTMLDivElement>,
    sliderWidth: number | null,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>, 
};