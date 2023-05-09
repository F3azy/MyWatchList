import React, { useEffect } from 'react';
import { Select } from '@chakra-ui/react';

interface SelectInfoType {
  types: string[],
  genres: string[],
}

const SelectInfo: SelectInfoType = {
  types: [  
    "Movie",
    "Series",
  ],
  genres: [
    "Anime",
    "Action",
    "Animation",
    "Comedy",
    "Criminal",
    "Children",
    "Document",
    "Fantasy",
    "Horror",
    "Romantic Comedy",
    "Science Fiction",
    "Sport",
    "Thriller",
  ]
}


const MovieSelect = ({SelectInfoArray, setStateFun, changeFun}: {SelectInfoArray: keyof SelectInfoType, setStateFun: React.Dispatch<React.SetStateAction<string>>, changeFun?: React.ChangeEventHandler<HTMLSelectElement>}) => {

  useEffect(() => {
    setStateFun(SelectInfo[SelectInfoArray][0].toLocaleLowerCase());
  }, []);

  return (
    <Select w="200px" variant="base" defaultValue={SelectInfo[SelectInfoArray][0]} onChange={changeFun}>
        {SelectInfo[SelectInfoArray as keyof SelectInfoType].map((value) => 
        <option key={value} value={value.toLocaleLowerCase()}>{value}</option>
        )}
    </Select>
  )
};

export default MovieSelect;