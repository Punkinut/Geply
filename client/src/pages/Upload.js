import { motion } from 'framer-motion';
import React, {useState} from 'react'
import  { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';
import Arrow from '../images/left-arrow.svg'
import Send from '../images/send.svg'

function Upload() {
    const [ file, setFile ] = useState('');
    const [ caption, setCaption ] = useState('');
    const [ hasUpload, setHasUploaded ] = useState(false);

    const uploadFile = (e) => {
        setFile(e.target.files[0])
        setHasUploaded(true)
    };

    const uploadCaption = (e) => {
        const { value } = e.target;
        setCaption(value);
    };

    const sumbmitUpload = (e) => {
        e.preventDefault();
        console.log(file, caption)
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
                <section className='upload-container'>
                <Link to='/profile'><img className='icon left-arrow' src={Arrow} alt='Arrow Icon'/></Link>
                    <p className='create-post'>Create Post</p>
                    <form className='upload-form' onSubmit={sumbmitUpload}>
                        {hasUpload ? (
                            <motion.button className='gray-button' whileTap={{scale: 0.9}} whileHover={{scale: 1.08}}>
                                Uploaded
                                <input className='content-upload' id='fileid' type='file' accept="image/png, image/jpeg" onChange={uploadFile} required/>
                            </motion.button>
                        ) : (
                            <motion.button className='wide-button' whileTap={{scale: 0.9}} whileHover={{scale: 1.08}}>
                                Upload
                                <input className='content-upload' id='fileid' type='file' accept="image/png, image/jpeg" onChange={uploadFile} required/>
                            </motion.button>
                        )}
                        <textarea className='caption-input light-text' placeholder='Add a caption...' maxLength='40' type='text' onChange={uploadCaption} required></textarea>
                        <button type='submit' className='final-post'><img className='icon post-icon' alt='Send Icon' src={Send}/></button>
                    </form>
                    
                </section>
            </section>
        </motion.div>
    )
}

export default Upload
