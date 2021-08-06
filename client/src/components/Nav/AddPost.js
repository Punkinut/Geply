import React from 'react'
import Auth from '../../utils/auth';
// import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

function AddPost() {
    if (Auth.loggedIn()) {
        return (
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 2 }}
            exit={{ opacity: 0}}
            >
               <section className='addPost'>
                    
               </section>
            </motion.div>
        )
    }
    return <></>
}

export default AddPost
