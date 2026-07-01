export function getBrandName(car: any): string {
  return car?.brand?.name ?? "Unknown";
}
