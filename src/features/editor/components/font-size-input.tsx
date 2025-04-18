import { Minus, Plus } from "lucide-react";
import React, { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FontSizeInputProps {
  /**
   * Current font size value
   */
  value: number;
  /**
   * Callback when the value changes
   */
  onChange: (value: number) => void;
  /**
   * Minimum allowed value (inclusive)
   * @default 0
   */
  min?: number;
  /**
   * Maximum allowed value (inclusive)
   * @default Number.POSITIVE_INFINITY
   */
  max?: number;
  /**
   * Step size for increment/decrement
   * @default 1
   */
  step?: number;
}

/**
 * A numeric input with increment and decrement buttons for font size.
 */
export const FontSizeInput: React.FC<FontSizeInputProps> = ({
  value,
  onChange,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
}) => {
  const decrement = useCallback(() => {
    const next = Math.max(min, value - step);
    onChange(next);
  }, [value, min, step, onChange]);

  const increment = useCallback(() => {
    const next = Math.min(max, value + step);
    onChange(next);
  }, [value, max, step, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(e.target.value, 10);
      if (!isNaN(parsed)) {
        const bounded = Math.min(max, Math.max(min, parsed));
        onChange(bounded);
      }
    },
    [min, max, onChange]
  );

  return (
    <div className="inline-flex items-center">
      <Button
        onClick={decrement}
        variant="outline"
        size="icon"
        className="p-2 rounded-r-none border-r-0"
        aria-label="Decrease font size"
      >
        <Minus size={16} />
      </Button>
      <Input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        min={min}
        max={max === Number.POSITIVE_INFINITY ? undefined : max}
        step={step}
        className="w-16 h-8 text-center focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
        aria-label="Font size"
      />
      <Button
        onClick={increment}
        variant="outline"
        size="icon"
        className="p-2 rounded-l-none border-l-0"
        aria-label="Increase font size"
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};
