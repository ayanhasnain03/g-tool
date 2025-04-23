import type { filters } from "@/features/editor/types";
import { clsx, type ClassValue } from "clsx";
import { fabric } from "fabric";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFilter(
  value: (typeof filters)[number]
): fabric.IBaseFilter | null {
  let effect: fabric.IBaseFilter | null = null;

  switch (value) {
    case "polaroid":
      effect = new (fabric.Image.filters as any).Polaroid();
      break;
    case "sepia":
      effect = new fabric.Image.filters.Sepia();
      break;
    case "kodachrome":
      effect = new (fabric.Image.filters as any).Kodachrome();
      break;
    case "contrast":
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case "greyscale":
      effect = new fabric.Image.filters.Grayscale();
      break;
    case "brownie":
      effect = new (fabric.Image.filters as any).Brownie();
      break;
    case "vintage":
      effect = new (fabric.Image.filters as any).Vintage();
      break;
    case "technicolor":
      effect = new (fabric.Image.filters as any).Technicolor();
      break;
    case "pixelate":
      effect = new fabric.Image.filters.Pixelate();
      break;
    case "invert":
      effect = new fabric.Image.filters.Invert();
      break;
    case "blur":
      effect = new fabric.Image.filters.Blur({ blur: 0.6 });
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removecolor":
      effect = new (fabric.Image.filters as any).RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      effect = new (fabric.Image.filters as any).BlackWhite({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "vibrance":
      effect = new (fabric.Image.filters as any).Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      effect = new fabric.Image.filters.BlendColor({
        color: "#00ff00",
        mode: "multiply",
      });
      break;
    case "huerotate":
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new fabric.Image.filters.Resize();
      break;
    case "saturation":
      effect = new fabric.Image.filters.Saturation({
        saturation: 0.7,
      });
      break;
    case "gamma":
      effect = new (fabric.Image.filters as any).Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
  }

  return effect;
}
