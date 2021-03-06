import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Arrow from '../images/left-arrow.svg'
import { useMutation } from '@apollo/client';
import { updateBio } from '../utils/mutations';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import Auth from '../utils/auth';

function Bio() {

    const history = useHistory();

    const [bio, setBio ] = useState('');
    const [bioUpdate] = useMutation(updateBio);

    const handleChange = (event) => {
        const { value } = event.target
        setBio(value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        await bioUpdate({ variables: {bio}})
        history.replace('/profile')
    };
    if (!Auth.loggedIn()){
        return <Redirect to='/welcome'/>
        }
    return (
        <motion.div>
            <section className='page-container'>
                <section className='edit-container'>
                    <Link to='/profile'><img className='icon left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <motion.p initial={{ opacity: 0}} animate={{ opacity: 1}} className='username account-header'>Bio</motion.p>
                    <motion.form onSubmit={handleFormSubmit} initial={{ opacity: 0}} animate={{ opacity: 1}} className='bio-form'>
                        <textarea onChange={handleChange} placeholder='Write about you...' maxLength='40' type='text' className='bio-input light-text'></textarea>
                        <motion.button whileHover={{scale: 0.95}} whileTap={{scale: 1}} type='submit' className='logout'>
                            <p>Save</p>
                        </motion.button>
                    </motion.form>
                </section>
            </section>
            
        </motion.div>
    )
}

export default Bio
