import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "relative w-full flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors",
        "hover:bg-muted hover:text-primary",
        isActive
          ? "bg-muted text-primary font-medium before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-1 before:bg-primary"
          : "text-muted-foreground"
      )}
    >
      <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 stroke-2" />
      <span className="text-[10px] sm:text-xs md:text-sm">{label}</span>
    </Button>
  );
};
