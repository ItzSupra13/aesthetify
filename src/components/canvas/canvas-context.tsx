'use client';

import { FrameType, THEME_LIST, ThemeType } from '@/lib/constants';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { useInngestSubscription } from '@inngest/realtime/hooks';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

export type loadingStatusType =
	| 'idle'
	| 'running'
	| 'analyzing'
	| 'generating'
	| 'completed';

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
	const { getToken } = useAuth();
	async function fetchRealtimeSubscriptionToken() {
		const token = await getToken();
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/api/realtime/token`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return data;
	}

	const [themeId, setThemeId] = useState<string>(
		initialThemeId || THEME_LIST[0].id,
	);
	const [frames, setFrames] = useState<FrameType[]>(initialFrames);

	const [loadingStatus, setLoadingStatus] =
		useState<loadingStatusType>('running');

	const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);

	const { freshData } = useInngestSubscription({
		refreshToken: fetchRealtimeSubscriptionToken,
	});
	useEffect(() => {
		console.log('freshData:', freshData);
	}, [freshData]);
	const theme = THEME_LIST.find((t) => t.id === themeId);

	const selectedFrame =
		selectedFrameId && frames.length !== 0
			? frames.find((f) => f.id === selectedFrameId) || null
			: null;

	useEffect(() => {
		if (!freshData?.length) return;
		freshData.forEach((message) => {
      const { data, topic } = message;
      console.log("Realtime message:", message);
			if (data.projectId != projectId) return;
			switch (topic) {
				case 'generation.start':
					setLoadingStatus('running');
					break;
				case 'analysis.start':
					setLoadingStatus('analyzing');
					break;
				case 'analysis.complete':
					if (data.theme) setThemeId(data.theme);

					if (data.screens?.length > 0) {
						const skeletonFrames: FrameType[] = data.screens.map((s: any) => ({
							id: s.id,
							screenId: s.id,
							title: s.name,
							htmlContent: '',
							isLoading: true,
						}));
						setFrames(skeletonFrames);
					}

					break;
				case 'frame.created':
					if (data.frame) {
						setFrames((prev) => {
							const newFrames = [...prev];
							const idx = newFrames.findIndex((f) => f.id === data.screenId);
							if (idx !== -1) {
								newFrames[idx] = {
									...data.frame,
									screenId: data.screenId,
								};
							} else {
								newFrames.push(data.frame);
							}
							return newFrames;
						});
					}
					break;
				case 'generation.complete':
					setLoadingStatus('completed');
					setTimeout(() => {
						setLoadingStatus('idle');
					}, 1000);
					break;
				default:
					break;
			}
		});
	}, [projectId, freshData]);
	useEffect(() => {
		if (hasInitialData) {
			setLoadingStatus('idle');
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

	useEffect(() => {
		if (initialFrames) {
			setFrames(initialFrames);
		}
	}, [initialFrames]);

	const updateFrame = useCallback((id: string, data: Partial<FrameType>) => {
		setFrames((prev) =>
			prev.map((frame) => (frame.id === id ? { ...frame, ...data } : frame)),
		);
	}, []);

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
	if (!ctx) throw new Error('useCanvas must be used inside CanvasProvider');

	return ctx;
};
