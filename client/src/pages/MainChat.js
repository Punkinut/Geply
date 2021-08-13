import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

function MainChat() {
    const { data } = useQuery(GET_ME);
    const user = data?.me;

    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
    }, [])
    
    useEffect(() => {
        socket.current.emit('addUser', user?._id);
        socket.current.on('getUsers', users => {
            console.log(users)
        })
    }, [user])


    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <section className='page-container'>
                <section className='explore-container'>
                    <p className='username account-header explore-header'>Chat</p>
                    <div className='search-container'>
                        <input placeholder='Search' className='search-bar'/>
                    </div>
                    <Link to={`message/id`} className='message-card'>
                        <section className='image-container small-image-container'>
                            <p></p>
                        </section>
                        <section className='message-titles'>
                            <p>Jeff Beck</p>
                            <p className='light-text'>Hey how is it going</p>
                        </section>
                    </Link> 
                    <Link to={`message/id`} className='message-card'>
                        <section className='image-container small-image-container'>
                            <p></p>
                        </section>
                        <section className='message-titles'>
                            <p>Smoe Mith</p>
                            <p className='light-text'>I went out to lunch today </p>
                        </section>
                    </Link> 
                </section>
            </section>
        </motion.div>
    )
}

export default MainChat
