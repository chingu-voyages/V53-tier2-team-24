import React from 'react';
import HeroImage from '../assets/hero-image.png';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section className="py-12 flex flex-col px-8 md:px-28  md:flex-row-reverse items-center md:justify-between">
      <motion.div
        className="mt-8 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={HeroImage}
          alt="hero image"
          className="w-full min-w-[300px] max-w-[400px]"
        />
      </motion.div>
      <div className="max-w-lg text-center md:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Plan Your Weekly Menu</h2>
        <p className="text-lg text-gray-600 mb-10">
          For transparent, customized, and nutritious meal plans, fostering healthier and happier workplaces.
        </p>
        <button className="bg-buttons text-xl text-white py-3 px-8 rounded-3xl shadow-md hover:bg-buttonsHover transition">Schedule a Menu</button>
      </div>
    </section>
  );
};

export default Home;
