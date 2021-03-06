import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect, useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import GrayButton from '../components/Tools/GrayButton';
import ThreeDotsWave from '../components/Tools/ThreeDotsWave';
import WideButton from '../components/Tools/WideButton';
import Auth from '../utils/auth';
import { addFollowing, createConversation, removeFollowing } from '../utils/mutations';
import { getConversations, GET_ME, singleUser } from '../utils/queries';

function User() {
    const { id } = useParams();
    const history = useHistory();

    const [follow] = useMutation(addFollowing);
    const [unfollow] = useMutation(removeFollowing);
    const [message] = useMutation(createConversation);


    const { loading, data } = useQuery(singleUser, {
        variables: { id }
    });
    const { data: dataB } = useQuery(GET_ME);

    const { data: convoData } = useQuery(getConversations);

    const conversations = convoData?.getConversations || [];

    

    const profile = data?.singleUser || {};
    const yourProfile = dataB?.me?._id || {};
 
    const plusFollow = async () => {
        await follow({ variables: {id}})
    };

    const minusFollow = async () => {
        await unfollow({ variables: {id}})
    };

    const createConvo = async () => {
        const newConvo = await message({ variables: {id}})
        const convoId = newConvo?.data?.createConversation?._id;
        history.replace(`/message/${convoId}`)
    }

    const newMessage = async () => {
        let idList = [];
        await conversations.map((convo) => (
           convo?.members.map((mem) => (
               idList.push(mem._id)
           ))
        ));
        if(idList.includes(id)) {
            history.replace(`/chat`)
        } else {
            createConvo();
        }
    }

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
                    {profile.followers?.length === 1 ? (
                        <p className='friends'>{`${profile.followers?.length} Follower`}</p>
                    ) : (
                        <p className='friends'>{`${profile.followers?.length} Followers`}</p>
                    )}
                    <p className='bio'>{profile.bio}</p>
                    <motion.div className='button-container'>
                            {profile?.followers?.some(user => user._id === yourProfile) ? (
                                    <div onClick={minusFollow}><GrayButton word="Unfollow"/></div>
                            ) : (
                                    <div onClick={plusFollow}><WideButton word="Follow"/></div>
                            )}
                        <div onClick={newMessage}><GrayButton word="Message"/></div>
                        <Link to={`/posts/${profile._id}`}><GrayButton word="Posts"/></Link>
                    </motion.div>
                </section>
                )}
            </section>
        </motion.div>
    )
}

export default User
