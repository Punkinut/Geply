import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  { Redirect } from 'react-router-dom'
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Auth from '../utils/auth';
import { allPosts } from '../utils/queries';
import GrayHeart from '../images/gray-heart.svg'
import Comment from '../images/comment.svg'

function Home() {

    const { data, loading } = useQuery(allPosts);

    const posts = data?.allPosts || {};

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
                <section className='posts-container'>
                <p className='username account-header explore-header'>Home</p>
                {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        posts.map((post) => (
                        <section className='item-container' key={post._id}>
                            <div className='feed-title'>
                                <div className='feed-propic'>
                                    <img className='inside-propic' alt='Pro Pic' src={post.propic}/>
                                </div>
                                <p>{post.username}</p>
                            </div>
                            <section className='feed-photo'>
                            <img className='inside-photo' alt='Pro Pic' src={post.photo}/>
                            </section>
                            <section>
                                <p className='light-text description'>{post.caption}</p>
                            </section>
                            <section className='feedback light-text'>
                                <div className='inter'>
                                    <img alt='Non Heart' className='icon' src={GrayHeart}/>
                                    <p>{post.likes}</p>
                                </div>
                                <div className='inter'>
                                    <img alt='Non Heart' className='icon' src={Comment}/>
                                    <p>{post.comments.length}</p>
                                </div>
                            </section>
                        </section>
                        ))
                    )}
                </section>
            </section>
        </motion.div>
    )
}

export default Home
