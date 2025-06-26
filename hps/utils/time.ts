export function toUtcFromSeoul(isoString: string) {
  const seoulDate = new Date(isoString);
  const utcTimestamp = seoulDate.getTime() + 9 * 60 * 60 * 1000;

  return new Date(utcTimestamp);
}
