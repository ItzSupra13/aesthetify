"use client"

import { Header } from '@/components/web/Header';
import { Hero } from '@/components/web/Hero'; 

export default function Home(){
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
};
