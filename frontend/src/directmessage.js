import './homepage.css';
import './allChannels.css';
import './UniformStyle.css';
import './directmessage.css';
import './selectedChannel.css'
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import TextareaAutosize from 'react-textarea-autosize';

function DirectMessage () {
    const navigateTo = useNavigate()
    const {selectedUser} = useParams();
    
    const goToProfile=()=>{
        navigateTo('/profile')
    }

    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchConnectedUsers= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/connectedusers',{ params: { user: current_user} });
                if (response.status === 200) {
                    setConnectedUsers(response.data);
                    console.log("Successfully retrieved all connected users");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchConnectedUsers();  
    },[]);





    const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchUserDetails= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/user',{
                    params: {user: current_user}
                });
                if (response.status === 200) {
                    setLoggedInUserDetails(response.data[0]);
                    console.log("Successfully retrieved current user details");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchUserDetails();  
    },[]);


    const [selectedUserDetails, setselectedUserDetails] = useState([]);
    useEffect(()=>{
        const current_user = selectedUser;
        const fetchUserDetails= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/user',{
                    params: {user: current_user}
                });
                if (response.status === 200) {
                    setselectedUserDetails(response.data[0]);
                    console.log("Successfully retrieved current user details");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchUserDetails();  
    },[]);
    const showFileTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Upload file
        </Tooltip>
    );
    const fileRef = useRef(null);
    const handleButtonClick = () => {
        fileRef.current.click(); 
      };
    const [inputFiles, setInputFiles] = useState([]);
    const [gotFile, setGotFiles] = useState(false);
    const handleFileInput = (event) => {
        const files = event.target.files;
        if (files) {
            setGotFiles(true);
            setInputFiles(prev =>[...prev,...Array.from(files)]);
        }
    };
    const handleFileDelete=(filename)=>{
        setInputFiles((prev) => prev.filter((file) => file.name !== filename));
        if(inputFiles.length===0){
            setGotFiles(false);
        }
    }



    const showEmojiTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Add reaction
        </Tooltip>
    );
    const textAreaRef = useRef(null);
    const handleEmojiSelect = (emoji) =>{
          const cursor = textAreaRef.current.selectionStart;
          const newInput = inputPost.slice(0,cursor) + emoji.native +inputPost.slice(cursor);
          setInputPost(newInput);
          textAreaRef.current.setSelectionRange(cursor + emoji.native.length, cursor + emoji.native.length);
          textAreaRef.current.focus();
    }
    const emojiPopover = (
        <Popover id="popover-basic">
          <Popover.Body>
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </Popover.Body>
        </Popover>
    );
    



    
    const showSendTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Send
        </Tooltip>
      );
    const [inputPost, setInputPost] = useState('');
    const handleInputChange = (e) =>{
        setInputPost(e.target.value);
    }
    const handleSendPost =async(e)=>{
        e.preventDefault();
        const current_user = sessionStorage.getItem('auth_user');
        const channel = decodeURIComponent(channelName);
        console.log(replyTo);
        const data = {
            current_user,
            inputPost,
            channel,
            replyTo
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/post', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                fetchUserDetails();
                fetchAllPosts();
                setReplyTo(null);
                setReplyToUser('');
                setInputPost(''); 
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }
  

    useEffect(()=>{
        fetchAllMessages();
    })


    const [allMessages, setAllMessages] = useState([]);
    const fetchAllMessages= async()=>{
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/allMessages',
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







    return (
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link  className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>Profile</Nav.Link>
                <Nav.Link href="#" >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto '>Direct messages to {selectedUser}</h6>    
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container2'>
                    <h6>Direct Messages</h6>
                    {connectedUsers.length >0 && connectedUsers.map(user=>(
                            <Container className=' direct-messages small-grid-container-child'>
                            <div className='child-blocks'>
                                <Stack direction="horizontal" gap={3}>
                                    <img src={user.avatar}  style={{height:'2vw'}}/>
                                    <div className=' me-auto'>
                                        {user.username}
                                        <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                    </div>
                                    <Nav.Link style={{fontSize:'small'}} onClick={showConversation}>View Conversation</Nav.Link>
                                </Stack>
                            </div>
                            </Container>
                        ))}
                        {connectedUsers.length === 0 &&
                            <Container className=' direct-messages small-grid-container-child vertical-placement'>
                                <p style={{opacity:'0.5'}}>No messages </p>
                            </Container>
                        }
                            
                            
                       
                </Container>
                <Container className='large-grid-container'>
                    <div className='all-posts '>
                        <div className='sent-message'>
                            <Nav.Link >
                                <strong style={{fontSize:'0.8vw', marginRight:'1vw',opacity:'0.7'}}>You</strong> 
                                <img src={loggedInUserDetails.avatar} style={{height:'1.5vw'}}></img>   
                            </Nav.Link >
                            <div className='message' >
                                hwfd jhwbjfhwjhefjwhefxnhfjehfj rfhejhf jehfj jhfejhf vejhfvehveh fjeh vfjhfjhhf jh jw hfjhwfjk wjh wkfjwh fjhf jhfj grjh fjhf jrh fjh jhjh jh jhbr jfhekjhfb fkjebfmfj hwjebfhcgjwehfjwhebjf
                            </div>
                        </div>
                        <div className='recieved-message'>
                            <Nav.Link >
                                <img src={selectedUserDetails.avatar} style={{height:'1.5vw'}}></img>
                                <strong style={{fontSize:'0.8vw', marginLeft:'1vw',opacity:'0.7'}}>{selectedUserDetails.username}</strong>    
                            </Nav.Link >
                            <div className='message' >
                                hwfd jhwbjfhwjhefjwhefxnhfjehfj rfhejhf jehfj jhfejhf vejhfvehveh fjeh vfjhfjhhf jh jw hfjhwfjk wjh wkfjwh fjhf jhfj grjh fjhf jrh fjh jhjh jh jhbr jfhekjhfb fkjebfmfj hwjebfhcgjwehfjwhebjf
                            </div>
                        </div>
                        
                    </div>


                    <Form className='text-area horizontal-placement'>
                            <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput}/>
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showFileTooltip}>  
                                <Nav.Link className='textarea-icons'><span className="material-icons" onClick={handleButtonClick}>attach_file</span></Nav.Link> 
                            </OverlayTrigger>
                            <OverlayTrigger trigger="click" placement="top" overlay={emojiPopover} >
                                <Nav.Link className='textarea-icons'><span className="material-icons">add_reaction</span></Nav.Link> 
                            </OverlayTrigger>
                            <div className='content-holder vertical-placement'>
                                {gotFile && <div className='filePlaceholders'>
                                    {inputFiles.map(file =>(
                                    <Stack direction="horizontal" gap={1} className="file-card">
                                        <span className="material-icons" >description</span>
                                        <div className='me-auto' style={{fontSize:'0.9vw'}}>{file.name}</div>
                                        <Nav.Link  onClick={()=>handleFileDelete(file.name)}> <span className="material-icons" >delete</span></Nav.Link>
                                    </Stack>))}
                                </div>}
                                <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your message here" value={inputPost} className='text-area-formcontrol' onChange={handleInputChange}/>
                            </div>  
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showSendTooltip}>
                                <Nav.Link className='textarea-icons'><span className="material-icons" onClick={handleSendPost}>send</span></Nav.Link>
                            </OverlayTrigger>

                                
                        </Form>
                </Container>
                <Container className=' small-grid-container1 connected-user-profile'>
                    <img src={selectedUserDetails.avatar}  style={{height:'6vw'}}/>
                    <strong className='mt-2'>{selectedUserDetails.name}</strong>
                    <p style={{fontSize:'0.9vw'}}>{selectedUserDetails.username}</p>
                    <Container className='user-info'>
                        <p>Occupation : {selectedUserDetails.occupation}</p>
                        <p>Total Posts : {selectedUserDetails.totalPosts}</p>
                        <p>Rating : ⭐⭐⭐⭐</p>
                    </Container>
                    <Button onClick={goToProfile}>View Profile</Button>
                </Container>

            </div>

        </div>
    )

}

export default DirectMessage;