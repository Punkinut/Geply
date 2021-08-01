import React from 'react'
import Auth from '../../utils/auth';
import Message from '../../images/Message.svg'
import Compass from '../../images/Compass.svg'
import User from '../../images/User.svg'
import { NavLink } from 'react-router-dom'
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
                    <NavLink exact activeClassName='active-icon' className={'icon'} to='/friends'><img alt='Compass Icon' src={Compass}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon'} to='/'><img alt='Message Icon' src={Message}/></NavLink>
                    <NavLink exact activeClassName='active-icon' className={'icon user'} to='/profile'><img alt='User Icon' src={User}/></NavLink>
                </section>
            </motion.div>
        )
    }
    return <></>
}

export default MobileNav
