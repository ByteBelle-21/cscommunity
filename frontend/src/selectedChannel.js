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
import { useParams } from 'react-router-dom';



function SelectedChannel({removeAuthentication}){
    const {channelName} = useParams();
    const current_user = sessionStorage.getItem('auth_user');

    useEffect(()=>{
        fetchUserDetails();
        fetchConnectedUsers();
        fetchAllPosts();  
    },[]);


    const [userDetails, setUserDetails] = useState([]);
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


    const [connectedUsers, setConnectedUsers] = useState([]);
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



    const[allPosts, setAllPosts] = useState([])
    const fetchAllPosts= async()=>{
        const channel_name = decodeURIComponent(channelName);
        console.log("channel name is : ",channel_name);
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/allPosts',
            { params: {current_channel:channel_name}});
            if (response.status === 200) {
                setAllPosts(response.data);
                console.log("All posts: ",response.data);
                console.log("Successfully retrieved all posts for channel",channelName);
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }

    }

    

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
  



    const [replyTo, setReplyTo] = useState(null);
    const [replyToUser, setReplyToUser] = useState('');
    const [replyToPost, setReplyToPost] = useState('');
    const handleReplyClick = (Id, user, post) =>{
        setReplyTo(Id);
        setReplyToUser(user);
        const postPreview =  post.split(' ').slice(0, 10).join(' ')+ "..........";
        setReplyToPost(postPreview);
    }
    const handleCancelReply = ()=>{
        setReplyToUser('');
        setReplyTo(null);
        setReplyToPost('');
    }


     
    
    return(
        <div className='page-layout'>
            <Stack direction="horizontal" gap={3} className="navbar">
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{userDetails.username}</Nav.Link>
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto'>{channelName}</h6>
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
                    {allPosts.length ===0 && 
                        <Container className='all-posts vertical-placement'>
                            <p style={{fontSize:'0.9vw',opacity:0.5}}>No posts yet in this channel</p>
                        </Container>   
                    }
                    {allPosts.length > 0 && 
                        <Container className='all-posts '>
                            {allPosts.map(post=>(
                            <div className="post-div" style={{paddingLeft:`${post.level * 2.5}vw`}}>
                                <div className='post-sender'>
                                    <Nav.Link >
                                        <img src={post.avatar} style={{height:'1.5vw'}}></img>
                                        <strong style={{fontSize:'0.8vw', marginLeft:'1vw',opacity:'0.7'}}>{post.username}</strong>    
                                    </Nav.Link >
                                    <span style={{fontSize:'0.7vw',  marginLeft:'1vw'}}>{post.datetime}</span>
                                </div>
                                <div className='post-text' style={{paddingLeft:'2.5vw',fontSize:'0.87vw'}}>
                                    <span>{post.post}</span>
                                    <Stack direction="horizontal" gap={3} style={{ alignItems:'center',marginTop:'0.1vw'}}>
                                        <Nav.Link ><span className="material-icons" style={{fontSize:'0.85vw', color:'green'}} >thumb_up</span> Like</Nav.Link>
                                        <Nav.Link><span className="material-icons" style={{fontSize:'0.85vw', color:'red'}}  >thumb_down</span> Dislike</Nav.Link>
                                        <Nav.Link onClick={()=>handleReplyClick(post.id,post.username, post.post)} ><span className="material-icons" style={{fontSize:'0.9vw', color:'blue'}} >reply</span> Reply</Nav.Link>
                                    </Stack>
                                </div>
                            </div>
                        
                     ))}
                     </Container>}
                     {replyToUser && <div className='replyto-holder'>
                                <Nav.Link ><span className="material-icons reply-cancel" onClick={handleCancelReply}>close</span></Nav.Link>Reply to @{replyToUser}<span style={{marginLeft:'1vw'}}>{replyToPost}</span>
                    </div>}
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
                            <Nav.Link className='textarea-icons'><span className="material-icons" onClick={handleSendPost}>send</span></Nav.Link>
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
                                    <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
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
