import React from 'react'
import { motion } from 'framer-motion'

function Login() {
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
        <section className='login-container'>
            <p>Login</p>
        </section>
        </motion.div>
    )
}

export default Login
