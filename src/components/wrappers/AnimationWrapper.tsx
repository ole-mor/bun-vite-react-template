import React from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageSlideVariants: Variants = {
    initial: (direction: number): TargetAndTransition => {
        const initialX = direction === 1 ? '100%' : '-100%';
        return {
            x: initialX,
            opacity: 0,
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
        };
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.4 },
    },
    exit: (direction: number): TargetAndTransition => {
        const exitX = direction === 1 ? '100%' : '-100%';
        console.log(`[Variant Exit] direction: ${direction}, exitX: ${exitX}`);
        return {
            x: exitX,
            opacity: 0,
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
            transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 },
        };
    },
};
// --- ---

interface AnimatedPageProps {
    children: React.ReactNode;
    direction: number;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, direction }) => {
    const location = useLocation();

    console.log(`[AnimatedPage] Path: ${location.pathname}, Received Direction: ${direction}`);

    return (
        <motion.div
            key={location.pathname}
            custom={direction}
            variants={pageSlideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: '100%', height: '100%', position: 'relative' }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage;