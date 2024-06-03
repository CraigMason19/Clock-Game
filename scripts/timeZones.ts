// Timezones are from the (IANA) -> Internet Assigned Numbers Authority 
// https://www.iana.org/time-zones

// Place names look like this
// name: "London",
// fullname: "Europe/London",
// offset: "GMT+1",
// timeZone: "Europe"
// timeZoneName: "British Summer Time"

export interface Place {
    name: string;
    fullname: string;
    region: string;

    offset: string;
    timeZone: string;
}

export const DEFAULT_LOCATION = "en-GB";

// NOTE: Needed to add (Intl as any) & timeZone: any to work with typescript even though this runs in JS.

function createTimeZoneData(timeZoneString: any) : Place {
    const parts = timeZoneString.split('/');

    const name = parts[parts.length - 1].replaceAll('_', ' ');
    const region = parts.slice(0, parts.length - 1).join('/');

    const offset = new Intl.DateTimeFormat(DEFAULT_LOCATION,{timeZone:timeZoneString, timeZoneName:'shortOffset'}).formatToParts().find(part => part.type==='timeZoneName')!.value
    const timeZoneName = new Intl.DateTimeFormat(DEFAULT_LOCATION,{timeZone:timeZoneString, timeZoneName:'long'}).formatToParts().find(part => part.type==='timeZoneName')!.value
    
    return { fullname: timeZoneString, name, offset, region: region, timeZone: timeZoneName, };
}

/**
 * An array of all timezones according to the (IANA) -> Internet Assigned Numbers Authority 
 * @type {Place[]}
 */
export const PLACE_DATA: any[] = (Intl as any).supportedValuesOf('timeZone').map((timeZone: any) => createTimeZoneData(timeZone));

/**
 * Just because this is my timezone. (UK)
 * @type {Place}
 */
export const LONDON: Place = PLACE_DATA.find(p => p.name === "London"); 

export function randomPlace(): Place {
    const randomIndex = Math.floor(Math.random() * PLACE_DATA.length);
    return PLACE_DATA[randomIndex];
}

export function getUniquePlaces(n: number): Place[] {
    let uniqueTimes: Set<string> = new Set<string>();
    let uniquePlaces: Place[] = [];

    while (uniqueTimes.size < n) {
        let random = randomPlace();

        if (!uniqueTimes.has(random.timeZone)) {
            uniqueTimes.add(random.timeZone);
            uniquePlaces.push(random);
        }
    }

    return uniquePlaces;
}