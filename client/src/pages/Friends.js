import { motion } from 'framer-motion';
import React, { useState } from 'react'
import  { Link, Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_ME, SEARCH_USERS } from '../utils/queries';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';

function Friends() {

    const [search, setSearch ] = useState('')

    const { data, loading } = useQuery(SEARCH_USERS, { variables: {username: search}});
    const { data: dataB } = useQuery(GET_ME);
    const yourID = dataB?.me?._id || {};

    const handleChange = (e) => {
        const { value } = e.target;
        setSearch(value);
    };

    if (!Auth.loggedIn()){
    return <Redirect to='/welcome'/>
    }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <section className='page-container'>
                <section className='explore-container'>
                    <p className='username account-header explore-header'>Explore</p>
                    <div className='search-container'>
                        <input onChange={handleChange} placeholder='Find Friends' className='search-bar'/>
                    </div>
                    {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        data?.searchUsers?.map((user) => (
                            yourID === user._id ? (
                                <div key={user._id}></div>
                            ) : (
                              <Link to={`profile/${user._id}`} className='profile-card' key={user._id}>
                                <section className='image-container small-image-container'>
                                    {user.propic === '#' ? (
                                        <p>{user.username[0].toUpperCase()}</p>
                                    ) : (
                                        <img className='small-pic' alt='Profile Icon' src={user.propic}/>
                                    )}
                                    
                                </section>
                                <section className='user-titles'>
                                    <p>{user.username}</p>
                                    <p className='light-text'>No Friends</p>
                                </section>
                                <button></button>
                            </Link>  
                            )
                            
                        ))
                    )}
                </section>
            </section>
        </motion.div>
    )
}

export default Friends
