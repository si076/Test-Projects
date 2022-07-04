export class Mediator {
    photoURL:string = '';
    shortSelfPresent:string = '';

    constructor(photoURL:string, shortSelfPresent:string) {
        this.photoURL = photoURL;
        this.shortSelfPresent = shortSelfPresent;
    }

    
    public getPhotoUrl() : string {
        return this.photoURL;
    }

    
    public getShortSelfPresent() : string {
        return this.shortSelfPresent;
    }
    
    
}