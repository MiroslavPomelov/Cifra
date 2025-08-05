'use client';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import { useState, useEffect, useMemo, useCallback } from 'react';

const FlowerBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Стабильные данные для цветов (еще более замедленная анимация)
  const flowers = useMemo(() => [
    { id: 1, emoji: '🌸', delay: 0, duration: 15, initialX: 0.1, initialY: 0.2, targetX: 0.8, targetY: 0.7 },
    { id: 2, emoji: '🌺', delay: 3, duration: 18, initialX: 0.8, initialY: 0.1, targetX: 0.2, targetY: 0.9 },
    { id: 3, emoji: '🌹', delay: 6, duration: 12, initialX: 0.3, initialY: 0.8, targetX: 0.9, targetY: 0.3 },
    { id: 4, emoji: '🌷', delay: 2, duration: 16, initialX: 0.7, initialY: 0.6, targetX: 0.1, targetY: 0.4 },
    { id: 5, emoji: '🌼', delay: 5, duration: 14, initialX: 0.2, initialY: 0.9, targetX: 0.8, targetY: 0.1 },
    { id: 6, emoji: '🌻', delay: 8, duration: 15, initialX: 0.9, initialY: 0.3, targetX: 0.3, targetY: 0.8 },
    { id: 7, emoji: '💐', delay: 4, duration: 20, initialX: 0.4, initialY: 0.1, targetX: 0.6, targetY: 0.9 },
    { id: 8, emoji: '🌿', delay: 7, duration: 17, initialX: 0.6, initialY: 0.7, targetX: 0.4, targetY: 0.2 },
  ], []);

  // Стабильные данные для частиц (еще более замедленная анимация)
  const particles = useMemo(() => 
    Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      initialX: Math.random(),
      targetX: Math.random(),
      duration: Math.random() * 40 + 40, // Еще больше увеличена длительность
      delay: Math.random() * 20, // Еще больше увеличены задержки
      hue: Math.random() * 60 + 300,
    })), []
  );

  const updateDimensions = useCallback(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  if (!isClient || dimensions.width === 0) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      pointerEvents="none"
      zIndex={0}
      overflow="hidden"
    >
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          style={{
            position: 'absolute',
            fontSize: '2rem',
            opacity: 0.1,
          }}
          initial={{
            x: flower.initialX * dimensions.width,
            y: flower.initialY * dimensions.height,
            rotate: 0,
            scale: 0,
          }}
          animate={{
            x: flower.targetX * dimensions.width,
            y: flower.targetY * dimensions.height,
            rotate: 360,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        >
          {flower.emoji}
        </motion.div>
      ))}
      
      {/* Плавающие частицы */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: `hsl(${particle.hue}, 70%, 70%)`,
            borderRadius: '50%',
            opacity: 0.3,
          }}
          initial={{
            x: particle.initialX * dimensions.width,
            y: dimensions.height + 10,
          }}
          animate={{
            x: particle.targetX * dimensions.width,
            y: -10,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </Box>
  );
};

export default FlowerBackground; 