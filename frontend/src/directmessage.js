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

function DirectMessage ({removeAuthentication}) {
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
                const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//connectedusers',{ params: { user: current_user} });
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
                const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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
                const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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
    const handleUploadFile = async (message) =>{
        if (inputFiles.length === 0){
            return;
        }
        const formData = new FormData();
        formData.append('messageId',message)
        inputFiles.forEach((file)=>{
            formData.append('allFiles',file)
        });
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//fileupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setGotFiles(false);
                setInputFiles([]);
                console.log("Files uploaded successfully");
            }
        } catch (error) {
            console.error("Error while uploading files:", error);
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
          const newInput = inputMessage.slice(0,cursor) + emoji.native +inputMessage.slice(cursor);
          setInputMessage(newInput);
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


    const [inputMessage, setInputMessage] = useState('');
    const handleInputChange = (e) =>{
        setInputMessage(e.target.value);
    }
    const handleSendMessage =async(e)=>{
        e.preventDefault();
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        const data = {
            you,
            reciever,
            inputMessage
            
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//message', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                fetchAllMessages();
                setInputMessage('');
                handleUploadFile(response.data.messageId); 
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
    },[]);


    const [allMessages, setAllMessages] = useState([]);
    const fetchAllMessages= async()=>{
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//allMessages',
            { params: {loggedIn :you , connected:reciever }});
            if (response.status === 200) {
                setAllMessages(response.data);
                console.log(response.data);
                console.log("Successfully retrieved all messages");
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }

    }

    const [allFiles, setAllFiles] = useState([]);
    useEffect(()=>{
        const createURL = (fileData, fileType) =>{
            const processedData = new Uint8Array(fileData.data);
            const blob = new Blob([processedData], { type: fileType });
            
            return URL.createObjectURL(blob);
        }
        allMessages.forEach((message)=>{
            if (message.files && message.files.length > 0) {
                message.files.forEach(file => {
                    const fileURL = createURL(file.filedata, file.filetype);
                    console.log('File URL:', fileURL);
                    setAllFiles(prevFiles => ({
                        ...prevFiles,
                        [file.filename]: fileURL
                    }));
                });
            }
        })

    },[allMessages]);

    const handleRating = (likes, posts)=>{
        if (posts === 0){
            return "⭐️"
        }
        else if(likes/posts >= 5){
            return "⭐️⭐️⭐️⭐️⭐️"
        }
        else if(likes/posts >= 3 && likes/posts < 5){
            return "⭐️⭐️⭐️⭐️"
        }
        else if(likes/posts >= 1 && likes/posts < 3){
            return "⭐️⭐️⭐️"
        }
        else {
            return "⭐️⭐️"
        }
    }





    return (
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link  className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement' onClick={()=> navigateTo('/profile')}><img  src={loggedInUserDetails.avatar} style={{height:'1.5vw', marginRight:'0.1vw'}}/> {loggedInUserDetails.username}</Nav.Link>
               
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <Nav.Link className='mx-2' onClick={()=>navigateTo(-1)}><span className="material-icons" >keyboard_backspace</span></Nav.Link>
                <h6 className='me-auto '>Direct messages to {selectedUser}</h6>    
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container2'>
                    <h6>Direct Messages</h6>
                    <Container className=' direct-messages small-grid-container-child'>
                        {connectedUsers.length >0 && connectedUsers
                                .filter(user => user.username !== selectedUser)
                                .map(user=>(

                                <div className='child-blocks'>
                                    <Stack direction="horizontal" gap={3}>
                                        <img src={user.avatar}  style={{height:'2vw'}}/>
                                        <div className=' me-auto'>
                                            {user.username}
                                            <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                        </div>
                                        <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                                    </Stack>
                                </div>
                            ))}
                            {connectedUsers.length === 0 &&
                           
                                <p style={{opacity:'0.5'}}>No messages </p>
                      
                            }
                     </Container>    
                </Container>
                <Container className='large-grid-container'>
                    <div className='all-posts '>
                    {allMessages.length > 0 && allMessages.map(message=>(
                            message.reciever === loggedInUserDetails.id ?
                                (<div className='recieved-message'>
                                    <Nav.Link >
                                        <img src={selectedUserDetails.avatar} style={{height:'1.5vw'}}></img>
                                        <strong style={{fontSize:'0.8vw', marginLeft:'1vw',opacity:'0.7'}}>{selectedUserDetails.username}</strong>    
                                    </Nav.Link >
                                    <div className='message' >
                                       {message.message}
                                    </div>
                                    {message.files && message.files.length > 0 && ( 
                                        <div className='file-list'> 
                                            {message.files.map(file => (
                                               
                                            <Stack direction="horizontal" gap={1} className="post-file-card">
                                                <span className="material-icons" >description</span>
                                                <a href={allFiles[file.filename]} target="_blank" rel="noopener noreferrer">{file.filename}</a>
                                            </Stack>
                                            ))}
                                        </div>
                                    )}
                                </div>  
                                ) 
                            :
                                (<div className='sent-message'>
                                    <Nav.Link >
                                        <strong style={{fontSize:'0.8vw', marginRight:'1vw',opacity:'0.7'}}>You</strong> 
                                        <img src={loggedInUserDetails.avatar} style={{height:'1.5vw'}}></img>   
                                    </Nav.Link >
                                    <div className='message' >
                                        {message.message}
                                    </div>
                                    {message.files && message.files.length > 0 && ( 
                                        <div className='file-list'> 
                                            {message.files.map(file => (
                                               
                                            <Stack direction="horizontal" gap={1} className="post-file-card">
                                                <span className="material-icons" >description</span>
                                                <a href={allFiles[file.filename]} target="_blank" rel="noopener noreferrer">{file.filename}</a>
                                            </Stack>
                                            ))}
                                        </div>
                                    )}
                                </div>)
                            

                            ))}
                        
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
                                <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your message here" value={inputMessage} className='text-area-formcontrol' onChange={handleInputChange}/>
                            </div>  
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showSendTooltip}>
                                <Nav.Link className='textarea-icons'><span className="material-icons" onClick={handleSendMessage}>send</span></Nav.Link>
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
                        <p>Rating : {handleRating(selectedUserDetails.likes, selectedUserDetails.totalPosts)}</p>
                    </Container>
                    <Button onClick={goToProfile}>View Profile</Button>
                </Container>

            </div>

        </div>
    )

}

export default DirectMessage;