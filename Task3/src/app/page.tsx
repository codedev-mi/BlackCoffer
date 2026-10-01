import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Solutions from '@/components/Solutions';
import WhatMakesUsDifferent from '@/components/WhatMakesUsDifferent';
import SuccessStories from '@/components/SuccessStories';
import RequestCallBack from '@/components/RequestCallBack';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <WhatMakesUsDifferent />
      <SuccessStories />
      <RequestCallBack />
      <Footer />
    </main>
  );
}
