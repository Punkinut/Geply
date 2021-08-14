import React from 'react'
import Auth from '../../utils/auth';
import Home from '../../images/Home.svg'
import Compass from '../../images/Compass.svg'
import Message from '../../images/Message.svg'
import User from '../../images/User.svg'
import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';

function MobileNav() {
    const location = useLocation();
    if (!Auth.loggedIn() || location.pathname.includes('/comments') || location.pathname.includes('/message')) {
        return <></>
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: 2 }}
        exit={{ opacity: 0}}
        >
            <section className='mobile-nav'>
                <NavLink exact activeClassName='active-icon' className={'icon'} to='/'><img alt='Message Icon' src={Home}/></NavLink>
                <NavLink exact activeClassName='active-icon' className={'icon'} to='/friends'><img alt='Compass Icon' src={Compass}/></NavLink>
                <NavLink exact activeClassName='active-icon' className={'icon'} to='/chat'><motion.img whileHover={{scale: 1.3}} alt='Compass Icon' src={Message}/></NavLink>
                <NavLink exact activeClassName='active-icon' className={'icon user'} to='/profile'><img alt='User Icon' src={User}/></NavLink>
            </section>
        </motion.div>
    )
}

export default MobileNav
