import React from 'react'
import WideButton from '../components/Tools/WideButton'
import Person from '../images/Person.svg'

function LetsGo() {
    return (
        <>
        <section className='login-container'>
            <p className='title'>Geply</p>
            <img alt='Person Icon' className='person' src={Person}/>
            <WideButton word="Let's Go"/>
            <p className='lil-gray'>Sign Up?</p>
        </section>
        </>
    )
}

export default LetsGo
