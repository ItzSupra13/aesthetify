'use client';

import {
  FrameType,
  THEME_LIST,
  ThemeType,
} from "@/lib/constants";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type loadingStatusType =
  | "idle"
  | "running"
  | "analyzing"
  | "generating"
  | "completed";

interface CanvasContextType {
  theme?: ThemeType;
  setTheme: (id: string) => void;
  themes: ThemeType[];

  frames: FrameType[];
  setFrames: React.Dispatch<React.SetStateAction<FrameType[]>>;

  updateFrame: (id: string, data: Partial<FrameType>) => void;
  addFrame: (frame: FrameType) => void;

  selectedFrameId: string | null;
  selectedFrame: FrameType | null;
  setSelectedFrameId: (id: string | null) => void;

  loadingStatus: loadingStatusType;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({
  children,
  initialFrames,
  initialThemeId,
  hasInitialData,
  projectId,
}: {
  children: ReactNode;
  initialFrames: FrameType[];
  initialThemeId?: string;
  hasInitialData: boolean;
  projectId: string | null;
}) => {
  const [themeId, setThemeId] = useState<string>(
    initialThemeId || THEME_LIST[0].id
  );

  const [frames, setFrames] = useState<FrameType[]>(initialFrames);

  const [loadingStatus, setLoadingStatus] =
    useState<loadingStatusType>("running");

  const [selectedFrameId, setSelectedFrameId] =
    useState<string | null>(null);

  const theme = THEME_LIST.find((t) => t.id === themeId);

  const selectedFrame =
    selectedFrameId && frames.length !== 0
      ? frames.find((f) => f.id === selectedFrameId) || null
      : null;

  useEffect(() => {
    if (hasInitialData) {
      setLoadingStatus("idle");
    }
  }, [hasInitialData]);

  useEffect(() => {
    if (initialThemeId) {
      setThemeId(initialThemeId);
    }
  }, [initialThemeId]);

  const addFrame = useCallback((frame: FrameType) => {
    setFrames((prev) => [...prev, frame]);
  }, []);

  const updateFrame = useCallback(
    (id: string, data: Partial<FrameType>) => {
      setFrames((prev) =>
        prev.map((frame) =>
          frame.id === id ? { ...frame, ...data } : frame
        )
      );
    },
    []
  );

  return (
    <CanvasContext.Provider
      value={{
        theme,
        setTheme: setThemeId,
        themes: THEME_LIST,

        frames,
        setFrames,

        selectedFrameId,
        selectedFrame,
        setSelectedFrameId,

        updateFrame,
        addFrame,

        loadingStatus,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx)
    throw new Error("useCanvas must be used inside CanvasProvider");

  return ctx;
};