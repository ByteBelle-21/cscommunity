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
import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';




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
    const handleFileInput = (event) => {
        const inputFiles = event.target.files[0];
        if (inputFiles) {
            setInputFiles(prev =>[...prev,...Array.from(inputFiles)])
        }
      };
    

    const textAreaRef = useRef(null);
    const adjustHeight = ()=>{
        const textarea = textAreaRef.current;
        if (textarea){
            textarea.style.height = 'auto';
            const maxHeight =window.innerWidth * (5 / 100);
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;
        }

    }
    useEffect(() => {
        adjustHeight(); // Initial adjustment
        window.addEventListener('resize', adjustHeight); // Adjust on resize
        return () => window.removeEventListener('resize', adjustHeight); // Cleanup
    }, []);

    
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
                    <Container className='all-posts'>
                        wkjnrfgjehrfvbkwjhefkjwnhbdcjabfjnhdnfvjwb
                    </Container>   
                    <Form className='text-area horizontal-placement'>
                            <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput}/>
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showFileTooltip}>  
                                <Nav.Link><span className="material-icons" onClick={handleButtonClick}>add_circle</span></Nav.Link> 
                            </OverlayTrigger>
                            
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showEmojiTooltip}>
                                <Nav.Link><span className="material-icons">add_reaction</span></Nav.Link> 
                            </OverlayTrigger>
                            
                            <TextareaAutosize minRows={1.5} maxRows={3} placeholder="Add your post here" className='text-area-formcontrol' />
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 250 }} overlay={showSendTooltip}>
                                <Nav.Link><span className="material-icons">send</span></Nav.Link>
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
