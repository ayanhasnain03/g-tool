"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, CopyIcon, FileIcon, MoreHorizontalIcon, Search, Trash } from "lucide-react";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";

export const ProjectSection = () => {
 const duplicateMutation = useDuplicateProject();
  const router = useRouter();
const onCopy = (id:string) =>{
 duplicateMutation.mutate({id})
}
  const { data, status,hasNextPage,fetchNextPage,isFetchingNextPage } = useGetProjects();

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <AlertTriangle className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Failed to load projects.</p>
        </div>
      </div>
    );
  }

  const projects = data?.pages.flatMap((page) => page.data) ?? [];

  if (!projects.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Projects</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <Search className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No projects found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Recent Projects</h3>
      <Table>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell
                onClick={() => router.push(`/editor/${project.id}`)}
                className="font-medium flex items-center gap-x-2 cursor-pointer"
              >
                <FileIcon className="size-6" />
                {project.name}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/editor/${project.id}`)}
                className="hidden md:table-cell cursor-pointer"
              >
                {project.width} x {project.height}
              </TableCell>
              <TableCell
                onClick={() => router.push(`/editor/${project.id}`)}
                className="hidden md:table-cell cursor-pointer"
              >
               {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}

              </TableCell>
              <TableCell className="flex items-center justify-end">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <DropdownMenuItem disabled={duplicateMutation.isPending} onClick={()=>onCopy(project.id)} className="h-10 cursor-pointer">
                      <CopyIcon className="size-4 mr-2" />
                     Make a copy
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={false} onClick={()=>{}} className="h-10 cursor-pointer">
                      <Trash className="size-4 mr-2" />
                    Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
       <div className="w-full flex items-center justify-center pt-4">
<Button variant={"ghost"} onClick={()=>fetchNextPage()} disabled={isFetchingNextPage}>

</Button>
       </div>
      )}
    </div>
  );
};
