'use client';
import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import FlowerBackground from '../FlowerBackground';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import Categories from './Categories';
import AboutSection from './AboutSection';
import Footer from './Footer';
import ShopsSection from './ShopsSection';

const HomePage: React.FC = () => {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      position="relative"
      overflow="hidden"
    >
      <FlowerBackground />
      
      <Container maxW="full" px={0} position="relative" zIndex={1}>
        <Header />
        <Box id="home">
          <Hero />
        </Box>
        <Box id="catalog">
          <FeaturedProducts />
          <Categories />
        </Box>
        <Box id="about">
          <ShopsSection />
          <AboutSection />
        </Box>
        <Box id="contact">
          <Footer />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
