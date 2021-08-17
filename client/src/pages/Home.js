import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect } from 'react-router-dom'
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Auth from '../utils/auth';
import { allPosts, GET_ME } from '../utils/queries';
import GrayHeart from '../images/gray-heart.svg'
import RedHeart from '../images/red-heart.svg'
import Comment from '../images/comment.svg'
import { addLike, removeLike } from '../utils/mutations';

function Home() {

    const { data, loading } = useQuery(allPosts, {
        fetchPolicy: 'network-only',
        pollInterval: 500
    });

    const [like] = useMutation(addLike);
    const [unlike] = useMutation(removeLike);

    const { data: dataB } = useQuery(GET_ME);
    const yourID = dataB?.me?._id || {};

    const posts = data?.allPosts || {};

    const plusLike = async (e) => {
        const postId = e.target.id
        await like({ variables: {postId}})
    };

    const minusLike = async (e) => {
        const postId = e.target.id
        await unlike({ variables: {postId}})
    };

    const onImgLoad = (e) => {
        const height = e.target.offsetHeight;
        if (height < 300) {
            e.target.className = 'height-photo'
        }
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
                                    {post.propic === '#' ? (
                                        <p className='light-text'>{post.username[0].toUpperCase()}</p>
                                    ) : (
                                        <img className='inside-propic' alt='Pro Pic' src={post.propic}/>
                                    )}
                                    
                                </div>
                                <p>{post.username}</p>
                            </div>
                            <section className='feed-photo'>
                                <img className='inside-photo' alt='Icon Pic' onLoad={onImgLoad} src={post.photo}/>
                            </section>
                            <section>
                                <p className='light-text description'>{post.caption}</p>
                            </section>
                            <section className='feedback light-text'>
                                <div className='inter'>
                                    {post?.likes?.some(like => like._id === yourID) ? (
                                        <>
                                        <motion.img whileHover={{scale: 1.1}} alt='Non Heart' onClick={minusLike} id={post._id} className='normal-icon' src={RedHeart}/>
                                        <p>{post?.likes?.length}</p>
                                        </>
                                        
                                    ) : (
                                        <>
                                        <motion.img whileHover={{scale: 1.1}} alt='Non Heart' onClick={plusLike} id={post._id} className='icon' src={GrayHeart}/>
                                        <p>{post?.likes?.length}</p>
                                        </>
                                    )}
                                </div>
                                <div className='inter'>
                                    <Link to={`/comments/${post._id}`}>
                                    <motion.img whileHover={{scale: 1.1}} alt='Non Heart' className='icon' src={Comment}/>
                                    </Link>
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
