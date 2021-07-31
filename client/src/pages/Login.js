import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import  { Redirect } from 'react-router-dom'
import Button from '../components/Tools/Button'

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [formError, setError ] = useState(false)
    const [login] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({...formState, [name]: value });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({ variables: {email: formState.email, password: formState.password,}})
            const token = mutationResponse.data.login.token;
            Auth.login(token)
        } catch (err) {
            setError(true)
            console.log('Something went wrong...')
        }
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
            <div className='cross-box box-one'></div>
            <div className='cross-box box-two'></div>
            <p className='header'>Login</p>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <input name='email' onChange={handleChange} type='email' placeholder='Email' className={!formError ? 'input' : 'red-input'} required></input>
                <input name='password' onChange={handleChange} minLength='8' type='password' placeholder='Password' className={!formError ? 'input' : 'red-input'}></input>
                <Button type='submit' word="Login"/>
            </form>
            <Link className='lil-gray' to={'/signup'}><motion.p whileHover={{opacity: 1, scale: 1.1}}>Sign Up?</motion.p></Link>
        </section>
        </motion.div>
    )
}

export default Login
