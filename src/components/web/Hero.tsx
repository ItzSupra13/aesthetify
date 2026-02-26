'use client';

import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import { suggestions } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import AiInput from './AiInput';
import { PreviewMock } from './PreviewMock';
import { PricingSection } from './PricingSection';
import { Footer } from './Footer';
import { BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Hero() {
	const [promptText, setPromptText] = useState<string>('');

	const handleSuggestionClick = (suggestion: string) => {
		setPromptText(suggestion);
	};

	return (
		<>
			<section className="relative w-full overflow-hidden bg-[#030712] text-slate-100 pt-28 pb-20 md:pt-36 md:pb-32">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,27,75,0.8)_0%,rgba(3,7,18,1)_100%)]" />
				<div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-900/30 rounded-full blur-[80px] opacity-40" />
				<div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-blue-900/20 rounded-full blur-[80px] opacity-40" />

				<div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-6 text-center">
					{/* Beta Pill */}
					<Badge
						variant="secondary"
						className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-3"
					>
						<BadgeCheck className="h-3.5 w-3.5" />
						Now in Beta
					</Badge>

					{/* Heading */}
					<h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-6 md:mb-8 leading-[1.05]">
						Design at the speed <br />
						<span className="font-black italic text-transparent bg-clip-text bg-gradient-to-b from-blue-200 via-primary to-indigo-900">
							of thought.
						</span>
					</h1>

					<p className="text-base sm:text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
						Transform your ideas into stunning production-ready UI/UX designs
						instantly.
					</p>

					{/* Input */}
					<div className="mb-6 md:mb-8">
						<AiInput promptText={promptText} setPromptText={setPromptText} />
					</div>

					{/* Suggestion Pills */}
					<div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 md:mb-24 px-2">
						<Suggestions>
							{suggestions.map((suggestion) => (
								<Suggestion
									key={suggestion}
									onClick={handleSuggestionClick}
									suggestion={suggestion}
								/>
							))}
						</Suggestions>
					</div>

					{/* Preview */}
					<PreviewMock />

					{/* Trusted */}
					<div className="mt-20 md:mt-32 pb-16 md:pb-24">
						<p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600 mb-12">
							Trusted by the creators of tomorrow
						</p>

						<div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-20 opacity-30">
							{['STRIKE', 'FORGE', 'NEOUI', 'GLYPH', 'ZENITH'].map((brand) => (
								<div
									key={brand}
									className="text-sm font-black tracking-[0.3em]"
								>
									{brand}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Bottom Fade */}
				<div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#030712] to-transparent" />
			</section>

			<PricingSection />

			<section className="relative bg-astral-deep py-32 border-t border-white/5 overflow-hidden">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<h2 className="text-4xl font-thin tracking-tight text-white mb-6">
						Have a custom request?
					</h2>

					<p className="text-slate-400 font-light mb-12 max-w-xl mx-auto">
						Our team is ready to help you scale your design operations with
						custom AI training and enterprise solutions.
					</p>

					<Button className="px-12 py-6 rounded-full border border-primary/40 text-primary bg-transparent hover:bg-primary/10 transition-all text-sm font-semibold tracking-widest uppercase">
						Contact Our Team
					</Button>
				</div>
			</section>

			<Footer />
		</>
	);
}
