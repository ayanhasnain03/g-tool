"use client";
import { Loader2, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Editor } from '@/features/editor/components/editor';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { useParams } from 'next/navigation';

const LoadingState = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <Loader2 className="size-6 animate-spin text-muted-foreground" />
  </div>
);

const ErrorState = () => (
  <div className="h-full flex flex-col gap-y-5 items-center justify-center">
    <TriangleAlert className="size-6 text-muted-foreground" />
    <p className="text-muted-foreground text-sm">Failed to fetch project.</p>
    <Button size="sm" variant="secondary" asChild>
      <Link href="/">Back to home</Link>
    </Button>
  </div>
);

const EditorProjectIdPage = () => {
  const { projectId } = useParams<{ projectId: string }>();  // Ensure proper typing
  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !data) return <LoadingState />;  // Better separation of concerns
  if (isError) return <ErrorState />;

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
