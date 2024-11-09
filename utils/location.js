const GGOGLE_API_KEY = 'AIzaSyDuAZ0v1JLMW72uqft1i1OgJBldAGPeCus';

export const getMapPreviewUrl = (lat,long) => {
    const uri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${long}
&key=${GGOGLE_API_KEY}`
    return uri
}