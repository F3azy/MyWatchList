import React from 'react';
import { useParams } from 'react-router-dom';

const MovieSeriesInfo = () => {
  const { type, id } = useParams();


  return (
    <div>
      Movie_Series_Info
    </div>
  )
};

export default MovieSeriesInfo;
