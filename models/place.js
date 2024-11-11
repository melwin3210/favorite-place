export class Place {
    constructor(title, imageUri,location, id){
        this.imageUri = imageUri;
        this.title = title;
        this.address = location.address;
        this.location = {lat:location.lat, long:location.long};
        this.id = id
    }
}