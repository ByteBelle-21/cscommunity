import './channels.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import { getUserDeatils, getAllChannels, handleChannelCreation } from './functions.js';

function Channels(){
    const navigateTo = useNavigate()

    const[showChannelModal, setShowChannnelModal] = useState(false);
    const openChannelModal = ()=>{
        setShowChannnelModal(true);
    }

    const closeChannelModal = ()=>{
        setShowChannnelModal(false);
    }


    const[showPostModal, setShowPostModal] = useState(false);
    const openPostModal = ()=>{
        setShowPostModal(true);
    }

    const closePostModal = ()=>{
        setShowPostModal(false);
    }

    const[showOffCanvas, setShowOffCanvas] = useState(false);
    const openOffCanvas = ()=>{
        setShowOffCanvas(true);
    }

    const closeOffCanvas = ()=>{
        setShowOffCanvas(false);
    }

    const [userDetails, setUserDetails] = useState([]);
     useEffect(()=>{
        getUserDeatils(setUserDetails);  
    },[]);


    const [fetchAgain, setFetchAgain] = useState(false);
    const [channel, setChannel] = useState('');
    const createChannel = ()=>{
        closeChannelModal();
        const username = userDetails.username;
        const data = { username,channel };
        handleChannelCreation(setFetchAgain,fetchAgain, data);  
    }


    const [allChannels, setAllChannels] = useState([]);
    useEffect(()=>{
        getAllChannels(setAllChannels);  
    },[fetchAgain]);


    const[selectedChannel, setSelectedChannel] = useState('');

    return(
        <div className="channels">
           <div className='left-block'>
                <Button className='add-channel-btn' onClick={openChannelModal}>
                    <span class="material-symbols-outlined"> add</span> 
                    New Channel
                </Button>
                <Modal 
                    size="md" 
                    show={showChannelModal} 
                    onHide={closeChannelModal}
                    centered>
                    <Modal.Body>
                        <p className='mfont create-channel-title' >
                            <span class="material-symbols-outlined" style={{fontSize:'1.5vw', marginRight:'0.5vh'}}>rocket_launch</span>
                            Create Your Own Channel
                        </p>
                        <Form.Group controlId="signup-username" >
                            <Form.Label>Channel Name</Form.Label>
                            <Form.Control  type="text" 
                                            required
                                            placeholder="Enter name" 
                                            className='mb-3 ' 
                                            onChange={(e) => {setChannel(e.target.value)}}
                                            style={{fontSize:'calc(0.4em + 1vmin)'}}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                    <Button className='cancle-channel-btn' onClick={closeChannelModal}>
                        Cancle
                    </Button>
                    <Button className='create-channel-btn' onClick={createChannel}>
                        Create
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className='channel-list'>
                    <p>All Channels</p>
                    <ListGroup as="ol" >
                        {allChannels.length > 0 && allChannels.map(channel=>(
                             <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start" >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{channel.channel}</div>
                                    <span style={{fontSize:'small'}}>Created by {channel.username}</span>
                                </div>
                                <Badge className='badge'pill>{channel.totalposts}</Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
           </div>
           <div className='middle-block'>
                <div className='create-post-block'>
                    <h4>{selectedChannel == '' ? "Homepage" : selectedChannel}</h4>
                        <Button className='new-post-btn' onClick={openPostModal}>
                            <span class="material-symbols-outlined" style={{marginRight:'1vh'}}> add</span> 
                            <p style={{margin:'0'}} className='fw-bold'>What's on your mind ?</p>
                        </Button>
                    <Modal 
                    size="md" 
                    backdrop="static"
                    show={showPostModal} 
                    onHide={closePostModal}
                    centered>
                        <Modal.Body>
                            <p className='mfont create-channel-title' >
                                <span class="material-symbols-outlined" style={{fontSize:'1.5vw', marginRight:'0.5vh'}}>mail</span>
                                Create a new post
                            </p>
                            <p><span className='fw-bold'>Channel :</span> java discussion board</p>
                            <Form.Group >
                                <Form.Label>Title</Form.Label>
                                <Form.Control  type="text" 
                                                required
                                                placeholder="Enter title" 
                                                className='mb-3 ' 
                                                style={{fontSize:'calc(0.4em + 1vmin)'}}/>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label style={{display:'flex', flexDirection:'row'}}>
                                    <span className='me-auto'>Overview</span> 
                                    
                                    <Link>
                                        <span class="material-symbols-outlined">add_reaction</span>
                                    </Link>                                
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Write the overview here"
                                    style={{height:'15vh'}}
                                    className='mb-3 ' />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" >
                                <Form.Label>Attachments</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                            <Button className='cancle-channel-btn' onClick={closePostModal}>
                                Cancle
                            </Button>
                            <Button className='create-channel-btn' onClick={closePostModal}>
                                Add new post
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='no_channel'>
                        <h5 style={{fontWeight:'bold'}}>Welcome to CScommunity</h5>
                        <p>Start engaging with other members by creating channels, posting, replying, and now... messaging!</p>
                        <ul>
                            <li><strong>Create a new channel:</strong> Start a fresh topic!</li>
                            <li><strong>Add a new post:</strong> Share your thoughts in any of the channels.</li>
                            <li><strong>Reply to posts:</strong> Join in and keep the conversation alive!</li>
                            <li><strong>Send direct messages:</strong> Want to talk privately? Send a direct message.</li>
                        </ul>
                        <p style={{fontWeight:'bold'}}>Start Browsing Now</p>
                </div>
           </div>
           <div className='right-block'>
                <ListGroup as="ol" className='profile-list'>
                    <ListGroup.Item className='list-item first-item' as="li">
                        <Image src="Group 301.png" className='profile-img' roundedCircle />
                        <p className='rfont' style={{margin:'0', fontWeight:'bold'}}>{userDetails.name}</p>
                        <p style={{margin:'0'}}>{userDetails.username}</p>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className='list-item' >
                        <p style={{margin:'0'}}>Total Posts</p>
                        <p style={{margin:'0' , fontWeight:'bold'}}>{userDetails.totalPosts}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='list-item' as="li">
                        <p style={{margin:'0'}}>Total Connections</p>
                        <p style={{margin:'0', fontWeight:'bold'}}>{userDetails.totalConnections}</p>
                    </ListGroup.Item>
                    <ListGroup.Item className='list-item' as="li">
                        <Link className='profile-link' onClick={()=> navigateTo('/profile')}>View Profile</Link>
                    </ListGroup.Item>
                </ListGroup>
                <div className='suggestions'>
                    <ListGroup as="ol" className='suggestions-list'>
                        <ListGroup.Item className='suggestion-item' as="li">
                            <div className="fw-bold">Top Profiles</div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start suggestion-item">
                            <div className="image-container">
                                <Image 
                                    src="Group 301.png" 
                                    className="top-user-img" 
                                    roundedCircle 
                                />
                            </div>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">sdbv sdcjsdc </div>
                                <Link className='view-link'>View Profile</Link>
                            </div>
                            <Link><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>chat_bubble</span></Link>  
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start suggestion-item">
                            <div className="image-container">
                                <Image 
                                    src="Group 301.png" 
                                    className="top-user-img" 
                                    roundedCircle 
                                />
                            </div>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">sdbv sdcjsdc </div>
                                <Link className='view-link'>View Profile</Link>
                            </div>
                            <Link><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>chat_bubble</span></Link>  
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start suggestion-item">
                            <div className="image-container">
                                <Image 
                                    src="Group 301.png" 
                                    className="top-user-img" 
                                    roundedCircle 
                                />
                            </div>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">sdbv sdcjsdc </div>
                                <Link className='view-link'>View Profile</Link>
                            </div>
                            <Link><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>chat_bubble</span></Link>  
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start suggestion-item">
                            <div className="image-container">
                                <Image 
                                    src="Group 301.png" 
                                    className="top-user-img" 
                                    roundedCircle 
                                />
                            </div>
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">sdbv sdcjsdc </div>
                                <Link className='view-link' onClick={openOffCanvas}>View Profile</Link>
                            </div>
                            <Link><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>chat_bubble</span></Link>
                        </ListGroup.Item>
                    </ListGroup>
                    <Offcanvas 
                        show={showOffCanvas} 
                        onHide={closeOffCanvas} 
                        placement='end' 
                        name='Enable both scrolling & backdrop'
                        className='offcanvas-block'>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='fw-bold'>User Profile</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
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
                        </Offcanvas.Body>
                    </Offcanvas>

                </div>
               
                
           </div>
        </div>
    );
}

export default Channels;