export default function formatNumberWithThousandDots(value: string): string {
  const numericOnly = value.replace(/\D/g, "");
  if (!numericOnly) return "";
  return numericOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
