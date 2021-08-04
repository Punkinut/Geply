import { motion } from 'framer-motion'
import React from 'react'
import Arrow from '../images/left-arrow.svg'
import { Link, Redirect } from 'react-router-dom';
import Auth from '../utils/auth';

function Bio() {

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('Works')
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
                        <textarea placeholder='Write about you...' maxLength='150' type='text' className='bio-input light-text'></textarea>
                        <motion.button whileHover={{scale: 0.95}} type='submit' className='logout'>
                            <p>Save</p>
                        </motion.button>
                    </motion.form>
                </section>
            </section>
            
        </motion.div>
    )
}

export default Bio
