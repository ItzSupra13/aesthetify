'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';
import { getProjects } from '@/lib/api/projects';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProjectsPage() {
	const { getToken } = useAuth();

	const {
		data: projects,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: async () => {
			const token = await getToken();
			if (!token) throw new Error('No token');
			return getProjects(token);
		},
	});

	return (
		<section className="relative min-h-screen bg-[#030712] text-slate-100 pt-36 pb-24 px-6 overflow-hidden">
			{/* Background Glow */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,27,75,0.8)_0%,rgba(3,7,18,1)_100%)]" />
			<div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[100px] opacity-30" />

			<div className="relative z-10 max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex items-center justify-between mb-14">
					<div>
						<h1 className="text-4xl md:text-5xl font-thin tracking-tight">
							Your{' '}
							<span className="font-black italic text-indigo-300">
								Projects
							</span>
						</h1>
						<p className="text-slate-400 mt-3 font-light">
							Your latest AI-generated design explorations.
						</p>
					</div>

					<Button className="rounded-full px-6 bg-primary text-indigo-950 hover:bg-primary/90 flex items-center gap-2">
						<Plus size={16} />
						New Project
					</Button>
				</div>

				{/* Loading State */}
				{isLoading && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="h-40 rounded-2xl bg-white/5 animate-pulse border border-white/10"
							/>
						))}
					</div>
				)}

				{/* Error */}
				{error && (
					<div className="text-red-400 text-sm">
						Something went wrong loading your projects.
					</div>
				)}

				{/* Empty State */}
				{!isLoading && projects?.length === 0 && (
					<div className="flex flex-col items-center justify-center py-32 text-center">
						<div className="text-6xl mb-6 opacity-40">✨</div>
						<h3 className="text-2xl font-light mb-3">No projects yet</h3>
						<p className="text-slate-400 max-w-md mb-8">
							Start by generating your first design concept.
						</p>
						<Button className="rounded-full px-8 bg-primary text-indigo-950 hover:bg-primary/90">
							Create Your First Project
						</Button>
					</div>
				)}

				{/* Projects Grid */}
				{!isLoading && projects?.length > 0 && (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project: any) => (
							<Link href={`/projects/${project.id}`}>
								<div
									key={project.id}
									className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:-translate-y-1"
								>
									<div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-white/10" />

									<h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
										{project.title}
									</h3>

									<p className="text-xs text-slate-500">
										{new Date(project.createdAt).toLocaleDateString()}
									</p>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
