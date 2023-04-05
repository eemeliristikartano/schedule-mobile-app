export const countHours = (timeInSeconds: number): number => Math.floor(timeInSeconds / 3_600);

export const countMinutes = (timeInSeconds: number): number => Math.floor((timeInSeconds % 3_600) / 60);

