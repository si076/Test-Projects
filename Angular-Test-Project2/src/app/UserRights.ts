export class UserRights {

    constructor(private userManagement: number = 0, 
                private userObjectManagement: number = 0,
                private userEventManagement: number = 0) {}

    /**
     * canUserManagement
 : boolean    */
    public canUserManagement(): boolean {
        return this.userManagement > 0;
    }

    /**
     * canAssignUnassignUserToObj
     */
    public canAssignUnassignUserToObj(): boolean {
        return (this.userManagement & 1) === 1;
    }

    /**
     * canActivateDeactivateUser
: boolean    */
    public canActivateDeactivateUser(): boolean {
        return (this.userManagement & 2) === 2;
    }

    /**
     * canDeleteUser
 : boolean    */
    public canDeleteUser(): boolean {
        return (this.userManagement & 4) === 4;
    }

    /**
     * canUserObjectManagement
 : boolean    */
    public canUserObjectManagement(): boolean {
        return this.userObjectManagement > 0;
    }

    /**
     * canCreateEditOwnObj
     */
    public canCreateEditOwnObj(): boolean {
        return (this.userObjectManagement & 1) === 1;
    }

    /**
     * canEditForeignObj
     */
    public canEditForeignObj(): boolean {
        return (this.userObjectManagement & 2) === 2;
    }

    /**
     * canDeleteObj
 : boolean    */
    public canDeleteObj(): boolean {
        return (this.userObjectManagement & 4) === 4;
    }

    /**
     * canCancelForeignEvent
     */
    public canCancelForeignEvent(): boolean {
        return (this.userEventManagement & 1) === 1;
    }

    /**
     * canNegotiateChangeForeignEvent
 : boolean    */
    public canNegotiateChangeForeignEvent(): boolean {
        return (this.userObjectManagement & 2) === 2;
    }
}