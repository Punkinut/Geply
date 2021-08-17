import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Auth from '../utils/auth';

import { allMessages, getConversations, GET_ME } from '../utils/queries';
import { Link, Redirect } from 'react-router-dom';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import GrayButton from '../components/Tools/GrayButton';
import Hands from '../images/chat.svg'

function MainChat() {

    const [search, setSearch ] = useState('');

    const { data } = useQuery(GET_ME);
    const yourID = data?.me?._id || {};

    const { data: dataB, loading } = useQuery(getConversations, {
        fetchPolicy: 'network-only',
        pollInterval: 3000
    });

    const { data: messageData } = useQuery(allMessages, {
        pollInterval: 500
    });
    const messages = messageData?.allMessages;

    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value.toLowerCase());
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
                <section className='explore-container'>
                    <p className='username account-header explore-header'>Chat</p>
                    <div className='search-container'>
                        <input onChange={handleChange} placeholder='Search' className='search-bar'/>
                    </div>
                    {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        dataB?.getConversations[0] === undefined ? (
                            <section className='explore-container'>
                                <img alt='Person Icon' className='guy' src={Hands}/>
                                <p className='light-text no-following'>Find friends to chat...</p>
                                <Link to='/friends'><GrayButton word="Explore"/></Link>
                            </section>
                        ) : (
                            dataB?.getConversations?.map((conversation) => (
                            conversation?.members?.filter(member => member?._id !== yourID).map(filter => (
                                filter.username.toLowerCase().includes(search) ? (
                                        <Link to={`/message/${conversation._id}`} className='message-card' key={filter._id}>
                                            <section className='image-container image-chat small-image-container'>
                                                {filter.propic === '#' ? (
                                                    <p>{filter.username[0].toUpperCase()}</p>
                                                ) : (
                                                    <img className='small-pic' alt='Profile Icon' src={filter.propic}/>
                                                )}
                                            </section>
                                            <section className='message-titles'>
                                                <p className='message-user'>{filter.username}</p>
                                                {messages?.filter(message => message?.conversationId === conversation._id)?.reverse()?.map((newMessage, i) => (
                                                    i === 0 ? (
                                                        <p key={newMessage?._id} className='light-text'>{newMessage.text.slice(0, 20)}</p>
                                                    ) : (
                                                        <div key={newMessage?._id}></div>
                                                    )
                                                ))}
                                            </section>
                                        </Link> 
                                ) : (
                                    <div key={filter._id}></div>
                                )
                            
                            ))
                            )
                        )
                        )
                        
                    )}
                </section>
            </section>
            <div></div>
        </motion.div>
    )}

export default MainChat
