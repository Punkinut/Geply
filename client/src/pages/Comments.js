import React from 'react'
import { motion } from 'framer-motion'
import  { Link, Redirect, useParams } from 'react-router-dom'
import Auth from '../utils/auth';
import { onePost } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Arrow from '../images/left-arrow.svg'
import GrayButton from '../components/Tools/GrayButton';
import Guy from '../images/no-comments.svg'

function Comments() {
    const { id } = useParams();

    const { data, loading } = useQuery(onePost, {
        variables: { postId: id }
    });

    const comments = data?.onePost?.comments || {};
    
    if (!Auth.loggedIn()){
        return <Redirect to='/'/>
        }
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{duration: 1}}
        >
            <section className='page-container'>
                <section className='posts-container'>
                <Link to='/'><img className='icon left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <p className='create-post'>Comments</p>
                    {loading ? (
                        <section className='profile-search-load-container'>
                            <ThreeDotsWave/>
                        </section>
                    ) : (
                            <section className='comment-container'>
                                {comments[0] === undefined ? (
                                    <section className='explore-container'>
                                        <img alt='Person Icon' className='guy' src={Guy}/>
                                        <p className='light-text no-following'>Post has no comments...</p>
                                        <Link to='/'><GrayButton word="Home"/></Link>
                                    </section>
                                ) : (
                                    comments.map((comment) => (
                                        <section className='com' key={comment._id}>
                                            <div className='img-propic'>
                                                <img alt='' className='comment-pic' src={comment.propic}/>
                                            </div>
                                            <p className='real-comment light-text'>{comment.commentText}</p>
                                        </section>
                                    ))
                                )}
                                
                            </section>
                    )}
                    <section className='comment-nav'>
                        <form className='comment-form'>
                            <input className='light-text comment-input' placeholder='Add a comment...' type='text' required></input>
                            <button type='submit' className='comment-submit'></button>
                        </form>
                    </section>
                </section>
            </section>
        </motion.div>
    )
}

export default Comments
