import { motion } from 'framer-motion';
import React, { useState } from 'react'
import  { Link, Redirect } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_ME, SEARCH_USERS } from '../utils/queries';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import { addFollowing, removeFollowing } from '../utils/mutations';

function Friends() {

    const [search, setSearch ] = useState('');

    const { data, loading } = useQuery(SEARCH_USERS, { variables: {username: search}});
    const { data: dataB } = useQuery(GET_ME);
    const yourID = dataB?.me?._id || {};

    const [follow] = useMutation(addFollowing);
    const [unfollow] = useMutation(removeFollowing);

    const plusFollow = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = e.target.id
        await follow({ variables: {id}})
    };

    const minusFollow = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = e.target.id
        await unfollow({ variables: {id}})
    };

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
                                    {user.followers?.length === 1 ? (
                                        <p className='light-text'>{`${user.followers?.length} Follower`}</p>
                                    ) : (
                                        <p className='light-text'>{`${user.followers?.length} Followers`}</p>
                                    )}
                                    
                                </section>
                                {user?.followers?.some(user => user._id === yourID) ? (
                                    <button onClick={minusFollow} id={user._id} className='added-button'>Added</button>
                                ) : (
                                    <button onClick={plusFollow} id={user._id} className='follow-button'>Follow</button>
                                )}
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
