import { countHours, countMinutes } from "./TimeCalculations";

export function formatTime(time: number): string {
    const hours = countHours(time).toString().padStart(2, '0');
    const minutes = countMinutes(time).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}