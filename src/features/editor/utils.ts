import { RGBColor } from "react-color";
import { v4 as uuid } from 'uuid';
export function transformText(objects: any): void {
  if (!objects) return;

  objects.forEach((item: any) => {
    if (item.objects) {
      transformText(item.objects);
    } else if (item.type === 'text' || item.type === 'textbox') {
      // Apply some transformation here, for example:
      item.text = item.text?.toUpperCase(); // Example transformation
    }
  });
}

// Downloads a file given a data URL and file type
export function downloadFile(file: string, type: string): void {
  const anchorElement = document.createElement('a');
  anchorElement.href = file;
  anchorElement.download = `${uuid()}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement); // Proper cleanup
}
export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}
export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return "rgba(0,0,0,0)";
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}
