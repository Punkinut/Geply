import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect } from 'react-router-dom'
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Auth from '../utils/auth';
import { GET_ME } from '../utils/queries';

function Following() {

    const { data, loading } = useQuery(GET_ME);

    const following = data?.me?.following || {};

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
                <p className='username account-header explore-header'>Following</p>
                {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        following?.map((user) => (
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
                                    {user.followers?.length === 1 ? (
                                        <p className='light-text'>{`${user.followers?.length} Follower`}</p>
                                    ) : (
                                        <p className='light-text'>{`${user.followers?.length} Followers`}</p>
                                    )}
                                    
                                </section>
                                <div></div>
                                <div></div>
                            </Link>  
                            
                            
                        ))
                    )}
                </section>
            </section>
        </motion.div>
    )
}

export default Following
