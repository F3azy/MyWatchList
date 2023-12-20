export function minutesToHours(minutes: number): string {
  const hours =
    Math.floor(minutes / 60) +
    "h " +
    (minutes % 60 === 0 ? "" : (minutes % 60) + "min");

  return hours;
}

export function getYear(date: string): string {
  return new Date(date).getFullYear().toString();
}

export function isFutureDate(date: string) {
  return new Date(date) > new Date();
}

export function getNameAndLastName(displayName: string | null | undefined): string[] {
  if (displayName) return displayName.split(' ') 
  else return ["", ""];
}