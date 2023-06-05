import { Movie } from '../../types/common';

export interface SliderProps{
    sliderTitle?: string, 
    sliderType?: string, 
    watchCards: Movie[], 
    isloading?: boolean, 
    pages: number, 
    visible: number, 
    isLink: boolean, 
    columnGap: number, 
    id?: string
}