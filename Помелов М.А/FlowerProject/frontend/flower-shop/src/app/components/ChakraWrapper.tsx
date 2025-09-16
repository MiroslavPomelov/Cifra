'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Расширяем тему Chakra UI
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    pink: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
  components: {
    MenuItem: {
      baseStyle: {
        color: 'white',
        bg: 'transparent',
        _hover: {
          bg: 'rgba(236, 72, 153, 0.1)',
          color: 'pink.300',
        },
        _focus: {
          bg: 'rgba(236, 72, 153, 0.1)',
          color: 'white',
        },
      },
    },
    MenuList: {
      baseStyle: {
        bg: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        border: '1px solid rgba(236, 72, 153, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
    },
    MenuButton: {
      baseStyle: {
        _hover: {
          bg: 'rgba(255, 255, 255, 0.08)',
          transform: 'scale(1.02)',
          transition: 'all 0.2s ease',
        },
        _focus: {
          bg: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
          outline: 'none',
        },
        _active: {
          bg: 'rgba(255, 255, 255, 0.12)',
          transform: 'scale(0.98)',
        },
        transition: 'all 0.2s ease',
      },
    },
    Select: {
      baseStyle: {
        bg: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        _focus: {
          borderColor: 'pink.400',
          boxShadow: '0 0 0 1px pink.400',
          bg: 'rgba(255, 255, 255, 0.15)',
        },
        _hover: {
          bg: 'rgba(255, 255, 255, 0.15)',
        },
      },
    },
  },
});

interface ChakraWrapperProps {
  children: React.ReactNode;
}

export default function ChakraWrapper({ children }: ChakraWrapperProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
