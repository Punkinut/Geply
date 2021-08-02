import { motion } from 'framer-motion';
import React from 'react'
import  { Link, Redirect } from 'react-router-dom'
import Auth from '../utils/auth';
import Tag from '../images/price-tag.svg'
import Upload from '../images/upload.svg'
import Arrow from '../images/left-arrow.svg'

function EditProfile() {

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const getFile = async (e) => {
        const file = e.target.files[0]
        console.log(file)
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            const base64 = await toBase64(file);
            console.log(base64)
        } else {
            console.log('File Not Supported')
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
                            <input id='fileid' className='upload-file' type='file' onChange={getFile}/>
                            <img className='icon edit-icon' src={Upload} alt='Upload Icon'/>
                            <p>Icon</p>
                            <p className='light-text sub'>Upload</p>
                        </motion.div>
                    </section>
                    <motion.section whileHover={{scale: 0.9}} whileTap={{scale: 1}} onClick={Auth.logout} className='logout'>
                        <p>Log Out</p>
                    </motion.section>
                </section>
            </section>
        </motion.div>
    )
}

export default EditProfile
