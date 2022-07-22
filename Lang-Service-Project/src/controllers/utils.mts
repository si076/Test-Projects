//Expected words to be an array of strings
export function getAsListForSQL(words:string[]) {
    const asString = words.join("','");
    return  "'" + asString + "'";
}