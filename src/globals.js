// Enum
export const SortType = { ASC: 0, DESC: 1 };
// The enum-like types in JS has no length property, so: Object.keys(SortType).length
SortType.length = Object.keys(SortType).length;

export const URL = "https://todos-mpwar.herokuapp.com";

/** Utility methods */
export function toLocalDateTime(stringISO8601) {
    // Input format is ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
    let dateToConvert = new Date(stringISO8601);
    let tzOffset = (new Date()).getTimezoneOffset() * 60000; // Time zone offset in millis
    let localISOTime = (new Date(dateToConvert.getTime() - tzOffset)).toISOString().slice(0, -1); // Removes the 'Z'ulu char

    //console.log(`localISOTime: ${localISOTime}`);
    return localISOTime;
};

export function toISO8601(stringLocalDateTime) {
    // Input format is YYYY-MM-DDTHH:mm:ss.sss in local time
    let dateToConvert = new Date(stringLocalDateTime + 'Z'); // Adding 'Z'ulu char to be a valid ISO8601, but includes the TZ offset
    let tzOffset = (new Date()).getTimezoneOffset() * 60000; // Time zone offset in millis
    let isoTime = (new Date(dateToConvert.getTime() + tzOffset)).toISOString();

    //console.log(`isoTime: ${isoTime}`);
    return isoTime;
};