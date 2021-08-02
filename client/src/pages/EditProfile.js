import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect } from 'react-router-dom'
import Auth from '../utils/auth';

function EditProfile() {
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
                <section className='edit-container'>
                    <p className='username account-header'>Account</p>
                    <section className='choice-container'>
                        <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 1}} className='choice'>

                        </motion.div>
                        <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 1}} className='choice'>

                        </motion.div>
                    </section>
                    <motion.section whileHover={{scale: 0.9}} whileTap={{scale: 1}} onClick={Auth.logout} className='logout'>
                        <p>Log Out</p>
                    </motion.section>
                </section>
            </section>
        </motion.div>
    )
}

export default EditProfile
