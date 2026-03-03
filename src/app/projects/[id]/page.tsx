'use client';

import { useParams } from 'next/navigation';
import { useGetProject } from '@/hooks/useProject';
import { ProjectHeader } from '@/components/projects/ProjectHeader';
import { CanvasProvider } from '@/components/canvas/canvas-context';
import { useContext } from 'react';
import Canvas from '@/components/canvas';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const { data: project, isLoading, error } = useGetProject(projectId);

  const frames = project?.frames || [];
  const theme = project?.theme || "";
  const hasInitialData = frames.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#030712] text-red-400 flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] w-full flex flex-col text-slate-100">
      <ProjectHeader title={project.title} />

      <CanvasProvider
        initialFrames={frames}
        initialThemeId={theme}
        hasInitialData={hasInitialData}
        projectId={project.id}
      >
      <main className="flex flex-1 overflow-hidden">
          <div className="relative flex-1">
            <Canvas
              projectId={project.id}
              projectName={project.title}
              isPending={isLoading}
            />
        </div>
      </main>
      </CanvasProvider>
    </div>
  );
}