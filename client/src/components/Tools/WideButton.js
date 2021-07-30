import React from 'react'
import { motion } from 'framer-motion'

function WideButton({word}) {
    return (
        <>
            <motion.button className='wide-button' whileHover={{scale: 1.08}}>{word}</motion.button>
        </>
    )
}

export default WideButton
