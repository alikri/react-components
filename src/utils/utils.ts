export function capitalize(s: string): string {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isConvertibleToInt(s: string): boolean {
  const parsed = parseInt(s, 10);
  return !isNaN(parsed) && parsed.toString() === s;
}
