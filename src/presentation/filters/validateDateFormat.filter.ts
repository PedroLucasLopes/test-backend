export default function validateDateFormat(date: string[]): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateFormatValidation = date.some((e) => {
    regex.test(e);
  });
  return dateFormatValidation;
}
