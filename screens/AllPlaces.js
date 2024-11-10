import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { useIsFocused } from '@react-navigation/native';

export const AllPlaces = ({route}) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused()
  useEffect(()=>{
     route?.params?.places && isFocused && setPlaces((places)=>[...places, route.params.places]) 
     route.params = ''
  },[route, isFocused]);
  
  
  return (
    <PlacesList  places={places}/>
  )
}
