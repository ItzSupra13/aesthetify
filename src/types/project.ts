export interface Frame {
  id: string;
  projectId: string;
  title: string;
  htmlContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  theme: string | null;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
  frames: Frame[];
}