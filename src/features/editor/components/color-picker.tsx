"use client";

import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";
import dynamic from "next/dynamic";

const ChromePicker = dynamic(
  () => import("react-color/lib/components/chrome/Chrome"),
  {
    ssr: false,
  }
);
const CirclePicker = dynamic(
  () => import("react-color/lib/components/circle/Circle"),
  {
    ssr: false,
  }
);

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
