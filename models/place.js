export class Place {
    constructor(title, imageUri,location){
        this.imageUri = imageUri;
        this.title = title;
        this.address = location.address;
        this.location = {lat:location.lat, long:location.long};
        this.id = new Date().toString() + Math.random().toString()
    }
}