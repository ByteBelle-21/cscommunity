import './messages.css';
import './channels.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import TextareaAutosize from 'react-textarea-autosize';
import { useParams } from 'react-router-dom';
import { fetchSelectedUserDetails, getUserDeatils } from './functions.js';
import Nav from 'react-bootstrap/Nav';
import { useRef } from 'react';
import Popover from 'react-bootstrap/Popover';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from 'axios';


function Messages(){
    const {selectedUser} =  useParams();

    const [connectedUserDetails, setConnectedUserDetails] = useState(null);
    const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);
    useEffect(()=>{
        fetchSelectedUserDetails(setConnectedUserDetails,selectedUser);
        getUserDeatils(setLoggedInUserDetails);
    },[selectedUser, ]);


    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchConnectedUsers= async()=>{
            try {
                const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/connectedusers',{ params: { user: current_user} });
                if (response.status === 200) {
                    setConnectedUsers(response.data);
                    console.log("Successfully retrieved all connected users");
                } 
                else {
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchConnectedUsers();  
    },[]);



    const fileMessageRef = useRef(null);
    const [inputMsgFiles, setInputMsgFiles] = useState([]);
   
    const handleMsgFileInput = (event) => {
        const files = event.target.files;
        if (files) {
            setInputMsgFiles(prev =>[...prev,...Array.from(files)]);
        }
    };
    const handleMsgFileDelete=(filename)=>{
        setInputMsgFiles((prev) => prev.filter((file) => file.name !== filename));
    }

    const msgtextAreaRef = useRef(null);
    const handleMsgEmojiSelect = (emoji) =>{
          const cursor = msgtextAreaRef.current.selectionStart;
          const newInput = inputMessage.slice(0,cursor) + emoji.native +inputMessage.slice(cursor);
          setInputMessage(newInput);
          msgtextAreaRef.current.setSelectionRange(cursor + emoji.native.length, cursor + emoji.native.length);
          msgtextAreaRef.current.focus();
    }
    const msgEmojiPopover = (
        <Popover id="popover-basic">
            <Picker data={data} onEmojiSelect={handleMsgEmojiSelect} />
        </Popover>
    );

    const [inputMessage, setInputMessage] = useState('');
    const handleInputChange = (e) =>{
        setInputMessage(e.target.value);
    }
    const handleSendMessage =async(e)=>{
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        const data = {
            you,
            reciever,
            inputMessage
            
        }
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/message', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                fetchAllMessages();
                setInputMessage(''); 
            } 
            else{
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }

    useEffect(()=>{
        fetchAllMessages();
    },[])

    const [allMessages, setAllMessages] = useState([]);
    const fetchAllMessages= async()=>{
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        try {
            const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/allMessages',
            { params: {loggedIn :you , connected:reciever }});
            if (response.status === 200) {
                setAllMessages(response.data);
                console.log("Successfully retrieved all messages");
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }

    }

    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }


    return(
        <div className="messages">
           <div className='message-left-block'>
                <p className='fw-bold' style={{margin:'1vh'}}>Other Direct Messages</p>
                <ListGroup as="ol" className='direct-messages'>
                {connectedUsers.length >0 && connectedUsers.map(user=>(
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start direct-message-item">
                        <div className="image-container">
                            <Image 
                                src={user.avatar} 
                                className="top-user-img" 
                                roundedCircle 
                            />
                        </div>
                        <div className="ms-2 me-auto">
                        <div className="fw-bold">{user.username}</div>
                            <Link className='view-link'>View conversations</Link>
                        </div>
                    </ListGroup.Item>
                ))}
                {connectedUsers.length === 0 &&
                    <ListGroup.Item  className="d-flex justify-content-center" style={{border:'none'}}>
                        <p style={{opacity:'0.5'}}>No messages </p>
                    </ListGroup.Item>
                }
                </ListGroup>

            </div>
            <div className='message-middle-block'>
                {connectedUserDetails ? 
                    <div className='connected-user-logo-block'>
                        <Image  src={connectedUserDetails.avatar}  className="connected-user-img"  roundedCircle />
                        <div className='connected-user-name'>
                            <span className='fw-bold'>{connectedUserDetails.name}</span>
                            <span style={{fontSize:'small', opacity:'70%', fontWeight:'bold'}}>{connectedUserDetails.username}</span>
                        </div>
                    </div> :<></> }
                <div className='message-block'>
                    {allMessages.length > 0 && allMessages.map(message=>(
                        message.reciever === loggedInUserDetails.id ?
                            (<div className='recieved-message'>
                                <Nav.Link >
                                    <img src={connectedUserDetails.avatar} style={{height:'1.5vw'}}></img>
                                    <strong style={{marginLeft:'1vw',opacity:'0.7'}} className='sfont'>{connectedUserDetails.username}</strong>    
                                </Nav.Link >
                                <div className='message sfont' >
                                    {message.message}
                                </div>
                            </div>  
                            ) 
                        :
                            (<div className='sent-message'>
                                <Nav.Link >
                                    <strong style={{marginRight:'1vw',opacity:'0.7'}} className='sfont'>You</strong> 
                                    <img src={loggedInUserDetails.avatar} style={{height:'1.5vw'}}></img>   
                                </Nav.Link >
                                <div className='message sfont' >
                                    {message.message}
                                </div>
                            </div>)
                    ))}
               </div>
               <div className='textarea-block'>
                    <input 
                        type='file' 
                        style={{ display: 'none' }}
                        ref={fileMessageRef}
                        onChange={handleMsgFileInput}
                    />
                    <Link style={{color:'black', marginRight:'1vh', opacity:'70%'}}  onClick={() => fileMessageRef.current.click()}>
                        <span class="material-symbols-outlined">attach_file</span>
                    </Link> 
                    <TextareaAutosize  
                        ref={msgtextAreaRef} 
                        placeholder="Add your message here"  
                        className='text-area-formcontrol' 
                        value={inputMessage}
                        onChange={handleInputChange}/>
                    <OverlayTrigger trigger="click" placement="top" overlay={msgEmojiPopover}>
                        <Link style={{color:'black', marginRight:'1vh', opacity:'70%'}} >
                            <span class="material-symbols-outlined">add_reaction</span>
                        </Link> 
                    </OverlayTrigger>
                    <Link style={{color:'black', marginLeft:'1vh'}} className='text-area-links' onClick={handleSendMessage}>
                        <span class="material-symbols-outlined" >send</span>
                    </Link> 
               </div>
           </div>
           <div className='message-right-block '>
                { connectedUserDetails ? 
                    <ListGroup as="ol" className='connected-user-profile'>
                        <ListGroup.Item className='profile-item ' as="li">
                            <Image src={connectedUserDetails.avatar} className='profile-img' roundedCircle />
                            <p className='rfont' style={{margin:'0', fontWeight:'bold'}}>{connectedUserDetails.name}</p>
                            <p style={{fontSize:'medium'}}>{connectedUserDetails.username}</p>
                            <p >Hello 👋 Nice to meet you. My name is {connectedUserDetails.name}. I am a {connectedUserDetails.occupation}!</p>
                        </ListGroup.Item>
                        <ListGroup.Item as="li"  className='social-media-item'>
                            <Stack direction='horizontal' gap={4}>
                                <Nav.Link >
                                    <Image  src="/facebook.png"  className="social-media-img"  roundedCircle />
                                </Nav.Link>
                                <Link>
                                    <Image  src="/instagram.png"  className="social-media-img"  roundedCircle />
                                </Link>
                                <Link>
                                    <Image  src="/linkedin.png"  className="social-media-img"  roundedCircle />
                                </Link>
                                <Link>
                                    <Image  src="/message.png"  className="social-media-img" roundedCircle />
                                </Link>
                            </Stack>
                        
                        </ListGroup.Item>
                        <ListGroup.Item className='profile-skills-item' as="li">
                            <hr></hr>
                            <p  style={{marginTop:'0'}}>
                                • Total Connections : 
                                <span style={{fontWeight:'bold', marginLeft:'1vh'}}>{connectedUserDetails.totalConnections}</span>
                            </p>
                            <p  style={{marginTop:'0'}}>
                                • Total Posts : 
                                <span style={{fontWeight:'bold' , marginLeft:'1vh'}}>{connectedUserDetails.totalPosts}</span>
                            </p>
                            <p  style={{marginTop:'0'}}>
                                • Skill Set : 
                                <span style={{fontWeight:'bold' , marginLeft:'1vh'}}> 
                                {connectedUserDetails.skills ? 
                                    (connectedUserDetails.skills.split(',').map((skill) => (
                                        <span className='each-skill' style={{marginRight:'1vh'}}>{skill.trim()} </span>
                                    )))
                                    : 
                                    <div>No skils avaialable</div>
                                }
                                </span>
                            </p>
                            <hr></hr>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" className='activity-item'>
                            <p  style={{fontWeight:'bold' }}>Browse {connectedUserDetails.name}'s posts</p>
                            <div className='activity-block'>
                                <ListGroup as="ol" className='activity-list'>
                                {connectedUserDetails.posts && connectedUserDetails.posts.length > 0 ? (connectedUserDetails.posts.map(post =>(
                                        <ListGroup.Item as="li" className='activity-list-item'>
                                            <div className="fw-bold" style={{color:'#d84434'}}>{post.channel}</div>
                                            <p style={{fontSize:'small'}} >{showPreview(post.post,10)}</p>
                                        </ListGroup.Item>
                                    )))
                                    : 
                                    (<ListGroup.Item as="li" className='activity-list-item'>
                                        <div >No activities yet</div>
                                    </ListGroup.Item>)}
                                </ListGroup>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>:<></>}
           </div>
        </div>
    );
}

export default Messages;