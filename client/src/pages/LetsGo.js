import React from 'react'
import { motion } from 'framer-motion'
import WideButton from '../components/Tools/WideButton'
import Person from '../images/Person.svg'

function LetsGo() {
    return (
        <>
        <section className='login-container'>
            <p className='title'>Geply</p>
            <img alt='Person Icon' className='person' src={Person}/>
            <WideButton word="Let's Go"/>
            <motion.p className='lil-gray' whileHover={{opacity: 1, scale: 1.1}}>Sign Up?</motion.p>
        </section>
        </>
    )
}

export default LetsGo
