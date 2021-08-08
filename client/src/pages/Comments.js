import React, {useState} from 'react'
import { motion } from 'framer-motion'
import  { Link, Redirect, useParams } from 'react-router-dom'
import Auth from '../utils/auth';
import { GET_ME, onePost } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import Arrow from '../images/left-arrow.svg'
import GrayButton from '../components/Tools/GrayButton';
import Guy from '../images/no-comments.svg'
import Send from '../images/send.svg'
import { addComment } from '../utils/mutations';

function Comments() {

    const [comment, setComment] = useState('');
    const { id } = useParams();

    const [commentUpdate] = useMutation(addComment);

    const { data, loading } = useQuery(onePost, {
        variables: { postId: id }
    });

    const { data: dataB } = useQuery(GET_ME);

    const propic =  dataB?.me?.propic;

    const handleChange = (e) => {
        const { value } = e.target;
        setComment(value)
    }

    const postId = data?.onePost?._id;

    const handleSubmit = async (e) => {
        e.preventDefault()
        await commentUpdate({ variables: {postId, propic, comment}})
        setComment('')
    }

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
                        <form onSubmit={handleSubmit} className='comment-form'>
                            <input value={comment} onChange={handleChange} className='light-text comment-input' placeholder='Add a comment...' type='text' required></input>
                            <button type='submit' className='comment-submit'><img className='icon post-icon' alt='Send Icon' src={Send}/></button>
                        </form>
                    </section>
                </section>
            </section>
        </motion.div>
    )
}

export default Comments
