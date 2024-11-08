class Place {
    constructor(title, imageUri, address, location){
        this.imageUri = imageUri;
        this.title = title;
        this.address = address;
        this.location = location;
        this.id = new Date().toString() + Math.random().toString()
    }
}