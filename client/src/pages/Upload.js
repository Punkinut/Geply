import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect } from 'react-router-dom'
import Auth from '../utils/auth';

function Upload() {
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
                <p>Upload</p>
            </section>
        </motion.div>
    )
}

export default Upload
