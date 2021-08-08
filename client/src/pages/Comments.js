import React from 'react'
import { motion } from 'framer-motion'
import  { Redirect, useParams } from 'react-router-dom'
import Auth from '../utils/auth';

function Comments() {
    const { id } = useParams();
    console.log(id)
    if (!Auth.loggedIn()){
        return <Redirect to='/'/>
        }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{duration: 1}}
        >
            <section className='page-container'>
                <p>Comments</p>
            </section>
        </motion.div>
    )
}

export default Comments
