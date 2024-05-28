// Timezones are from https://www.iana.org/time-zones

// Place names look like this
// name: "London",
// offset: "GMT+1",
// timeZone: "Europe/London"
// timeZoneName: "British Summer Time"

export interface Place {
    name: string;
    offset: string;
    timeZone: string;
    timeZoneName: string;
}


// NOTE: Needed to add (Intl as any) & timeZone: any to work with typescript even though this runs in JS.

function createTimeZoneData(timeZone: any) : Place {
    const timeZoneName = new Intl.DateTimeFormat('en-GB',{timeZone:timeZone, timeZoneName:'long'}).formatToParts().find(part => part.type==='timeZoneName')!.value
  
    const offset = new Intl.DateTimeFormat('en-GB',{timeZone:timeZone, timeZoneName:'shortOffset'}).formatToParts().find(part => part.type==='timeZoneName')!.value
  
    let name = timeZone.split('/')[1].replaceAll('_', ' ');
  
    return { name, timeZone, timeZoneName, offset };
}

export const PLACE_DATA: any[] = (Intl as any).supportedValuesOf('timeZone').map((timeZone: any) => createTimeZoneData(timeZone));

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

        if (!uniqueTimes.has(random.timeZoneName)) {
            uniqueTimes.add(random.timeZoneName);
            uniquePlaces.push(random);
        }
    }

    return uniquePlaces;
}