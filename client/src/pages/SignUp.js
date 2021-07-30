import React from 'react'
import { motion } from 'framer-motion'

function SignUp() {
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
        <section className='login-container'>
            <form>
                
            </form>
        </section>
        </motion.div>
    )
}

export default SignUp
