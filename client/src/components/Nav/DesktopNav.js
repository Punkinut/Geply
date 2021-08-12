import { motion } from 'framer-motion';
import React from 'react'
import Logo from '../../images/Logo.svg'
import Home from '../../images/Home.svg'
import Compass from '../../images/Compass.svg'
import User from '../../images/User.svg'
import Message from '../../images/Message.svg'
import { NavLink } from 'react-router-dom'
import Auth from '../../utils/auth';

function DesktopNav() {
    if (Auth.loggedIn()) {
        return (
            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ delay: 1 }}
            exit={{ opacity: 0}}
            >
            <section className='desktop-nav'>
                    <NavLink  className={'icon active-icon desktop-icon logo'} to='/'><motion.img whileHover={{scale: 1.1}} alt='Logo Icon' src={Logo}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon desktop-icon'} to='/'><motion.img whileHover={{scale: 1.3}} alt='Message Icon' src={Home}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon desktop-icon'} to='/friends'><motion.img whileHover={{scale: 1.3, rotate: '90deg'}} alt='Compass Icon' src={Compass}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon desktop-icon'} to='/chat'><motion.img whileHover={{scale: 1.3}} alt='Compass Icon' src={Message}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon user desktop-icon user-d'} to='/profile'><motion.img whileHover={{scale: 1.3}} alt='User Icon' src={User}/></NavLink>
            </section>
            </motion.div>
        )
    }
    return <></>
}

export default DesktopNav
