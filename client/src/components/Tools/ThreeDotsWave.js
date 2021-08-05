import React from 'react'
import { motion } from 'framer-motion'

const loadingContainer = {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'space-around'
};

const loadingCircle = {
    display: 'block',
    width: '20px',
    height: '20px',
    backgroundColor: '#0057ff',
    borderRadius: '50px'
};

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.1
        }
    },
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const loadingCircleVariants = {
    start: {
        y: '0%'
    },
    end : {
        y: '100%'
    }
};

const loadingCircleTransition = {
    duration: 0.4,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
};

function ThreeDotsWave() {
    return (
        <motion.div style={loadingContainer} variants={loadingContainerVariants} initial='start' animate='end'>
            <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}> </motion.span>
            <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}></motion.span>
            <motion.span style={loadingCircle} variants={loadingCircleVariants} transition={loadingCircleTransition}></motion.span>
        </motion.div>
    )
}

export default ThreeDotsWave
