import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Tools/Button'

function Login() {

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('LOGIN UP WORKS')
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
        <section className='login-container'>
        <p className='header'>Login</p>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <input type='email' placeholder='Email' className='input' required></input>
                <input minLength='6' type='password' placeholder='Password' className='input'></input>
                <Button type='submit' word="Login"/>
            </form>
            <Link className='lil-gray' to={'/signup'}><motion.p whileHover={{opacity: 1, scale: 1.1}}>Sign Up?</motion.p></Link>
        </section>
        </motion.div>
    )
}

export default Login
