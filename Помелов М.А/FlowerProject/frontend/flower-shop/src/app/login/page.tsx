'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import OptimizedAuthForms from '../components/OptimizedAuthForms';

// Кастомная тема для цветочного магазина
const theme = extendTheme({
  colors: {
    brand: {
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
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

const AuthPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <OptimizedAuthForms />
    </ChakraProvider>
  );
};

export default AuthPage;