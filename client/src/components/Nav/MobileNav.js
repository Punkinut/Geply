import React from 'react'
import Auth from '../../utils/auth';
import Message from '../../images/Message.svg'
import Compass from '../../images/Compass.svg'
import User from '../../images/User.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

function MobileNav() {
   

    if (Auth.loggedIn()) {
        return (
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 2 }}
            exit={{ opacity: 0}}
            >
                <section className='mobile-nav'>
                    <Link to={'/friends'}><img className='icon' alt='Compass Icon' src={Compass}/></Link>
                    <Link to={'/'}><img className='icon' alt='Message Icon' src={Message}/></Link>
                    <Link to={'/profile'}><img className='icon user' alt='User Icon' src={User}/></Link>
                </section>
            </motion.div>
        )
    }
    return <></>
}

export default MobileNav
