'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Modelitem } from './ModelItem';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import 'dotenv/config'

export default function AiInput({
	promptText,
	setPromptText,
}: {
	promptText: string;
	setPromptText: (value: string) => void;
}) {
	const [focused, setFocused] = useState(false);
	const [mode, setMode] = useState<'web' | 'app'>('web');
	const [loading, setLoading] = useState(false);
	const { getToken } = useAuth();
	const router = useRouter();

	const handleSubmit = async () => {
		if (!promptText.trim()) return;
		setLoading(true);

		const token = await getToken({ skipCache: true });
		console.log('SENDING SENDING SENDING');
		try {
			console.log(process.env.NEXT_PUBLIC_API_URL);
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
				{ description: promptText },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			router.push(`/projects/${data.id}`);
		} catch (err) {
			console.error("ERROR IN AI INPUT ",err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative w-full max-w-4xl mx-auto">
			{/* Ambient glow */}
			<div className="absolute -inset-[1px] rounded-[32px] bg-primary/20 blur-2xl opacity-0 pointer-events-none" />

			<div
				className={`
          relative rounded-[32px] p-5
          bg-white/[0.06]
          border backdrop-blur-2xl
          transition-all duration-300
          ${
						focused
							? 'border-white/20 bg-white/[0.08] shadow-[0_0_80px_rgba(179,193,255,0.06)]'
							: 'border-white/10'
					}
        `}
				style={{
					borderColor:
						mode === 'web'
							? 'rgba(167,139,250,0.5)'
							: 'rgba(248, 228, 193, 0.5)',
				}}
			>
				{/* Textarea */}
				<textarea
					value={promptText}
					onChange={(e) => setPromptText(e.target.value)}
					placeholder="Ask Aesthetify to design something extraordinary..."
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					rows={3}
					className="
            w-full resize-none
            bg-transparent
            text-lg
            text-slate-200
            placeholder:text-slate-500
            focus:outline-none
          "
				/>
				<div className="mt-6 flex items-center justify-between">
					{/* Left Action */}
					<Modelitem />

					<div className="flex items-center gap-3">
						{/* Binary Selector */}
						{/* Binary Selector */}
						<div className="relative flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
							{/* Sliding Track */}
							<div
								className={`
      absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)]
      rounded-full
      bg-white/10
      border border-white/10
      transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]
      ${mode === 'web' ? 'translate-x-0' : 'translate-x-full'}
    `}
							/>

							<button
								onClick={() => setMode('web')}
								className={`relative z-10 px-5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-colors duration-200 ${
									mode === 'web'
										? 'text-white'
										: 'text-slate-400 hover:text-slate-200'
								}`}
							>
								Web
							</button>

							<button
								onClick={() => setMode('app')}
								className={`relative z-10 px-5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-colors duration-200 ${
									mode === 'app'
										? 'text-white'
										: 'text-slate-400 hover:text-slate-200'
								}`}
							>
								App
							</button>
						</div>

						{/* Send Button */}
						<Button
							className="px-2 rounded-full bg-primary font-medium text-indigo-800 hover:bg-primary/90 flex items-center gap-2 text-sm font-medium"
							onClick={handleSubmit}
							disabled={loading || !promptText.trim()}
						>
							<Send className="h-3 w-3 mt-0.5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
