"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const MotionWrapper = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                delay: delay 
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
