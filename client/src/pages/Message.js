import { motion } from 'framer-motion';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import Auth from '../utils/auth';
import Arrow from '../images/left-arrow.svg'
import Send from '../images/send.svg'

function Message() {
    if (!Auth.loggedIn()){
        return <Redirect to='/'/>
        }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <section className='page-container'>
                <section className='posts-container'>
                    <div className='message-header'>
                        <Link to='/chat'><img className='icon' src={Arrow} alt='Arrow Icon'/></Link>
                        <p>Jeff Beck</p>
                        <div></div>
                    </div>
                <div className='realtime-message'>
                   <section className='comment-container'>
                    <section className='com com2'>
                        <div className='img-propic'>
                            <img alt='' className='comment-pic'/>
                        </div>
                        <p className='real-comment light-text'>Hello my name is Tom and I was just testing the styling of this!</p>
                    </section>
                    <section className='com'>
                        <p className='blue-comment blue-message light-text'>Hello my name is Tom and I was just testing the styling of this!</p>
                    </section>
                </section>
                <section className='comment-nav'>
                        <form className='comment-form'>
                            <input className='light-text comment-input' placeholder='Type a message...' type='text' required></input>
                            <button type='submit' className='comment-submit'><img className='icon post-icon' alt='Send Icon' src={Send}/></button>
                        </form>
                    </section> 
                </div>
                
                </section>
            </section>
        </motion.div>
    )
}

export default Message