import React from 'react'
import { motion } from 'framer-motion'

function Button({word}) {
    return (
        <>
            <motion.button className='small-button' whileTap={{scale: 0.9}} whileHover={{scale: 1.08}}>{word}</motion.button>
        </>
    )
}

export default Button
