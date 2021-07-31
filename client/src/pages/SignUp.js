import React from 'react'
import { motion } from 'framer-motion'
import { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';
import Button from '../components/Tools/Button'

function SignUp() {

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('SIGN UP WORKS')
    }
    if (Auth.loggedIn()){
        return <Redirect to='/'/>
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
                <input minLength='8' type='password' placeholder='Password' className='input'></input>
                <Button type='submit' word="Signup"/>
            </form>
            <Link className='lil-gray' to={'/login'}><motion.p whileHover={{opacity: 1, scale: 1.1}}>Login?</motion.p></Link>
        </section>
        </motion.div>
    )
}

export default SignUp
