export class Convert {
    public static toHands(json: string): { [key: string]: Array<number[]> } {
        return JSON.parse(json);
    }

    public static handsToJson(value: { [key: string]: Array<number[]> }): string {
        return JSON.stringify(value);
    }
}