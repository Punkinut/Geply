import React from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Tools/Button'

function SignUp() {

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('SIGN UP WORKS')
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
        <section className='login-container'>
            <p className='header'>Sign Up</p>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <input type='name' placeholder='Username' className='input' required></input>
                <input type='email' placeholder='Email' className='input' required></input>
                <input type='password' placeholder='Password' className='input'></input>
                <Button type='submit' word="Signup"/>
            </form>
        </section>
        </motion.div>
    )
}

export default SignUp
