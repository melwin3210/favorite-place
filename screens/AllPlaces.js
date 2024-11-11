import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';
import FallbackText from '../UI/FallbackText';

export const AllPlaces = ({route}) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setLoadingState] = useState(false)
  useEffect(()=>{
    const loadPlaces = async ()=>{
      setLoadingState(true)
     const places =  await fetchPlaces()
     setLoadingState(false)
     setPlaces(places)
    }
    isFocused && loadPlaces()
  },[isFocused]);
  
  if (isLoading) {
    return  <FallbackText>Loading please wait...</FallbackText>
  }
  return (
    <PlacesList  places={places}/>
  )
}
