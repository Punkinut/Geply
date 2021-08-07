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

    console.log(posts)
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
                        <section className='item-container'>
                            <div className='feed-title'>
                                <div className='feed-propic'>

                                </div>
                                <p>Jeff Becker</p>
                            </div>
                            <section className='feed-photo'>
                                
                            </section>
                            <section>
                                <p className='light-text description'>Today I went to an awesome park and had fun</p>
                            </section>
                            <section className='feedback light-text'>
                                <div className='inter'>
                                    <img alt='Non Heart' className='icon' src={GrayHeart}/>
                                    <p>1</p>
                                </div>
                                <div className='inter'>
                                    <img alt='Non Heart' className='icon' src={Comment}/>
                                    <p>1</p>
                                </div>
                            </section>
                        </section>
                    )}
                </section>
            </section>
        </motion.div>
    )
}

export default Home
