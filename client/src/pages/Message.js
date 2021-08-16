import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import Arrow from '../images/left-arrow.svg'
import Send from '../images/send.svg'
import { useMutation, useQuery } from '@apollo/client';
import { getMessages, GET_ME } from '../utils/queries';
import { io } from 'socket.io-client'
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import { createMessage } from '../utils/mutations';

function Message() {

    const [ text, setText ] = useState('');
    const [messageAdd] = useMutation(createMessage);

    const { id } = useParams();
    const { data } = useQuery(GET_ME);
    const user = data?.me;

    const { data: messages, loading } = useQuery(getMessages, {
        variables: { conversationId: id }
    });

    const chatMessages = messages?.getMessages || [];
    
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

    const handleChange = (e) => {
        const { value } = e.target;
        setText(value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await messageAdd({ variables: {conversationId: id, text: text}})
        setText('')
    };


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
                <Link to='/chat'><img className='icon spec-left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <div className='message-header'>
                        <p>Placeholder</p>
                        <div></div>
                    </div>
                <div className='realtime-message'>
                {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        <>
                        <section className='comment-container'>
                        {chatMessages.map((message) => (
                            message?.sender?._id !== user?._id ? (
                                <section className='com com2' key={message._id}>
                                    <div className='img-propic'>
                                        {message?.sender?.propic === '#' ? (
                                            <p>{message?.sender?.username[0].toUpperCase()}</p>
                                        ) : (<img alt='Propic' className='comment-pic' src={message?.sender?.propic}/>)}
                                        
                                    </div>
                                    <p className='real-comment light-text'>{message.text}</p>
                                </section>
                            ) : (
                                <section className='com' key={message._id}>
                                    <p className='blue-comment blue-message light-text'>{message.text}</p>
                                </section>
                            )
                        ))}
                        </section>
                        <section className='comment-nav'>
                            <form className='comment-form' onSubmit={handleSubmit}>
                                <input value={text} onChange={handleChange} className='light-text comment-input' placeholder='Type a message...' type='text' required></input>
                                <button type='submit' className='comment-submit'><img className='icon post-icon' alt='Send Icon' src={Send}/></button>
                            </form>
                        </section>
                        </>
                    )}
                    
                </div>
                
                </section>
            </section>
        </motion.div>
    )
}

export default Message
