import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';

export const AllPlaces = ({route}) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused()
  useEffect(()=>{
    const loadPlaces = async ()=>{
     const places =  await fetchPlaces()
     setPlaces(places)
    }
    isFocused && loadPlaces()
  },[isFocused]);
  
  
  return (
    <PlacesList  places={places}/>
  )
}
