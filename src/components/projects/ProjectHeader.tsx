'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface Props {
  title: string;
}

export const ProjectHeader = ({ title }: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 px-6 py-4 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-6">
          
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center">
              <Image
                src="/aesthetify.svg"
                alt="Aesthetify Logo"
                height={18}
                width={18}
              />
            </div>
            <span className="text-lg font-semibold text-white">
              Aestheti
              <span className="font-black italic text-indigo-300">fy.</span>
            </span>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10" />

          {/* Back Button */}
          <button
            onClick={() => router.push('/projects')}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Project Title */}
        <h1 className="text-lg font-medium text-white truncate max-w-md text-right">
          {title}
        </h1>
      </div>
    </header>
  );
};