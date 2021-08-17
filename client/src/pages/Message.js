import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import Arrow from '../images/left-arrow.svg'
import Send from '../images/send.svg'
import { useMutation, useQuery } from '@apollo/client';
import { getMessages, GET_ME, oneConversation } from '../utils/queries';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import { createMessage } from '../utils/mutations';

function Message() {
    
    const scrollRef = useRef();
    
    const [ text, setText ] = useState('');
    const [messageAdd] = useMutation(createMessage);

    const { id } = useParams();
    const { data } = useQuery(GET_ME);
    const user = data?.me;

    const { data: messages, loading } = useQuery(getMessages, {
        variables: { conversationId: id },
        pollInterval: 500
    });

    const { data: conversationData } = useQuery(oneConversation, {
        variables: {id}
    });

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
      }, [messages]);

    const receiver = conversationData?.oneConversation?.members?.filter( member => member?._id !== user._id) || {};
    
    const chatMessages = messages?.getMessages || [];
    
    const handleChange = (e) => {
        const { value } = e.target;
        setText(value)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await messageAdd({ 
            variables: {conversationId: id, text: text},
            refetchQueries: [{query: getMessages, variables: {conversationId: id}}]
        })
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
            <section ref={scrollRef} className='page-container'>
                <section className='posts-container'>
                <Link to='/chat'><img className='icon spec-left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <div className='message-header'>
                        <p>{receiver[0]?.username}</p>
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
                                <input value={text} onChange={handleChange} className='light-text comment-input' placeholder='Message...' type='text' required></input>
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
