import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type ActiveTool, type Editor, filters } from "@/features/editor/types";
import { cn } from "@/lib/utils";

import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => onChangeActiveTool("select");

  return (
    <aside
      className={cn(
        "bg-white relative border z-40 w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Apply a filter to selected image."
      />

      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="lg"
              className="w-full h-14 justify-start text-left"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
