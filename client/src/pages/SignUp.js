import React, {useState} from 'react'
import { motion } from 'framer-motion'
import { Link, Redirect } from 'react-router-dom'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SIGNUP } from '../utils/mutations';
import Button from '../components/Tools/Button'

function SignUp() {
    const [formState, setFormState] = useState({username: '', email: '', password: '' });
    const [formError, setError ] = useState(false)
    const [signup] = useMutation(SIGNUP);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({...formState, [name]: value });
      };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await signup({variables: {username: formState.username, email: formState.email, password: formState.password,}})
            const token = mutationResponse.data.signUp.token;
            Auth.login(token);
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
            <div className='cross-box box-three'></div>
            <div className='cross-box box-four'></div>
            <p className='header'>Sign Up</p>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <input name='username' onChange={handleChange} type='name' placeholder='Username' className={!formError ? 'input' : 'red-input'} required></input>
                <input name='email' onChange={handleChange} type='email' placeholder='Email' className={!formError ? 'input' : 'red-input'} required></input>
                <input name='password' onChange={handleChange} minLength='8' type='password' placeholder='Password' className={!formError ? 'input' : 'red-input'}></input>
                <Button type='submit' word="Signup"/>
            </form>
            <Link className='lil-gray' to={'/login'}><motion.p whileHover={{opacity: 1, scale: 1.1}}>Login?</motion.p></Link>
        </section>
        </motion.div>
    )
}

export default SignUp
