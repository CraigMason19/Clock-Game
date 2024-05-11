export const TIME_ZONES = [
    { placeName: "New York", code: "America/New_York" },
    { placeName: "Paris", code: "Europe/Paris" },
];
export function randomTimeZone() {
    const randomIndex = Math.floor(Math.random() * Object.keys(TIME_ZONES).length);
    return TIME_ZONES[randomIndex];
}
