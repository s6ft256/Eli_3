
import React from 'react';
import Hero from '../components/home/Hero';
import Journey from '../components/home/Journey';
import Portfolio from '../components/home/Portfolio';
import Partners from '../components/home/Partners';
import { Page } from '../types';

interface HomeProps {
    navigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ navigate }) => {
  return (
    <div>
      <Hero navigate={navigate} />
      <Journey />
      <Portfolio />
      <Partners />
    </div>
  );
};

export default Home;
