// Timezones are from https://www.iana.org/time-zones
// NOTE: Needed to add (Intl as any) & timeZone: any to work with typescript even though this runs in JS.
function createTimeZoneData(timeZone) {
    const timeZoneName = new Intl.DateTimeFormat('en-GB', { timeZone: timeZone, timeZoneName: 'long' }).formatToParts().find(part => part.type === 'timeZoneName').value;
    const offset = new Intl.DateTimeFormat('en-GB', { timeZone: timeZone, timeZoneName: 'shortOffset' }).formatToParts().find(part => part.type === 'timeZoneName').value;
    let name = timeZone.split('/')[1].replaceAll('_', ' ');
    return { name, timeZone, timeZoneName, offset };
}
export const PLACE_DATA = Intl.supportedValuesOf('timeZone').map((timeZone) => createTimeZoneData(timeZone));
export const LONDON = PLACE_DATA.find(p => p.name === "London");
export function randomPlace() {
    const randomIndex = Math.floor(Math.random() * PLACE_DATA.length);
    return PLACE_DATA[randomIndex];
}
export function getUniquePlaces(n) {
    let uniqueTimes = new Set();
    let uniquePlaces = [];
    while (uniqueTimes.size < n) {
        let random = randomPlace();
        if (!uniqueTimes.has(random.timeZoneName)) {
            uniqueTimes.add(random.timeZoneName);
            uniquePlaces.push(random);
        }
    }
    return uniquePlaces;
}
