import React from 'react'
import { motion } from 'framer-motion'

const loadingContainer = {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'space-around'
};

const loadingCircle = {
    display: 'block',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'black',
    borderRadius: '0.25rem'
};

function ThreeDotsWave() {
    return (
        <motion.div style={loadingContainer}>
            <motion.span> style={loadingCircle}</motion.span>
            <motion.span> style={loadingCircle}</motion.span>
            <motion.span> style={loadingCircle}</motion.span>
        </motion.div>
    )
}

export default ThreeDotsWave
