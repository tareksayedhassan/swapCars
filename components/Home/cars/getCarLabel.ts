import { getBrandName } from "./getBrandName";

export function getCarLabel(car: any): string {
  return `${getBrandName(car)} ${car?.model}`;
}
