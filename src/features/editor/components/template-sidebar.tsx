import { AlertTriangle, Loader2 } from 'lucide-react';
import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { type ActiveTool, type Editor } from '@/features/editor/types';
import { type ResponseType, useGetTemplates } from '@/features/projects/api/use-get-templates';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';

import { ToolSidebarClose } from './tool-sidebar-close';
import { ToolSidebarHeader } from './tool-sidebar-header';

interface TemplateSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({ editor, activeTool, onChangeActiveTool }: TemplateSidebarProps) => {
  const [ConfirmDialog, confirm] = useConfirm('Are you sure?', 'You are about to replace the current project with this template.');

  const { data, isLoading, isError } = useGetTemplates({ page: '1', limit: '20' });

  const onClose = () => onChangeActiveTool('select');

  const onClick = async (template: ResponseType) => {
    // TODO: check if template is pro
    const ok = await confirm();

    if (!ok) return;

    editor?.loadJson(template.json);
  };

  return (
    <aside
      className={cn('bg-white relative border z-40 w-[360px] h-full flex flex-col', activeTool === 'templates' ? 'visible' : 'hidden')}
    >
      <ConfirmDialog />

      <ToolSidebarHeader title="Templates" description="Choose from a variety of templates to get started." />

      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}

      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Failed to fetch templates.</p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((template) => {
                return (
                  <button
                    key={template.id}
                    onClick={() => onClick(template)}
                    style={{
                      aspectRatio: `${template.width} / ${template.height}`,
                    }}
                    className="relative w-full group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                  >
                    <Image fill src={template.thumbnailUrl || ''} alt={template.name} className="object-cover" />

                    <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left">
                      {template.name}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
