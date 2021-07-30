import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import WideButton from '../components/Tools/WideButton'
import Person from '../images/Person.svg'

function LetsGo() {
    return (
        <>
        <section className='login-container'>
            <p className='title'>Geply</p>
            <img alt='Person Icon' className='person' src={Person}/>
            <Link to={'/login'}><WideButton word="Let's Go"/></Link>
            <Link className='lil-gray' to={'/signup'}><motion.p whileHover={{opacity: 1, scale: 1.1}}>Sign Up?</motion.p></Link>
        </section>
        </>
    )
}

export default LetsGo
