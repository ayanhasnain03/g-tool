// Add "use client" at the top to indicate client-side rendering
"use client";

import { useEditor } from "@/features/editor/hooks/use-editor";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

export const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {});

      init({
        initialCanvas: canvas,
        initialContainer: containerRef.current!,
      });
    }
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
