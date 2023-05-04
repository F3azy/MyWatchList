import { ComponentWithAs } from '@chakra-ui/react';
import React from 'react';

export interface ScrollButtonProps {
    as: ComponentWithAs<"svg">, 
    direction?: string, 
    setTransform: React.Dispatch<React.SetStateAction<number>>, 
    showButton: boolean
};