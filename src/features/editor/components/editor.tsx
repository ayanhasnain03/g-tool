"use client";

import { Footer } from "@/features/editor/components/Footer";
import { Navbar } from "@/features/editor/components/navbar";

import { FillColorSidebar } from "@/features/editor/components/fill-color-sidebar";
import { ShapeSidebar } from "@/features/editor/components/shape-sideBar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { StrokeColorSidebar } from "@/features/editor/components/stroke-color-sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool, selectionDependentTools } from "@/features/editor/types";
import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontSidebar } from "./font-sidebar";

import { AiSidebar } from "./ai-sidebar";
import { FilterSidebar } from "./filter-sidebar";
import { ImageSidebar } from "./image-sidebar";
import { OpacitySidebar } from "./opacity-sidebar";
import { RemoveBgSidebar } from "./remove-bg-sidebar";
import { StrokeWidthSidebar } from "./stroke-width-sidebar";
import { TextSidebar } from "./text-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        // TODO: Enable draw mode
      }

      if (activeTool === "draw") {
        // TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool]
  );
  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);
  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={setActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            //hacky way when selctye then rerender
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
