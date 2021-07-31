import React from 'react'
import  { Redirect } from 'react-router-dom'
import Auth from '../utils/auth';

function Home() {
    if (!Auth.loggedIn()){
    return <Redirect to='/welcome'/>
    }
    return (
        <>
            <p>Home</p>
        </>
    )
}

export default Home
