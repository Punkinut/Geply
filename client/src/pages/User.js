import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect, useParams } from 'react-router-dom'
import GrayButton from '../components/Tools/GrayButton';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import WideButton from '../components/Tools/WideButton';
import Auth from '../utils/auth';
import { singleUser } from '../utils/queries';

function User() {
    const { id } = useParams();

    const { loading, data } = useQuery(singleUser, {
        variables: { id }
    });

    const profile = data?.singleUser || {};

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
                        {profile.propic === '#' ? (
                            <p>{profile.username[0].toUpperCase()}</p>
                        ) : (
                            <section className='image-container'>
                                <img className='official-pic' alt='Pro Pic' src={profile.propic}/>
                            </section>
                        )}
                        <div className={profile.online ? 'online': 'offline'}></div>
                    </motion.div>
                    <p className='username'>{profile.username}</p>
                    <p className='friends'>No Friends</p>
                    <p className='bio'>{profile.bio}</p>
                    <motion.div className='button-container'>
                        <Link to='/edit'><WideButton word="Add Friend"/></Link>
                        <GrayButton word="Message"/>
                    </motion.div>
                </section>
                )}
            </section>
        </motion.div>
    )
}

export default User
