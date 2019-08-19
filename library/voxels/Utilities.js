import { Math as Math3 } from "three";

export function toThreeColour(r, g = null, b = null) {
  if (Array.isArray(r)) {
    [r, g, b] = r;
  }

  return [
    Math3.mapLinear(r, 0, 255, 0, 1),
    Math3.mapLinear(g, 0, 255, 0, 1),
    Math3.mapLinear(b, 0, 255, 0, 1)
  ];
}
