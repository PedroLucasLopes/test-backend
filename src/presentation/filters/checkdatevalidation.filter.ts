export default function checkDateValidation(startDate: Date) {
  const signUpDate = Date.now();
  const validDate = signUpDate > startDate.getTime();
  return validDate;
}
