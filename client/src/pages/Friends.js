import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect } from 'react-router-dom'
import Auth from '../utils/auth';

function Friends() {
    if (!Auth.loggedIn()){
    return <Redirect to='/welcome'/>
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <section className='page-container'>
                <section className='explore-container'>
                    <p className='username account-header explore-header'>Explore</p>
                    <div className='search-container'>
                        <input placeholder='Find Friends' className='search-bar'/>
                    </div>
                </section>
            </section>
        </motion.div>
    )
}

export default Friends
