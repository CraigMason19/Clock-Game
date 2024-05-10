export interface TimeZone {
    placeName: string;
    code: string;
}

export const TIME_ZONES: TimeZone[] = [
    { placeName:"New York", code:"America/New_York" },
    { placeName:"Paris", code:"Europe/Paris" },
];

export function randomTimeZone(): TimeZone {
    const randomIndex = Math.floor(Math.random() * Object.keys(TIME_ZONES).length);
    return TIME_ZONES[randomIndex];
}