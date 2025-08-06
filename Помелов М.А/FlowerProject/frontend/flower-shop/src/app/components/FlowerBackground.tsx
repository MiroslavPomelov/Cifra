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


  const flowers = useMemo(() => [
    { id: 1, emoji: '🌸', delay: 0, duration: 30, initialX: 0.1, initialY: 0.2, targetX: 0.8, targetY: 0.7 },
    { id: 2, emoji: '🌺', delay: 3, duration: 18, initialX: 0.8, initialY: 0.1, targetX: 0.2, targetY: 0.9 },
    { id: 3, emoji: '🌹', delay: 6, duration: 12, initialX: 0.3, initialY: 0.8, targetX: 0.9, targetY: 0.3 },
    { id: 4, emoji: '🌷', delay: 2, duration: 16, initialX: 0.7, initialY: 0.6, targetX: 0.1, targetY: 0.4 },
  ], []);


  const particles = useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      initialX: Math.random(),
      size: 12 + Math.random() * 8, // Разный размер лепестков
      duration: 18 + Math.random() * 40, // Разная скорость падения
      delay: Math.random() * 15,
      repeatDelay: 5 + Math.random() * 5, // Задержка перед повторением
      hue: 330 + Math.random() * 30, // Цветовая гамма
      opacity: 0.2 + Math.random() * 0.3, // Разная прозрачность
      initialRotate: Math.random() * 280, // Начальный поворот
    })),[]);

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
            fontSize: '1.5rem',
            opacity: 0.2,
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

      {/* Падающие лепестки */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: 'transparent',
            filter: `drop-shadow(0 0 1px hsl(${particle.hue}, 70%, 70%))`,
            zIndex: 0,
          }}
          initial={{
            x: particle.initialX * dimensions.width,
            y: -particle.size,
            rotate: particle.initialRotate,
          }}
          animate={{
            x: particle.initialX * dimensions.width + Math.sin(particle.id * 100) * 50, // Боковое качание
            y: dimensions.height + particle.size,
            rotate: particle.initialRotate + 360 * (particle.id % 2 ? 1 : -1),
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
            repeatDelay: particle.repeatDelay || 0,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            style={{
              transform: `rotate(${particle.initialRotate}deg)`,
            }}
          >
            <path
              d="M12 3.5C8.5 3.5 5.5 6 5.5 9.5c0 4.5 6.5 10 6.5 10s6.5-5.5 6.5-10c0-3.5-3-6-6.5-6z"
              fill={`hsl(${particle.hue}, 70%, 70%)`}
              stroke={`hsl(${particle.hue}, 80%, 50%)`}
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </Box>
  );
};

export default FlowerBackground; 