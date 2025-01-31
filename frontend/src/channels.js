import './channels.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import { useNavigate,useLocation } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useRef } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getUserDeatils, getAllChannels, handleChannelCreation,getActiveUsers,SelectedUserDetailsCanvas } from './functions.js';

function Channels(){
    // to navigate between pages
    const navigateTo = useNavigate();
    const location = useLocation();
    const {channelsName} =  useParams();

    // get current user details  and all posts
    const [userDetails, setUserDetails] = useState([]);
    useEffect(()=>{
        getUserDeatils(setUserDetails); 
        fetchAllPosts();   
    },[channelsName]);

    useEffect(()=>{
        getUserDeatils(setUserDetails); 
        fetchAllPosts();   
    },[]);


    // for search functionality- to scroll to required post
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get('postId');

    const[postComments, setPostComments] = useState(0);
    useEffect(()=>{
        if(postId){
            const searchedPost = document.getElementById(postId);
            if(searchedPost){
                setPostComments(postId);
                searchedPost.scrollIntoView({behavior:'smooth'});
            }
        }
    },[])

    
    //functionality to create new channel
    const[showChannelModal, setShowChannnelModal] = useState(false);
    const openChannelModal = ()=>{
        setShowChannnelModal(true);
    }

    const closeChannelModal = ()=>{
        setShowChannnelModal(false);
    }

    const [fetchAgain, setFetchAgain] = useState(false);
    const [channel, setChannel] = useState('');
    const createChannel = ()=>{
        closeChannelModal();
        const username = userDetails.username;
        const data = { username,channel };
        handleChannelCreation(setFetchAgain,fetchAgain, data);
        navigateTo(`/channels/${channel}`);
        setChannel('');
    }

    // functionality to create new post
    const[showPostModal, setShowPostModal] = useState(false);
    const openPostModal = ()=>{
        setShowPostModal(true);
    }

    const closePostModal = ()=>{
        setShowPostModal(false);
        setInputPostTitle('');
        setInputPost('');
        setInputFiles([]);
    }

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
    const [gotFile, setGotFiles] = useState(false);
    const handleFileInput = (event) => {
        const files = event.target.files;
        if (files) {
             setGotFiles(true);
            setInputFiles(prev =>[...prev,...Array.from(files)]);
        }
        console.log(inputFiles.length);
    };

    const handleFileDelete=(filename)=>{
        setInputFiles((prev) => prev.filter((file) => file.name !== filename));
        if(inputFiles.length===0){
            setGotFiles(false);
        }
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
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </Popover>
    );

    const handleSendPost =async(seeComments)=>{
        if(seeComments !== 0) {
            setPostComments(seeComments);
        }{
            
        }
        const current_user = sessionStorage.getItem('auth_user');
        const channel = channelsName;
        const data = {
            current_user,
            inputPostTitle,
            inputPost,
            channel,
            replyTo
        }
       
        try {
            const response = await axios.post(`${window.BASE_URL}/post`, data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                setPostReply(0)
                setReplyTo(null);
                setInputPost('');
                setInputPostTitle('');
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
            const response = await axios.post(`${window.BASE_URL}/fileupload`, formData, {
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
    

    // functionality to retrieve all posts
    const[allPosts, setAllPosts] = useState([])
    const fetchAllPosts= async()=>{
        const channel_name = channelsName;
        if(channel_name == "homepage"){
            return;
        }
        try {
            const response = await axios.get(`${window.BASE_URL}/allPosts`,
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

    
    //functionality to display the offcanvas to show other user's derails
    const[showOffCanvas, setShowOffCanvas] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const openOffCanvas = (user)=>{
        setSelectedUser(user);
        setShowOffCanvas(true);
    }

    const closeOffCanvas = ()=>{
        setShowOffCanvas(false);
    }

    // get all channels 
    const [allChannels, setAllChannels] = useState([]);
    useEffect(()=>{
        getAllChannels(setAllChannels);  
    },[fetchAgain]);

    // get all active memebers
    const [activeMembers, setActiveMembers] = useState([]);
    useEffect(()=>{
        getActiveUsers(setActiveMembers);  
    },[channelsName]);

    useEffect(()=>{
        fetchAllPosts();  
        setPostReply(0);
    },[channelsName]);

    // navigate to direct messages 
    const handleMessage=(selectedUser)=>{
        navigateTo(`/messages/${selectedUser}`);
    }

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
                            onClick={()=>{navigateTo('/channels/homepage')}}>
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
                                onClick={()=> {navigateTo(`/channels/${channel.channel}`)}}>
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
                    <h4>{channelsName == 'homepage' ? "Homepage" : channelsName}</h4>
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
                                    {channelsName != 'homepage' ? <span>Create a new post</span> : <span>How to create new post ?</span>}
                                </p>
                                {channelsName != 'homepage' ? <p><span className='fw-bold'>Channel :</span>{channelsName}</p> 
                                : <p style={{textAlign:'center'}}>Let's get the overview how you can create new post. Go to the channel where you want to create you new post.</p>}
                                <Form.Group >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control  type="text" 
                                                    required
                                                    placeholder= {channelsName != 'homepage' ?"Enter title" : "Add title of your post here"}
                                                    value={inputPostTitle}
                                                    className='mb-3 ' 
                                                    style={{fontSize:'calc(0.4em + 1vmin)'}}
                                                    onChange={handleTitleChange}
                                                    readOnly = {channelsName == 'homepage'}/>
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
                                        placeholder={channelsName != 'homepage' ?
                                        "Write the overview here" 
                                        : "Add the details of your post here. You can also add reactions to your post. Click the emoji icon and choose reactions of your choice!"}
                                        ref={textAreaRef}
                                        style={{height:'15vh'}}
                                        value={inputPost}
                                        className='mb-3 '
                                        onChange={handleInputChange} 
                                        readOnly = {channelsName == 'homepage'}/>
                                </Form.Group>
                                <Form.Group controlId="formFileMultiple" >
                                    <Form.Label>Attachments</Form.Label>
                                    <Form.Control type="file" multiple  onChange={handleFileInput}  readOnly ={channelsName == 'homepage'}/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                                {channelsName != 'homepage' ?
                                <>
                                    <Button className='cancle-channel-btn' onClick={closePostModal}>
                                        Cancle
                                    </Button> 
                                    <Button className='create-channel-btn' onClick={() =>handleSendPost(0)}>
                                        Add new post
                                    </Button>
                                </>
                                :
                                <Button className='create-channel-btn' onClick={closePostModal}>
                                    Close Overview
                                </Button>
                                }
                            </Modal.Footer>
                        </Modal>
                </div>
                {channelsName == "homepage" ? (
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
                    {allPosts.length > 0 ? (
                        < span style={{ marginBottom:"2vw"}}>
                         {(()=>{
                             const postsStructure = [];
                             let i = 0;
                             while (i < allPosts.length) {
                               const post = allPosts[i];
                                if (post.level === 0) {
                                    postsStructure.push(
                                    <ListGroup id={post.id}  key={post.id} as="ol" className='post-list' style={{ paddingLeft: `${post.level * 2.5}vw` }}>
                                        <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                        style={{ border: 'none' }}>
                                        <Image 
                                            src={post.avatar}
                                            className="post-user-img" 
                                            roundedCircle 
                                        />
                                        <div className="ms-2 me-auto">
                                            <p className='post-owner' style={{ fontWeight: 'bold' }}>{post.username}</p>
                                            <p className='post-owner'>{post.datetime}</p>
                                        </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ border: 'none' }}>
                                        <p style={{ fontWeight: 'bold' }}>{post.postTitle}</p>
                                        <p>{post.post}</p>
                                        {post.files.map(file => (
                                            <Stack direction="horizontal" gap={1} className="post-file-card" key={file.filename}>
                                            <a href={allFiles[file.filename]} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{ fontSize: 'small', textDecoration: 'none' }}>
                                                {file.filename}
                                            </a>
                                            </Stack>
                                        ))}
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ border: 'none' }}>
                                        <hr />
                                        <Stack direction='horizontal' gap={4}>
                                            {postComments !== post.id ? 
                                            <p className='send-reply' onClick={() => setPostComments(post.id)}>Show Comments</p>
                                            :
                                            <p className='send-reply'  onClick={() => setPostComments(0)}>Hide Comments</p>
                                            }
                                            {postReply !== post.id ? 
                                            <p className='send-reply' onClick={() => handleReplyClick(post.id, post.post)}>Reply</p> 
                                            : 
                                            <p className='send-reply me-auto'  onClick={() => handleCancelReply()}>Cancel</p>
                                            }
                                            {postReply === post.id ? 
                                            <p className='send-reply ' onClick={() => {handleSendPost(post.id)}}>Send Reply</p>
                                            
                                            : <></>
                                            }
                                        </Stack>
                                        {postReply === post.id  ? 
                                           <>
                                           <Stack direction="horizontal" gap={4}>
                                            {gotFile && inputFiles.map(file =>(
                                                    <Stack direction="horizontal" gap={1}>
                                                    <span class="material-symbols-outlined" 
                                                    style={{ fontSize: 'small', cursor:'pointer'}} 
                                                    onClick={()=>{handleFileDelete(file.name)}}>close</span>
                                                        <p
                                                            style={{ fontSize: 'small', color:'#2F3C7E', marginBottom:'0.2vh' }}>
                                                            {file.name}
                                                        </p>
                                                    </Stack>
                                                ))}
                                            </Stack>
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
                                                style={{ display: 'none' }}
                                                ref={fileRef}
                                                onChange={handleFileInput}
                                            />
                                            <span className="material-symbols-outlined" 
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
                                            <OverlayTrigger trigger="click" placement="right" overlay={emojiPopover}>
                                                <Link>
                                                <span className="material-symbols-outlined" 
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
                                            </>
                                        : <></>}
                                        </ListGroup.Item>
                                        {(()=>{
                                            i = i+1;
                                            const nestedPosts = [];
                                            while(i < allPosts.length && allPosts[i].level != 0){
                                                const isIdThere = postId === post.id;
                                                const childPost = allPosts[i];
                                                nestedPosts.push(
                                                    < span style={{paddingLeft:`${childPost.level * 3}vw`,  display: (postComments === post.id || isIdThere) ? '' : 'none'}} className='sfont'>
                                                    <ListGroup.Item
                                                        as="li"
                                                        style={{ border: 'none', padding:'0' }}>
                                                            <span className="d-flex justify-content-between align-items-start">
                                                                <Image 
                                                                     src={childPost.avatar}
                                                                    className="post-user-img" 
                                                                    roundedCircle 
                                                                />
                                                        
                                                                <div className="ms-2 me-auto" >
                                                                    <p className='post-owner' style={{fontWeight:'bold'}}>{childPost.username}</p>
                                                                    <p className='post-owner'>{childPost.datetime}</p>
                                                                </div>
                                                        </span>
                                                        <p>{childPost.post}</p>
                                                        {childPost.files.map(file => (                    
                                                            <Stack direction="horizontal" gap={1} className="post-file-card">
                                                                <a href={allFiles[file.filename]} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                style={{fontSize:'small', textDecoration:'none'}}>{file.filename}</a>
                                                            </Stack>
                                                        ))}
                                                        <Stack  direction='horizontal' gap={4}>
                                                            {postReply != childPost.id ? 
                                                            <p className='send-reply' onClick={()=>handleReplyClick(childPost.id, childPost.post)}>Reply</p> 
                                                            : 
                                                            <p className='send-reply me-auto'  onClick={()=>handleCancelReply()}>Cancle</p>
                                                            }
                                                            {postReply == childPost.id ? 
                                                            <p className='send-reply' onClick={()=>handleSendPost(post.id)}>Send Reply</p> 
                                                            :<></>}
                                                        </Stack>
                                                        {postReply == childPost.id ? 
                                                        <>
                                                        <Stack direction="horizontal" gap={4}>
                                                            {gotFile && inputFiles.map(file =>(
                                                                    <Stack direction="horizontal" gap={1}>
                                                                    <span class="material-symbols-outlined" 
                                                                    style={{ fontSize: 'small', cursor:'pointer'}} 
                                                                    onClick={()=>{handleFileDelete(file.name)}}>close</span>
                                                                        <p
                                                                            style={{ fontSize: 'small', color:'#2F3C7E', marginBottom:'0.2vh' }}>
                                                                            {file.name}
                                                                        </p>
                                                                    </Stack>
                                                                ))}
                                                        
                                                        </Stack>
                                                        <FloatingLabel controlId="floatingTextarea2" label={`Reply to user ${childPost.username} for post "${replyToPost}"`}>
                                                            <Form.Control
                                                            as="textarea"
                                                            ref={textAreaRef}
                                                            placeholder="Leave a comment here"
                                                            value={inputPost}
                                                            onChange={handleInputChange}
                                                            style={{ height: '4vw' , marginBottom:'4vh'}}
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
                                                        </>
                                                        :<></>}
                                                    </ListGroup.Item>
                                                </span>
                                            );
                                            i++;
                                        }
                                        return nestedPosts;
                                    })()}
                                    </ListGroup>
                                 );
                               }
                             }
                             return postsStructure;
                         })()}
                        </span>
                    ): 
                        <div className='no_channel'>
                            <p style={{fontWeight:'bold'}}>No activities on this channel yet. Be the first to start!</p>
                        </div>
                    }
                    </div>
                </div>)}
           </div>
           <div className='right-block'>
                {userDetails? ( 
                    <ListGroup as="ol" className='profile-list'>
                        <ListGroup.Item className='list-item first-item' as="li">
                            <Image src={userDetails.avatar} className='profile-img' roundedCircle />
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
                            <Nav.Link className='profile-link sfont' onClick={()=> navigateTo('/profile')}>View Profile</Nav.Link>
                        </ListGroup.Item>
                    </ListGroup>) : <p>Retriving user details</p>}
                <div className='suggestions'>
                    <ListGroup as="ol" className='suggestions-list'>
                        <p className='fw-bold' style={{padding:'1vh'}}>Top Profiles</p>
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
                                    <Nav.Link className='view-link' onClick={()=>{openOffCanvas(member.username)}}>View Profile</Nav.Link>
                                    {selectedUser === member.username && <SelectedUserDetailsCanvas showOffCanvas={showOffCanvas} closeOffCanvas={closeOffCanvas} otherUser={selectedUser} /> }
                                </div>
                                <Nav.Link onClick={() => handleMessage(member.username)} >
                                    <span 
                                    class="material-symbols-outlined message-link" 
                                    style={{fontSize:'1vw'}}
                                   >
                                        chat_bubble
                                    </span>
                                </Nav.Link>  
                            </ListGroup.Item> 
                        ))}
                    </ListGroup>
                </div>
           </div>
        </div>
    );
}

export default Channels;