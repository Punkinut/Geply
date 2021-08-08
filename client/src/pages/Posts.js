import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  {Link, Redirect, useParams } from 'react-router-dom'
import GrayButton from '../components/Tools/GrayButton';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Auth from '../utils/auth';
import { userPosts } from '../utils/queries';
import Gal from '../images/post.svg'

function Posts() {
    const { id } = useParams();
    const { data, loading } = useQuery(userPosts, {
        fetchPolicy: 'network-only',
        variables: { id }
    });


    const posts = data?.userPosts || {};



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
                <p className='username account-header explore-header'>Posts</p>
                {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                        posts[0] === undefined ? (
                            <section className='explore-container'>
                                <img alt='Person Icon' className='guy' src={Gal}/>
                                <p className='light-text no-following'>Post has no comments...</p>
                                <Link to='/'><GrayButton word="Home"/></Link>
                            </section>
                        ) : (
                            posts.map((post) => (
                                <section className='item-container' key={post._id}>
                                    <section className='feed-photo'>
                                    <img className='inside-photo' alt='Icon Pic' src={post.photo}/>
                                    </section>
                                    <section className='new-des'>
                                        <p className='light-text '>{post.caption}</p>
                                    </section>
                                </section>
                                ))
                        )
                    )}
                </section>
            </section>
        </motion.div>
    )
}

export default Posts
