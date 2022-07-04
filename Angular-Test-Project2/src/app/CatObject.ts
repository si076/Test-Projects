import { CatObjectIntf } from "./CatObjectIntf";

export class CatObject implements CatObjectIntf {

    constructor(
        private type: string,
        private title: string,
        private description: string,
        private duration: number,
        private locations: string[],
        private prices: { minParticipants: number, maxParticipants: number, price: number }[],
        private firstMeetingFreeOfCharge: boolean,
        private backgroundColour: { r: number, g: number, b: number, a: number }) {};


    getType(): string {
        return this.type;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getDuration(): number {
        return this.duration;
    }

    getLocations(): string[] {
        return this.locations;
    }

    getPrices(): { minParticipants: number; maxParticipants: number; price: number; }[] {
        return this.prices;
    }

    isFirstMeetingFreeOfCharge(): boolean {
        return this.firstMeetingFreeOfCharge;
    }

    getBackgroundColour(): { r: number; g: number; b: number; a: number; } {
        return this.backgroundColour;
    }

}