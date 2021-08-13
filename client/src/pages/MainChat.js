import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

function MainChat() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io('ws://localhost:8900'))
    }, [])
    return (
        <>
            <section className='page-container'>
                <p>Chat Page</p>
            </section>
        </>
    )
}

export default MainChat
