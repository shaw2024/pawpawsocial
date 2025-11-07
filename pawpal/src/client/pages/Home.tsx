import React from 'react';
import Hero from '../components/Hero';

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <h1>Welcome to PawPal!</h1>
            <p>Your social platform dedicated to dog lovers. Share your love for dogs, post updates, and connect with fellow dog enthusiasts!</p>
        </div>
    );
};

export default Home;