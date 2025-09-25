'use client';

import type { Variants } from 'framer-motion';
import { easeOut, motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Types d'animation prédéfinis
export type AnimationType =
    | 'fade-in'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'scale-in'
    | 'bounce'
    | 'rotate'
    | 'none';

interface MotionWrapperProps {
    children: ReactNode;
    type?: AnimationType;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    custom?: Variants;
    viewport?: boolean;
}

export const MotionWrapper = ({
    children,
    type = 'fade-in',
    className = '',
    delay = 0,
    duration = 0.5,
    once = true,
    custom,
    viewport = false
}: MotionWrapperProps) => {
    // Définition des animations prédéfinies
    const animations: Record<AnimationType, Variants> = {
        'fade-in': {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        'slide-up': {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -50 }
        },
        'slide-down': {
            initial: { opacity: 0, y: -50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 }
        },
        'slide-left': {
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -50 }
        },
        'slide-right': {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 50 }
        },
        'scale-in': {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 }
        },
        bounce: {
            initial: { opacity: 0, y: 50 },
            animate: {
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 15
                }
            },
            exit: { opacity: 0, y: 20 }
        },
        rotate: {
            initial: { opacity: 0, rotate: -10 },
            animate: { opacity: 1, rotate: 0 },
            exit: { opacity: 0, rotate: 10 }
        },
        none: {
            initial: {},
            animate: {},
            exit: {}
        }
    };

    // Sélection de l'animation
    const selectedAnimation = custom || animations[type];

    // Configuration de la transition
    const transition = {
        duration,
        delay,
        ease: [easeOut]
    };

    return (
        <motion.div
            className={className}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={selectedAnimation}
            transition={transition}
            whileInView={viewport ? 'animate' : undefined}
            viewport={viewport ? { once } : undefined}
        >
            {children}
        </motion.div>
    );
};

// Animation de flottement pour les fonds
export const FloatingBackground = ({
    children,
    className = ''
}: {
    children: ReactNode;
    className?: string;
}) => {
    const floatingCss = `
  @keyframes float {
    0%, 100% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 10%;
    }
  }
  
  .floating-bg {
    animation: float 30s ease-in-out infinite;
  }
  `;

    return (
        <>
            <style>{floatingCss}</style>
            <div className={`floating-bg ${className}`}>{children}</div>
        </>
    );
};
