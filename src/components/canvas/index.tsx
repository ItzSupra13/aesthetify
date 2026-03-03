'use client';

import React, { useState } from 'react';
import { loadingStatusType, useCanvas } from './canvas-context';
import { Spinner } from '../ui/spinner';
import { cn } from '@/lib/utils';
import CanvasFloatingToolbar from './canvas-floating-toolbar';
import { TOOL_MODE_ENUM, ToolModeType } from '@/lib/constants';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import CanvasControls from './canvas-controls';
import { ThemeProvider } from '../web/theme-provider';
import DeviceFrame from './device-frame';
import { index } from 'drizzle-orm/gel-core';
import DeviceFrameSkeleton from './device-skeleton';
import HtmlDialog from './html-dialog';

const Canvas = ({
	projectId,
	projectName,
	isPending,
}: {
	projectId: string;
	isPending: boolean;
	projectName: string | null;
}) => {
	const { loadingStatus, theme, frames, selectedFrame } = useCanvas();

	const currentStatus = isPending
		? 'fetching'
		: loadingStatus !== 'idle' && loadingStatus !== 'completed'
			? loadingStatus
			: null;

	const [toolMode, setToolMode] = useState<ToolModeType>(TOOL_MODE_ENUM.SELECT);

	const [zoomPercent, setZoomPercent] = useState<number>(53);
	const [currentScale, setCurrentScale] = useState<number>(0.53);
	const [openHtmlDialog, setOpenHtmlDialog] = useState(false);
	const DEMO_HTML = `
<div class="min-h-screen bg-background text-foreground selection:bg-primary/30">

  <!-- NAVBAR -->
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-xl font-semibold tracking-tight">
        Axiom<span class="text-primary">ML</span>
      </div>
      <nav class="hidden md:flex gap-8 text-sm text-muted-foreground">
        <a class="hover:text-primary transition-colors" href="#">Features</a>
        <a class="hover:text-primary transition-colors" href="#">Leaderboard</a>
        <a class="hover:text-primary transition-colors" href="#">Docs</a>
      </nav>
      <button class="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition">
        Get Started
      </button>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative overflow-hidden">
    
    <!-- Background Blue Glow -->
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 blur-[140px] rounded-full"></div>
    
    <div class="relative max-w-6xl mx-auto px-6 pt-28 pb-32 text-center">
      <h1 class="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
        Train Your ML Intuition.
        <br />
        <span class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          One Challenge at a Time.
        </span>
      </h1>

      <p class="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        A competitive platform designed to sharpen your machine learning thinking,
        system design skills, and model reasoning — built for modern ML engineers.
      </p>

      <div class="mt-10 flex justify-center gap-4">
        <button class="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition">
          Start Solving
        </button>
        <button class="px-6 py-3 rounded-xl border border-primary/40 bg-card hover:bg-primary/10 transition">
          View Problems
        </button>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="max-w-6xl mx-auto px-6 pb-24">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition shadow-sm">
        <div class="text-3xl font-bold text-primary">1200+</div>
        <div class="mt-2 text-muted-foreground text-sm">
          ML Problems Covering CV, NLP & Systems
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition shadow-sm">
        <div class="text-3xl font-bold text-primary">98%</div>
        <div class="mt-2 text-muted-foreground text-sm">
          Interview Readiness Score Boost
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition shadow-sm">
        <div class="text-3xl font-bold text-primary">Global</div>
        <div class="mt-2 text-muted-foreground text-sm">
          Ranked Leaderboard for ML Engineers
        </div>
      </div>

    </div>
  </section>

  <!-- FEATURES -->
  <section class="bg-muted/30 py-24 border-y border-border relative">
    
    <!-- Blue Divider Accent -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-full"></div>

    <div class="max-w-6xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl font-semibold tracking-tight">
          Built for <span class="text-primary">Real ML Thinking</span>
        </h2>
        <p class="mt-4 text-muted-foreground max-w-xl mx-auto">
          Beyond syntax. We test intuition, model reasoning,
          and large-scale ML architecture decisions.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/20 transition">
          <div class="text-primary text-lg font-semibold">
            Model Design Challenges
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            Architect transformers, optimize CNN pipelines,
            and debug training instability scenarios.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/20 transition">
          <div class="text-primary text-lg font-semibold">
            System Scaling
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            Design inference systems handling millions of requests
            with distributed GPU orchestration.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/20 transition">
          <div class="text-primary text-lg font-semibold">
            Competitive Leaderboards
          </div>
          <p class="mt-3 text-sm text-muted-foreground">
            Compete globally and benchmark your ML problem-solving
            ability against top engineers.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <div class="relative p-12 rounded-3xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 shadow-lg shadow-primary/20">
        
        <div class="absolute inset-0 bg-primary/5 blur-3xl rounded-3xl"></div>
        
        <div class="relative">
          <h3 class="text-3xl font-semibold">
            Ready to become <span class="text-primary">interview-proof?</span>
          </h3>
          <p class="mt-4 text-muted-foreground">
            Join thousands of engineers preparing for top-tier ML roles.
          </p>
          <button class="mt-8 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition">
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="border-t border-border py-10 text-center text-sm text-muted-foreground">
    <span class="text-primary font-medium">© 2026 AxiomML.</span> Built for the next generation of ML engineers.
  </footer>

</div>
`;
    const onOpenHtmlDialog = () => {
        setOpenHtmlDialog(true);
    }
	return (
		<>
			<div className="relative w-full h-full overflow-hidden">
				<CanvasFloatingToolbar />

				{currentStatus && <CanvasLoader status={currentStatus} />}

				<TransformWrapper
					initialScale={0.53}
					initialPositionX={40}
					initialPositionY={5}
					minScale={0.1}
					maxScale={3}
					wheel={{ step: 0.1 }}
					pinch={{ step: 0.1 }}
					doubleClick={{ disabled: true }}
					centerZoomedOut={false}
					centerOnInit={false}
					smooth
					limitToBounds={false}
					panning={{
						disabled: toolMode !== TOOL_MODE_ENUM.HAND,
					}}
					onTransformed={(ref) => {
						const scale = ref.state.scale;
						setZoomPercent(Math.round(scale * 100));
						setCurrentScale(scale);
					}}
				>
					{({ zoomIn, zoomOut }) => (
						<>
							<div
								className="absolute inset-0"
								style={{
									backgroundColor: '#030912',
									backgroundImage:
										'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
									backgroundSize: '25px 25px',
								}}
							>
								<TransformComponent
									wrapperStyle={{
										width: '100%',
										height: '100%',
										overflow: 'unset',
									}}
									contentStyle={{
										width: '100%',
										height: '100%',
									}}
								>
									<div>
										{frames.length === 0 && (
											<DeviceFrame
                                                key="demo"
                                                frameId="demo-frame"
                                                title="Demo"
                                                initialPosition={{ x: 100, y: 100 }}
                                                toolMode={toolMode}
                                                themeStyle={theme?.style}
                                                html={DEMO_HTML}
                                                scale={currentScale}
                                                onOpenHtmlDialog={onOpenHtmlDialog}
											/>
										)}

										{frames.map((frame, index: number) => {
											const baseX = 100 + index * 480;
											const y = 100;
											if (frame.isLoading) {
												return (
													<DeviceFrameSkeleton
														key={index}
														style={{
															transform: `translae(${baseX}px 100px)`,
														}}
													/>
												);
											}
											return (
												<DeviceFrame
													key={1}
													frameId={'something'}
													title={'some Thing'}
													initialPosition={{
														x: baseX,
														y,
													}}
													toolMode={toolMode}
													themeStyle={theme?.style}
													html={DEMO_HTML}
                                                    scale={currentScale}
                                                    onOpenHtmlDialog={onOpenHtmlDialog}
												/>
											);
										})}
									</div>
								</TransformComponent>
							</div>

							<CanvasControls
								zoomIn={zoomIn}
								zoomOut={zoomOut}
								zoomPercent={zoomPercent}
								toolMode={toolMode}
								setToolMode={setToolMode}
							/>
						</>
					)}
				</TransformWrapper>
			</div>
            <HtmlDialog
                html={selectedFrame?.htmlContent || ""}
                themeStyle={theme?.style || ""}
                open={openHtmlDialog}
                onOpenChange={setOpenHtmlDialog}
            />
		</>
	);
};

export function CanvasLoader({
	status,
}: {
	status?: loadingStatusType | 'fetching';
}) {
	return (
		<div
			className={cn(
				'absolute top-4 left-1/2 -translate-x-1/2 max-w-full px-4 pt-1.5 pb-2 min-w-40 rounded-br-xl rounded-bl-xl shadow-md flex items-center space-x-2 z-10',
				{
					'bg-gray-500 text-white': status === 'fetching',
					'bg-amber-500 text-white': status === 'running',
					'bg-blue-500 text-white': status === 'analyzing',
					'bg-purple-500 text-white': status === 'generating',
				},
			)}
		>
			<Spinner className="w-4 h-4" />
			<span className="text-sm font-semibold capitalize">
				{status === 'fetching' ? 'Loading Project' : status}
			</span>
		</div>
	);
}

export default Canvas;
