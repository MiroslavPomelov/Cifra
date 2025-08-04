'use client';
import { motion } from 'framer-motion';

const AuthButton = () => {
  return (
    <motion.button
      className="relative w-28 h-10 rounded-lg text-white font-medium bg-emerald-500 overflow-hidden border-none outline-none"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#339c5fff",
        boxShadow: "0 0 10px rgba(9, 146, 27, 0.6)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow эффект (теперь не выходит за границы) */}
      <motion.span
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{
          x: "100%",
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      <span className="relative z-10 px-4 py-2">Войти</span>
    </motion.button>
  );
};

export default AuthButton;