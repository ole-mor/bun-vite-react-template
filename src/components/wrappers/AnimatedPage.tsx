import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { useLocation, useNavigationType } from 'react-router-dom';

const pageSlideVariants: Variants = {
  initial: (direction: number): TargetAndTransition => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    transition: { duration: 0 }
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  exit: (direction: number): TargetAndTransition => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  }),
};

interface AnimatedPageProps {
  children: React.ReactNode;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  const navigationType = useNavigationType();
  const location = useLocation();
  const direction = navigationType === 'PUSH' ? 1 : -1;

  return (
    <motion.div
      key={location.pathname}
      custom={direction}
      variants={pageSlideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;