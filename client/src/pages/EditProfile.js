import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';
import Tag from '../images/price-tag.svg'
import Upload from '../images/upload.svg'
import Arrow from '../images/left-arrow.svg'
import axios from "axios";
import { useMutation } from '@apollo/client';
import { OFFLINE, s3SignMutation, updateIcon } from '../utils/mutations';

function EditProfile() {

    const [s3Sign] = useMutation(s3SignMutation);
    const [iconUpdate] = useMutation(updateIcon);
    const [sendOffline] = useMutation(OFFLINE);
    const uploadToS3 = async (file, signedRequest) => {
        const options = {
          headers: {
            "Content-Type": file.type,
          }
        };
        await axios.put(signedRequest, file, options);
      };

    const getFile = async (e) => {
        const file = e.target.files[0]
        const response = await s3Sign({
            variables: {
                filename: file.name,
                filetype: file.type
            }
        });

        const { signedRequest, url } = response.data.signS3;
        await uploadToS3(file, signedRequest);
        await iconUpdate({ variables: {url}});
    }

    const logoutUser = async () => {
        await sendOffline();
        Auth.logout();
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
                <section className='edit-container'>
                    <Link to='/profile'><img className='icon left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <p className='username account-header'>Account</p>
                    <section className='choice-container'>
                        <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 1}} className='choice'>
                            <img className='icon edit-icon' src={Tag} alt='Bio Icon'/>
                            <p>Bio</p>
                            <p className='light-text sub'>About You</p>
                        </motion.div>
                        <motion.div whileHover={{scale: 0.9}} whileTap={{scale: 1}} className='choice'>
                            <input id='fileid' className='upload-file' type='file' accept="image/png, image/jpeg" onChange={getFile}/>
                            <img className='icon edit-icon' src={Upload} alt='Upload Icon'/>
                            <p>Icon</p>
                            <p className='light-text sub'>Upload</p>
                        </motion.div>
                    </section>
                    <motion.section whileHover={{scale: 0.9}} whileTap={{scale: 1}} onClick={logoutUser} className='logout'>
                        <p>Log Out</p>
                    </motion.section>
                </section>
            </section>
        </motion.div>
    )
}

export default EditProfile
