'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { getProject } from '@/lib/api/projects';
import { Project } from '@/types/project';

export const useGetProject = (projectId: string) => {
  const { getToken } = useAuth();

  return useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('No token');

      return getProject(token, projectId);
    },
    enabled: !!projectId,
  });
};