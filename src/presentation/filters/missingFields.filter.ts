export default function missingFields(fields: { [key: string]: any }): string {
  const missingFields = Object.entries(fields)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return `${missingFields.join(', ')}`;
  }
  return '';
}
