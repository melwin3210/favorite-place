
import {GOOGLE_MAP_API_KEY} from '@env'
const GGOGLE_API_KEY = GOOGLE_MAP_API_KEY;

export const getMapPreviewUrl = (lat,long) => {
    const uri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${long}
&key=${GGOGLE_API_KEY}`
    return uri
}