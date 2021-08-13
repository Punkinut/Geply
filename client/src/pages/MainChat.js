import React, { useRef } from 'react'
import { io } from 'socket.io-client'

function MainChat() {
    const socket = useRef(io('ws://localhost:8900'));
    
    console.log(socket)
    return (
        <>
            <section className='page-container'>
                <p>Chat Page</p>
            </section>
        </>
    )
}

export default MainChat
