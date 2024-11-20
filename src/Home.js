import React from 'react';
import Header from './components/Header';
import MainSection from './components/MainSection';
import FeaturesSection from './components/FeaturesSection';
import CardsSection from './components/CardsSection';
import StartSection from './components/StartSection';
import Footer from './components/Footer';

const Home = () => (
  <div className="min-h-screen flex flex-col bg-[url('/public/Fondo.jpg')] bg-cover bg-center">
    <Header />
    <main className="flex-grow">
      <MainSection />
      <FeaturesSection />
      <CardsSection />
    </main>
    <StartSection />
    <Footer />
  </div>
);

export default Home;
