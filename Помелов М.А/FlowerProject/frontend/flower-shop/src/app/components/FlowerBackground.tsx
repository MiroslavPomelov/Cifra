'use client';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import { useState, useEffect, useMemo, useCallback } from 'react';

const FlowerBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Проверяем предпочтения пользователя по анимации
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Оптимизированные цветы - меньше анимаций
  const flowers = useMemo(() => [
    { id: 1, emoji: '🌸', delay: 0, duration: 25, initialX: 0.1, initialY: 0.2, targetX: 0.8, targetY: 0.7 },
    { id: 2, emoji: '🌺', delay: 8, duration: 20, initialX: 0.8, initialY: 0.1, targetX: 0.2, targetY: 0.9 },
  ], []);

  // Уменьшенное количество частиц для лучшей производительности
  const particles = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      initialX: Math.random(),
      size: 8 + Math.random() * 6, // Уменьшенный размер
      duration: 15 + Math.random() * 25, // Более быстрая анимация
      delay: Math.random() * 10,
      repeatDelay: 3 + Math.random() * 3, // Меньшая задержка
      hue: 330 + Math.random() * 30,
      opacity: 0.15 + Math.random() * 0.2, // Меньшая прозрачность
      initialRotate: Math.random() * 180, // Упрощенный поворот
    })), []);

  // Throttled resize handler для лучшей производительности
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
    
    // Throttled resize listener
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  if (!isClient || dimensions.width === 0) {
    return null;
  }

  // Если пользователь предпочитает уменьшенную анимацию, показываем статичный фон
  if (isReducedMotion) {
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
        opacity={0.1}
      >
        <Box
          position="absolute"
          top="10%"
          left="10%"
          fontSize="2rem"
          opacity={0.3}
        >
          🌸
        </Box>
        <Box
          position="absolute"
          bottom="20%"
          right="15%"
          fontSize="1.5rem"
          opacity={0.2}
        >
          🌺
        </Box>
      </Box>
    );
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
            opacity: 0.15,
            willChange: 'transform', // Оптимизация для GPU
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
            willChange: 'transform', // Оптимизация для GPU
          }}
          initial={{
            x: particle.initialX * dimensions.width,
            y: -particle.size,
            rotate: particle.initialRotate,
          }}
          animate={{
            x: particle.initialX * dimensions.width + Math.sin(particle.id * 50) * 30, // Упрощенное качание
            y: dimensions.height + particle.size,
            rotate: particle.initialRotate + 180 * (particle.id % 2 ? 1 : -1), // Упрощенный поворот
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