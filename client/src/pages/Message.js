import { motion } from 'framer-motion';
import React from 'react'
import { Redirect } from 'react-router-dom';
import Auth from '../utils/auth';

function Message() {
    if (!Auth.loggedIn()){
        return <Redirect to='/'/>
        }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <section className='page-container'>
                <section className='message-container border'>

                </section>
            </section>
        </motion.div>
    )
}

export default Message
