// Timezones https://www.iana.org/time-zones

export interface Place {
    name: string;
    timeZone: string;
    timeZoneName: string;
    offset: string;
}

// NOTE: Needed to add (Intl as any) & timeZone: any to work with typescript even though this runs in JS.

function createTimeZoneData(timeZone: any) : Place {
    const timeZoneName = new Intl.DateTimeFormat('en',{timeZone:timeZone, timeZoneName:'long'}).formatToParts().find(part => part.type==='timeZoneName')!.value
  
    const offset = new Intl.DateTimeFormat('en',{timeZone:timeZone, timeZoneName:'shortOffset'}).formatToParts().find(part => part.type==='timeZoneName')!.value
  
    let name = timeZone.split('/')[1].replaceAll('_', ' ');
  
    return { name, timeZone, timeZoneName, offset };
}

export const TIME_ZONE_DATA = (Intl as any).supportedValuesOf('timeZone').map((timeZone: any) => createTimeZoneData(timeZone));
   

export function randomTimeZone(): Place {
    const randomIndex = Math.floor(Math.random() * TIME_ZONE_DATA.length);
    return TIME_ZONE_DATA[randomIndex];
}