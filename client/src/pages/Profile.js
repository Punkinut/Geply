import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect } from 'react-router-dom'
import Auth from '../utils/auth';

function Profile() {
    if (!Auth.loggedIn()){
    return <Redirect to='/welcome'/>
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <p>Profile</p>
        </motion.div>
    )
}

export default Profile
