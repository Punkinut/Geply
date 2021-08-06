import React from 'react'
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import Add from '../../images/add.svg'

function AddPost() {
    if (Auth.loggedIn()) {
        return (
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 2 }}
            exit={{ opacity: 0}}
            >   
               
               <Link to='/upload' className='addPost'>
                    <img className='plus-icon' alt='Add Icon' src={Add}/>
                </Link>
               <Link to='/upload'>
                   <motion.div className='addPostDes' whileHover={{scale: 1.1, rotate: '90deg', borderRadius: '50px'}}>
                    <img className='plus-icon' alt='Add Icon' src={Add}/>
                   </motion.div>
                </Link>
            </motion.div>
        )
    }
    return <></>
}

export default AddPost
