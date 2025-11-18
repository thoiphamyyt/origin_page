export function formatMonthlyAmount(number) {
  if (isNaN(number)) return "0";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: number % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(number);
}
export function formatDate(date) {
  if (!date) return "";
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
