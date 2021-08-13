import React from 'react'
import { Redirect } from 'react-router-dom';
import Auth from '../utils/auth';

function Message() {
    if (!Auth.loggedIn()){
        return <Redirect to='/'/>
        }
    return (
        <div>
            <p>Messages</p>
        </div>
    )
}

export default Message
