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
import { useNavigate,useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import axios from 'axios';
import { getUserDeatils, getAllChannels, handleChannelCreation,getActiveUsers,SelectedUserDetailsCanvas } from './functions.js';

function Channels(){
    const navigateTo = useNavigate();
    const location = useLocation();
    const channelsPage = location.pathname === '/channels';

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
        fetchAllPosts();   
    },[channelsPage]);

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


    const [activeMembers, setActiveMembers] = useState([]);
    useEffect(()=>{
        getActiveUsers(setActiveMembers);  
    },[channelsPage]);


    const[selectedChannel, setSelectedChannel] = useState('');
    const[postComments, setPostComments] = useState(0);
    const[postReply, setPostReply] = useState(0);
    
    const [replyTo, setReplyTo] = useState(null);
    const [replyToPost, setReplyToPost] = useState('');

    const handleReplyClick = (Id, post) =>{
        setPostReply(Id);
        setReplyTo(Id);
        const postPreview = "  "+post.split(' ').slice(0, 10).join(' ')+ "..........";
        setReplyToPost(postPreview);
    }

    const handleCancelReply = ()=>{
        setPostReply(0);
        setReplyTo(null);
        setReplyToPost('');
    }

    const [inputPostTitle, setInputPostTitle] = useState('');
    const handleTitleChange = (e) =>{
        setInputPostTitle(e.target.value);
    }

    const [inputPost, setInputPost] = useState('');
    const handleInputChange = (e) =>{
        setInputPost(e.target.value);
    }


    const fileRef = useRef(null);
    const [inputFiles, setInputFiles] = useState([]);
    const handleFileInput = (event) => {
        const files = event.target.files;
        if (files) {
            setInputFiles(prev =>[...prev,...Array.from(files)]);
        }
        console.log(inputFiles.length);
    };

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
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </Popover>
    );
    
    const handleSendPost =async(e)=>{
        const current_user = sessionStorage.getItem('auth_user');
        const channel = selectedChannel;
        console.log(replyTo);
        const data = {
            current_user,
            inputPostTitle,
            inputPost,
            channel,
            replyTo
        }
       
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/post', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                setPostReply(0)
                setReplyTo(null);
                setInputPost('');
                fetchAllPosts();
                handleUploadFile(response.data.postId); 
                closePostModal();
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }
    


    const handleUploadFile = async (post) =>{
        if (inputFiles.length === 0){
            return;
        }
        const formData = new FormData();
        formData.append('postId',post)
        inputFiles.forEach((file)=>{
            formData.append('allFiles',file)
        });
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/fileupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setInputFiles([]);
                console.log("Files uploaded successfully");
            }
        } catch (error) {
            console.error("Error while uploading files:", error);
        }
    }

    const[allPosts, setAllPosts] = useState([])
    const fetchAllPosts= async()=>{
        const channel_name = selectedChannel;
        if(channel_name == ""){
            return;
        }
        try {
            const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/allPosts',
            { params: {current_channel:channel_name}});
            if (response.status === 200) {
                setAllPosts(response.data);
                console.log("All posts: ",response.data);
                console.log("Successfully retrieved all posts for channel",channel_name);
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
        allPosts.forEach((post)=>{
            if (post.files && post.files.length > 0) {
                post.files.forEach(file => {
                    const fileURL = createURL(file.filedata, file.filetype);
                    console.log('File URL:', fileURL);
                    setAllFiles(prevFiles => ({
                        ...prevFiles,
                        [file.filename]: fileURL
                    }));
                });
            }
        })

    },[allPosts]);


    useEffect(()=>{
        fetchAllPosts();  
    },[selectedChannel]);

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
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start channel-item" 
                            onClick={()=>setSelectedChannel("")}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Homepage</div>
                                <span style={{fontSize:'small'}}>Created by owner</span>
                            </div>
                            <Badge className='badge'pill>1</Badge>
                        </ListGroup.Item>
                        {allChannels.length > 0 && allChannels.map(channel=>(
                             <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start channel-item" 
                                onClick={()=>setSelectedChannel(channel.channel)}>
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
                            <p><span className='fw-bold'>Channel :</span>{selectedChannel}</p>
                            <Form.Group >
                                <Form.Label>Title</Form.Label>
                                <Form.Control  type="text" 
                                                required
                                                placeholder="Enter title" 
                                                value={inputPostTitle}
                                                className='mb-3 ' 
                                                style={{fontSize:'calc(0.4em + 1vmin)'}}
                                                onChange={handleTitleChange}/>
                            </Form.Group>
                            <Form.Group  >
                                <Form.Label style={{display:'flex', flexDirection:'row'}}>
                                    <span className='me-auto'>Overview</span> 
                                    <OverlayTrigger trigger="click" placement="right" overlay={emojiPopover} >
                                        <Link>
                                            <span class="material-symbols-outlined">add_reaction</span>
                                        </Link>  
                                    </OverlayTrigger>                              
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Write the overview here"
                                    ref={textAreaRef}
                                    style={{height:'15vh'}}
                                    value={inputPost}
                                    className='mb-3 '
                                    onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" >
                                <Form.Label>Attachments</Form.Label>
                                <Form.Control type="file" multiple  onChange={handleFileInput}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                            <Button className='cancle-channel-btn' onClick={closePostModal}>
                                Cancle
                            </Button>
                            <Button className='create-channel-btn' onClick={handleSendPost}>
                                Add new post
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                {selectedChannel == "" ? (
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
                ):(
                <div className='all-posts'>
                    <div className='individual-post'>
                    {allPosts.length > 0 && allPosts.map(post=>(
                        <ListGroup as="ol" className='suggestions-list' style={{paddingLeft:`${post.level * 2.5}vw`}}>
                            <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            style={{border:'none'}}>
                                <Image 
                                    src='profile.png'
                                    className="post-user-img" 
                                    roundedCircle 
                                />
                          
                            <div className="ms-2 me-auto" >
                                <p className='post-owner' style={{fontWeight:'bold'}}>{post.username}</p>
                                <p className='post-owner'>{post.datetime}</p>
                            </div>
                        </ListGroup.Item> 
                        <ListGroup.Item style={{border:'none'}}>
                        <p style={{fontWeight:'bold'}}>{post.postTitle}</p>
                        <p>{post.post}</p>
                        {post.files.map(file => (                    
                            <Stack direction="horizontal" gap={1} className="post-file-card">
                                <a href={allFiles[file.filename]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{fontSize:'small', textDecoration:'none'}}>{file.filename}</a>
                            </Stack>
                        ))}
                        </ListGroup.Item>
                        <ListGroup.Item style={{border:'none'}}>
                            <hr></hr> 
                            <Stack  direction='horizontal' gap={4}>
                                {postComments != post.id ? 
                                    <p className='send-reply' style={{color:'#2F3C7E'}} onClick={()=>setPostComments(1)}>Show Comments</p>
                                :
                                    <p className='send-reply' style={{color:'#2F3C7E'}} onClick={()=>setPostComments(0)}>Hide Comments</p>
                                }
                                {postReply != post.id ? 
                                <p className='send-reply' onClick={()=>handleReplyClick(post.id, post.post)}>Reply</p> 
                                : 
                                <p className='send-reply me-auto' style={{color:'#2F3C7E'}} onClick={()=>handleSendPost()}>Send Reply</p> }
                                {postReply == post.id ? 
                                 <p className='send-reply ' style={{color:'#2F3C7E'}} onClick={()=>handleCancelReply()}>Cancle</p>
                                  :<></>}
                            </Stack>
                            {postReply == post.id ? 
                             <FloatingLabel controlId="floatingTextarea2" label={`Reply to user ${post.username} for post "${replyToPost}"`}>
                                <Form.Control
                                as="textarea"
                                ref={textAreaRef}
                                placeholder="Leave a comment here"
                                value={inputPost}
                                onChange={handleInputChange}
                                style={{ height: '6vw' }}
                                />
                                <input 
                                    type='file' 
                                    style={{display:'none'}}
                                    ref={fileRef}
                                    onChange={handleFileInput}
                                    />
                                <span class="material-symbols-outlined" 
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        opacity: 0.7,
                                        cursor: 'pointer',
                                        }} 
                                    onClick={() => fileRef.current.click()}>
                                    attach_file
                                </span>
                                <OverlayTrigger trigger="click" placement="right" overlay={emojiPopover} >
                                        <Link>
                                            <span class="material-symbols-outlined" 
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    right: '50px',
                                                    opacity: 0.7,
                                                    cursor: 'pointer',
                                                    }} >
                                                add_reaction
                                            </span>
                                        </Link>  
                                </OverlayTrigger>
                            </FloatingLabel>
                            :<></>}
                        </ListGroup.Item>  
                        </ListGroup>
                        
                    ))}
                    </div>
                </div>)}
           </div>
           <div className='right-block'>
                {userDetails? ( 
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
                    </ListGroup>) : <p>Retriving user details</p>}
                <div className='suggestions'>
                    <ListGroup as="ol" className='suggestions-list'>
                        <ListGroup.Item className='suggestion-item' as="li">
                            <div className="fw-bold">Top Profiles</div>
                        </ListGroup.Item>
                        {activeMembers.length > 0 && activeMembers.map(member=>(
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start suggestion-item">
                                <div className="image-container">
                                    <Image 
                                        src={member.avatar}
                                        className="top-user-img" 
                                        roundedCircle 
                                    />
                                </div>
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{member.name}</div>
                                    <Link className='view-link' onClick={openOffCanvas}>View Profile</Link>
                                    <SelectedUserDetailsCanvas showOffCanvas={showOffCanvas} closeOffCanvas={closeOffCanvas} otherUser={member.username} />
                                </div>
                                <Link><span class="material-symbols-outlined message-link" style={{fontSize:'1vw'}}>chat_bubble</span></Link>  
                            </ListGroup.Item> 
                        ))}
                    </ListGroup>

                </div>
               
                
           </div>
        </div>
    );
}

export default Channels;