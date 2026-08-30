export default function convertDateStringToLocaleDateString(
  dateString: string,
): string {
  if (!dateString) return "Ei määritetty ajankohtaa";
  return new Date(dateString).toLocaleDateString("fi-FI");
}
