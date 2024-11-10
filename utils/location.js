import { GOOGLE_MAP_API_KEY } from "@env";
const GGOGLE_API_KEY = GOOGLE_MAP_API_KEY;

export const getMapPreviewUrl = (lat, long) => {
  const uri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${long}
&key=${GGOGLE_API_KEY}`;
  return uri;
};

export const addressFetch = async (lat, long) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API_KEY}`;
      const response = await fetch(url);
      
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const jsonData = await response.json();
  
      if (jsonData.results && jsonData.results.length > 0) {
        const address = jsonData.results[0].formatted_address;
        return address;
      } else {
        throw new Error("No address found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return null; // or handle the error as needed
    }
  };
