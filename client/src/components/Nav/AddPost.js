import React from 'react'
import Auth from '../../utils/auth';
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import Add from '../../images/add.svg'

function AddPost() {
    const location = useLocation();
    if (!Auth.loggedIn() || location.pathname ==='/upload' || location.pathname ==='/bio' || location.pathname ==='/edit' || location.pathname.includes('/comments') || location.pathname.includes('/message')) {
        return <></>
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 1 }}
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

export default AddPost
