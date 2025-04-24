import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  type ActiveTool,
  type Editor,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "@/features/editor/types";
import { cn } from "@/lib/utils";

import { ColorPicker } from "./color-picker";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface DrawSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const color = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool("select");
  };

  const onColorChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  const onWidthChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border z-40 w-[360px] h-full flex flex-col",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Drawing mode"
        description="Modify brush settings."
      />

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">Brush width</Label>

          <Slider
            value={[width]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>

        <div className="p-4 space-y-6">
          <ColorPicker value={color} onChange={onColorChange} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
