import { useQuery } from '@apollo/client';
import React, { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { GET_ME } from '../utils/queries';

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
        <>
            <section className='page-container'>
                <p>Chat Page</p>
            </section>
        </>
    )
}

export default MainChat
