'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/nextjs';

const NAV_ITEMS = [
	{ label: 'Dashboard', href: '/projects' },
	{ label: 'Why Aesthetify', href: '#' },
	{ label: 'Stories', href: '#' },
	{ label: 'Pricing', href: '#' },
	{ label: 'Blog', href: '#' },
	{ label: 'FAQ', href: '#' },
];

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 w-full z-50 px-6 pt-6">
			<div className="max-w-7xl mx-auto">
				{/* Glass Container */}
				<div className="flex items-center justify-between px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
					{/* Logo */}
					<div className="flex items-center gap-3 cursor-pointer">
						<div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center shadow-md">
							{/* <span className="text-xs font-bold text-black">A</span> */}
							<Image
								src="/aesthetify.svg"
								alt="Aesthetify Logo"
								height={20}
								width={20}
							/>
						</div>
						<span className="text-lg font-semibold tracking-tight text-white">
							Aestheti<span className="font-black italic text-indigo-200">fy.</span>
						</span>
					</div>

					{/* Desktop Nav */}
					<nav className="hidden md:flex items-center gap-8">
						{NAV_ITEMS.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className="text-sm font-medium text-white/60 hover:text-white transition-colors"
							>
								{item.label}
							</a>
						))}
					</nav>

					{/* Desktop Auth */}
					<div className="hidden md:flex items-center gap-3">
						<SignedOut>
							<SignInButton mode="modal">
								<Button
									variant="ghost"
									className="text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-full"
								>
									Log in
								</Button>
							</SignInButton>

							<SignUpButton mode="modal">
								<Button className="text-sm rounded-full px-6 bg-primary text-indigo-950 hover:bg-primary/90">
									Sign up
								</Button>
							</SignUpButton>
						</SignedOut>

						<SignedIn>
							<UserButton
								appearance={{
									elements: {
										avatarBox: 'w-9 h-9',
									},
								}}
							/>
						</SignedIn>
					</div>

					{/* Mobile Toggle */}
					<button
						className="md:hidden text-white/80"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl p-6 shadow-xl flex flex-col gap-5">
						{NAV_ITEMS.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className="text-base text-white/70 hover:text-white"
							>
								{item.label}
							</a>
						))}
						<div className="pt-4 flex flex-col gap-3">
							<SignedOut>
								<SignInButton mode="modal">
									<Button
										variant="outline"
										className="border-white/10 bg-white/5 text-white rounded-full"
									>
										Log in
									</Button>
								</SignInButton>

								<SignUpButton mode="modal">
									<Button className="bg-primary text-indigo-800 rounded-full">
										Sign up
									</Button>
								</SignUpButton>
							</SignedOut>

							<SignedIn>
								<div className="flex justify-center pt-2">
									<UserButton />
								</div>
							</SignedIn>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
