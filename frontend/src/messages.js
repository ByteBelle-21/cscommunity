import './messages.css';
import './channels.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import TextareaAutosize from 'react-textarea-autosize';

function Messages(){
    return(
        <div className="messages">
           <div className='message-left-block'>
                <p className='fw-bold' style={{margin:'1vh'}}>Other Direct Messages</p>
                <hr></hr>
                <ListGroup as="ol" className='direct-messages'>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src="Group 301.png" 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">sdbv sdcjsdc </div>
                            <Link className='view-link'>View conversations</Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src="Group 301.png" 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">sdbv sdcjsdc </div>
                            <Link className='view-link'>View conversations</Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src="Group 301.png" 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">sdbv sdcjsdc </div>
                            <Link className='view-link'>View conversations</Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src="Group 301.png" 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">sdbv sdcjsdc </div>
                            <Link className='view-link'>View conversations</Link>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src="Group 301.png" 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">sdbv sdcjsdc </div>
                            <Link className='view-link'>ehfkh fb wh</Link>
                        </div>
                    </ListGroup.Item> 
                </ListGroup>

           </div>
           <div className='message-middle-block'>
               <div className='connected-user-logo-block'>
                    <Image  src="Group 301.png"  className="connected-user-img"  roundedCircle />
                    <div className='connected-user-name'>
                        <span className='fw-bold'>jsdh sdh sjh hb</span>
                        <span style={{fontSize:'small', opacity:'70%', fontWeight:'bold'}}>ByteBelle</span>
                    </div>
               </div>
               <div className='me-auto message-block'>
                    
               </div>
               <div className='textarea-block'>
                    <Link style={{color:'black', marginRight:'1vh', opacity:'70%'}}>
                        <span class="material-symbols-outlined">attach_file</span>
                    </Link> 
                    <TextareaAutosize placeholder="Add your message here"  className='text-area-formcontrol' />
                    <Link style={{color:'black', marginRight:'1vh', opacity:'70%'}}>
                        <span class="material-symbols-outlined">add_reaction</span>
                    </Link> 
                    <Link style={{color:'black', marginLeft:'1vh'}}>
                        <span class="material-symbols-outlined">send</span>
                    </Link> 
               </div>
           </div>
           <div className='message-right-block '>
                <ListGroup as="ol" className='connected-user-profile'>
                    <ListGroup.Item className='profile-item ' as="li">
                        <Image src="Group 301.png" className='profile-img' roundedCircle />
                        <p className='rfont' style={{margin:'0', fontWeight:'bold'}}>Nitya dfjhj shdfj</p>
                        <p style={{fontSize:'medium'}}>ByteBelle</p>
                        <p >Nitys is jhfjcherf hf fh f fejhfjhc sbsc jshd cbc sjd c hvsjd vbjdvbj vs vjh </p>
                    </ListGroup.Item>
                    <ListGroup.Item as="li"  className='social-media-item'>
                        <Stack direction='horizontal' gap={4}>
                            <Link >
                                <Image  src="facebook.png"  className="social-media-img"  roundedCircle />
                            </Link>
                            <Link>
                                <Image  src="instagram.png"  className="social-media-img"  roundedCircle />
                            </Link>
                            <Link>
                                <Image  src="linkedin.png"  className="social-media-img"  roundedCircle />
                            </Link>
                        </Stack>
                     
                    </ListGroup.Item>
                    <ListGroup.Item className='profile-skills-item' as="li">
                        <hr></hr>
                        <p  style={{marginTop:'0'}}>
                            • Total Connections : 
                            <span style={{fontWeight:'bold', marginLeft:'1vh'}}>6</span>
                        </p>
                        <p  style={{marginTop:'0'}}>
                            • Total Posts : 
                            <span style={{fontWeight:'bold' , marginLeft:'1vh'}}>6</span>
                        </p>
                        <p  style={{marginTop:'0'}}>
                            • Skill Set : 
                            <span style={{fontWeight:'bold' , marginLeft:'1vh'}}> 
                                hrnl. hbjh, hjsd, jhdgsdl , nsgd, sdvchgd, sjghdchd
                            </span>
                        </p>
                        <hr></hr>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className='activity-item'>
                        <p  style={{fontWeight:'bold' }}>Browse Tanya's posts</p>
                        <div className='activity-block'>
                            <ListGroup as="ol" className='activity-list'>
                                <ListGroup.Item as="li" className='activity-list-item'>
                                    <div className="fw-bold" style={{color:'#d84434'}}>sdbv sdcjsdc </div>
                                    <p style={{fontSize:'small'}} >erjhbgejhf ehrf jvef efhfefkve ergkerj ef erfer .....</p>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className='activity-list-item'>
                                    <div className="fw-bold" style={{color:'#d84434'}}>sdbv sdcjsdc </div>
                                    <p style={{fontSize:'small'}} >erjhbgejhf ehrf jvef efhfefkve ergkerj ef erfer .....</p>
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className='activity-list-item'>
                                    <div className="fw-bold" style={{color:'#d84434'}}>sdbv sdcjsdc </div>
                                    <p style={{fontSize:'small'}} >erjhbgejhf ehrf jvef efhfefkve ergkerj ef erfer .....</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                        
                    </ListGroup.Item>
                </ListGroup>
           </div>
        </div>
    );
}

export default Messages;