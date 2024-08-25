import './homepage.css';
import './allChannels.css';
import './UniformStyle.css'
import './selectedChannel.css'
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';



function SelectedChannel(){
    const [userDetails, setUserDetails] = useState([]);

    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchUserDetails= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/user',{
                    params: {user: current_user}
                });
                if (response.status === 200) {
                    setUserDetails(response.data[0]);
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


    const showFileTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Upload file
        </Tooltip>
      );

    const showSendTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Send
        </Tooltip>
      );

    const showEmojiTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} className='tooltip'>
          Add reaction
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

      const [inputPost, setInputPost] = useState('');
      const handleInputChange = (e) =>{
          setInputPost(e.target.value);
      }
  

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




    
    const handleSendPost =async(e)=>{
        e.preventDefault();
        const current_user = sessionStorage.getItem('auth_user');
        const channel = decodeURIComponent(channelName);
        const data = {
            current_user,
            inputPost,
            channel
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/post', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully")  
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }



    
    
    return(
        <div className='page-layout'>
            <Stack direction="horizontal" gap={3} className="navbar">
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{userDetails.username}</Nav.Link>
                <Nav.Link href="#" >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto'>Selected Channel</h6>
                <div className='search-container horizontal-placement'>
                    <span className="material-icons">search</span> Search  
                    <Form className='horizontal-placement ms-4'> 
                        <Form.Select aria-label="Search by" className='search-bar'>
                            <option >Search by</option>
                            <option value="people">People</option>
                            <option value="post">Post</option>
                        </Form.Select>   
                        <Form.Control placeholder="people or post" className='search-bar'/>
                    </Form> 
                </div>       
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container1'>
                    <Container className=' profile' >
                        <img  src={userDetails.avatar}  style={{height:'5vw'}}/> 
                        <p style={{fontSize:'0.8vw'}}>{userDetails.username}</p>
                        <p style={{fontSize:'1vw'}} >{userDetails.name}</p>
                        <div className='horizontal-placement'>
                            <div className='mx-2 vertical-placement'>
                                {userDetails.totalPosts}
                                <p style={{fontSize:'0.8vw'}}>Posts</p>
                            </div>
                            <div className='mx-2 vertical-placement'>
                                {userDetails.likes}
                                <p style={{fontSize:'0.8vw'}}>Likes</p>
                            </div>
                        </div>
                        <Button>My Profile</Button>
                    </Container>
                    
                </Container>
                <Container className='large-grid-container middle-container '>
                    <Container className='all-posts vertical-placement'>
                        <p style={{fontSize:'0.9vw',opacity:0.5}}>No posts yet in this channel</p>
                    </Container>   
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
                            <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your post here" value={inputPost} className='text-area-formcontrol' onChange={handleInputChange}/>
                        </div>  
                        <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showSendTooltip}>
                            <Nav.Link className='textarea-icons' onClick={()=>handleSendPost}><span className="material-icons">send</span></Nav.Link>
                        </OverlayTrigger>

                            
                    </Form>
                </Container>
                <Container className='small-grid-container2' >  
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
                   <h6>Suggested Channels for you</h6>
                   <Container className='small-grid-container-child'>
                        
                   </Container>       
                </Container>
               
                
            </div>
        </div>

    )
}

export default SelectedChannel;
