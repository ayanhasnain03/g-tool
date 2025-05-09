import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRemoveBg } from "@/features/ai/api/use-image-background";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ActiveTool, Editor } from "@/features/editor/types";
import { usePaywall } from "@/features/subscription/hooks/use-paywall";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const {shouldBlock,triggerPaywall} = usePaywall();

  const { mutate: removeBg, isPending: isRemovingBg } = useRemoveBg();
  const selectedObject = editor?.selectedObjects[0];
  //@ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onRemove = () => {
   if(shouldBlock){
    triggerPaywall();
    return;
   }
    removeBg(
      {
        image: imageSrc,
      },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background from image using AI"
      />
      {imageSrc ? (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                "relative aspect-square rounded-md overflow-hidden transition bg-muted"
                // isRemovingBg && "opacity-50"
              )}
            >
              <Image
                src={imageSrc}
                alt="Selected image"
                fill
                className="object-cover"
              />
            </div>

            <Button
              disabled={isRemovingBg}
              onClick={onRemove}
              className="w-full"
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />

          <p className="text-muted-foreground text-xs">
            Feature not available for this object.
          </p>
        </div>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
