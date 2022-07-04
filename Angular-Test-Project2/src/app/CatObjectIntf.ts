export interface CatObjectIntf {

    getType(): string;

    getTitle(): string;

    getDescription(): string;

    getDuration(): number;

    getLocations(): string[];

    getPrices(): {minParticipants: number, maxParticipants: number, price: number}[];

    isFirstMeetingFreeOfCharge(): boolean;

    getBackgroundColour(): {r:number, g:number, b:number, a:number};
}