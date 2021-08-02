import React from 'react'
import { motion } from 'framer-motion'

function GrayButton({word}) {
    return (
        <>
            <motion.button className='gray-button' whileTap={{scale: 0.9}} whileHover={{scale: 1.08}}>{word}</motion.button>
        </>
    )
}

export default GrayButton