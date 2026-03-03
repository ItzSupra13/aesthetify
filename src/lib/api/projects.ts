import axios from 'axios';
import { Project } from '@/types/project';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProject = async (
  token: string,
  projectId: string
): Promise<Project> => {
  const { data } = await axios.get<Project>(
    `${API_URL}/api/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


export const getProjects = async (token: string) => {
  const { data } = await axios.get(
    `${API_URL}/api/projects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const createProject = async ({
  token,
  description,
}: {
  token: string;
  description: string;
}) => {
  const { data } = await axios.post(
    `${API_URL}/api/projects`,
    { description },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};