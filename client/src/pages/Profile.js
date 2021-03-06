import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect, Link } from 'react-router-dom'
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import WideButton from '../components/Tools/WideButton';
import GrayButton from '../components/Tools/GrayButton';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';

function Profile() {
    const { data, loading } = useQuery(GET_ME);
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
                {loading ? (
                <section className='loading-container'>
                    <ThreeDotsWave/>
                </section>
                ) : (
                <section className='profile-container'>
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1}} className='sub-pic'>
                        {data.me.propic === '#' ? (
                            <p>{data.me.username[0].toUpperCase()}</p>
                        ) : (
                            <section className='image-container'>
                                <img className='official-pic' alt='Pro Pic' src={data.me.propic}/>
                            </section>
                        )}
                        <div className={data?.me?.online ? 'online': 'offline'}></div>
                    </motion.div>
                    <p className='username'>{data.me.username}</p>
                    {data.me.followers?.length === 1 ? (
                        <p className='friends'>{`${data.me.followers?.length} Follower`}</p>
                    ) : (
                        <p className='friends'>{`${data.me.followers?.length} Followers`}</p>
                    )}
                    
                    <p className='bio'>{data.me.bio}</p>
                    <motion.div className='button-container'>
                        <Link to='/edit'><WideButton word="Edit Profile"/></Link>
                        <Link to='/following'><GrayButton word="Following"/></Link>
                    </motion.div>
                </section>
                )}
                
            </section>
        </motion.div>
    )
}

export default Profile
