import { WorkTime } from "./WorkTime";

export class UserProfile {

    constructor(private userId:string,
                private password:string = '',
                private firstName:string = '',
                private lastName:string = '',
                private eMail:string = '',
                private photo:string = '',
                private shortSelfPresent:string = '',
                private workTime: WorkTime | null = null ) {
    }

    
    public getUserId() : string {
        return this.userId;
    }
    
    /**
     * getPassword
 : string    */
    public getPassword(): string {
        return this.password;
    }

    /**
     * getFirstName
 : string    */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * getLastName
 : string    */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * getEMail
 : string    */
    public getEMail(): string {
        return this.eMail;
    }

    /**
     * getPhoto
 : string    */
    public getPhoto(): string {
        return this.photo;
    }

    /**
     * getShortSelfPresentati
     */
    public getShortSelfPresentation(): string {
        return this.shortSelfPresent;
    }

    public getWorkTime(): WorkTime | null {
        return this.workTime;
    }
}