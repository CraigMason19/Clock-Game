// Timezones are from the (IANA) -> Internet Assigned Numbers Authority 
// https://www.iana.org/time-zones

/**
 * Interface representing a place with its details.
 * 
 * e.g:
 * - name: "London"
 * - fullname: "Europe/London"
 * - offset: "GMT+1"
 * - timeZone: "Europe"
 * - timeZoneName: "British Summer Time"
 */
export interface Place {
    name: string;
    fullname: string;
    region: string;

    offset: string;
    timeZone: string;
}

export const DEFAULT_LOCATION = "en-GB";

/**
 * An array of all timezones according to the (IANA) -> Internet Assigned Numbers Authority.
 * 
 * Note: This will be an array of Place objects but I need to use any to use this TS functioanlity.
 * 
 * @type {any[]}
 */
export const PLACE_DATA: any[] = (Intl as any).supportedValuesOf('timeZone').map((timeZone: any) => createTimeZoneData(timeZone));

/**
 * Just because this is my timezone. (UK)
 * @type {Place}
 */
export const LONDON: Place = PLACE_DATA.find(p => p.name === "London"); 

/**
 * Retrieves the current timezone of the runtime's locale. (The environment where the code is being executed).
 *
 * @param {none} none - No parameters are passed to this function.
 * @returns {string} The current timezone as an IANA time zone identifier (e.g., "America/New_York", "Europe/London").
 */
 function getCurrentTimeZone(): string {
    const timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
}

/**
 * Creates Place data from a given time zone string.
 *
 * Needed to add (Intl as any) & timeZone: any to work with typescript even though this runs in JS.
 * 
 * @param {string} timeZoneString - The time zone string (e.g., "Europe/London").
 * @returns {Place} A Place object representing the time zone data.
 * @example
 */
function createTimeZoneData(timeZoneString: any) : Place {
    const parts = timeZoneString.split('/');

    const name = parts[parts.length - 1].replaceAll('_', ' ');
    const region = parts.slice(0, parts.length - 1).join('/');

    const offset = new Intl.DateTimeFormat(DEFAULT_LOCATION,{timeZone:timeZoneString, timeZoneName:'shortOffset'}).formatToParts().find(part => part.type==='timeZoneName')!.value
    const timeZoneName = new Intl.DateTimeFormat(DEFAULT_LOCATION,{timeZone:timeZoneString, timeZoneName:'long'}).formatToParts().find(part => part.type==='timeZoneName')!.value
    
    return { fullname: timeZoneString, name, offset, region: region, timeZone: timeZoneName, };
}

/**
 * Returns a random place.
 *
 * @param {none} none - No parameters are passed to this function.
 * @returns {Place} A Place interface representing the random place.
 */
export function randomPlace(): Place {
    const randomIndex = Math.floor(Math.random() * PLACE_DATA.length);
    return PLACE_DATA[randomIndex];
}

/**
 * Generates an array of unique places with unique time zones and offsets, avoiding duplicate times on a 12-hour clock.
 *
 * @param {number} n - The number of unique places to generate.
 * @returns {Place[]} An array of unique places.
 */
 export function getUniquePlaces(n: number): Place[] {
    let uniqueTimes: Set<string> = new Set<string>();
    let uniqueOffsets: Set<number> = new Set<number>();
    let uniquePlaces: Place[] = [];

    while (uniqueTimes.size < n && uniqueOffsets.size < n) {
        let random = randomPlace();
        let offsetValue = parseFloat(random.offset.replace('GMT', ''));

        // Calculate the equivalent offset in the 12-hour format
        let offsetMod12 = ((offsetValue % 12) + 12) % 12;

        if (!uniqueTimes.has(random.timeZone) && !uniqueOffsets.has(offsetMod12)) {
            uniqueTimes.add(random.timeZone);
            uniqueOffsets.add(offsetMod12);
            uniquePlaces.push(random);
        }
    }

    return uniquePlaces;
}