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
import { useParams,useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


function SelectedChannel({removeAuthentication}){
    const {channelName} = useParams();
    const current_user = sessionStorage.getItem('auth_user');

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const postId = urlParams.get('postId');
    const navigateTo = useNavigate()

    useEffect(()=>{
        if(postId){
            const searchedPost = document.getElementById(postId);
            if(searchedPost){
                searchedPost.scrollIntoView({behavior:'smooth'});
            }
        }
    })

    useEffect(()=>{
        fetchUserDetails();
        fetchConnectedUsers();
        fetchAllPosts();  
    },[decodeURIComponent(channelName)]);


    const [userDetails, setUserDetails] = useState([]);
    const fetchUserDetails= async()=>{
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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



    const[allPosts, setAllPosts] = useState([])
    const fetchAllPosts= async()=>{
        const channel_name = decodeURIComponent(channelName);
        const loggedInUser = sessionStorage.getItem('auth_user');
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//allPosts',
            { params: {current_channel:channel_name, user:loggedInUser}});
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
                        [file.filename]: fileURL,
                    }));
                });
            }
        })

    },[allPosts]);

    const handleSendMessage=(selectedUser)=>{
        navigateTo(`/messages/${encodeURIComponent(selectedUser)}`);
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
        console.log(inputFiles.length);
    };
    const handleFileDelete=(filename)=>{
        setInputFiles((prev) => prev.filter((file) => file.name !== filename));
        if(inputFiles.length===0){
            setGotFiles(false);
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//post', data);
            if (response.status === 200) {
                console.log("Uploaded post succesfully");
                fetchUserDetails();
                fetchAllPosts();
                setReplyTo(null);
                setReplyToUser('');
                setInputPost('');
                handleUploadFile(response.data.postId); 
               
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


    const [showSearchModal, setShowSearchModal] = useState(false);
    const openSearchModal = () => {
        setShowSearchModal(true);
    }

    const closeSearchModal =()=>{
        setShowSearchModal(false);
    }

    const [searchText, setSearchText] = useState('');
    const [searchSelect, setSearchSelect] = useState('');
    const [showSearchError, setShowSearchError] = useState(false);
    const [searchChannelResult, setSearchChannelResult] = useState([]);
    const [searchPostResult, setSearchPostResult] = useState([]);
    const [searchPeopleResult, setSearchPeopleResult] = useState([]);
    
    
    useEffect(()=>{
        const handleSearch= async()=>{
            if (searchText.length === 0 || searchSelect === '') {
                setSearchChannelResult([]);
                setSearchPeopleResult([]);
                setSearchPostResult([]);
                setShowSearchError(searchSelect === '');
                return;
            }else if (searchSelect === 'channel'){
                try {
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchChannel',
                        {params:{search_input :searchText}} );
                    if (response.status === 200) {
                        setSearchChannelResult(response.data);
                        console.log("Successfully retrieved search result for channels");
                    } 
                } catch (error) {
                    console.error("Catched axios error: ",error);
                }
            
            }else if (searchSelect === 'post'){
                try {
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchPost',
                    {params:{search_input :searchText}});
                    if (response.status === 200) {
                        setSearchPostResult(response.data);
                        console.log("Successfully retrieved search result for posts");
                    } 
                } catch (error) {
                    console.error("Catched axios error: ",error);
                }
            
            }else if (searchSelect === 'people'){
                try {
                    if (searchText.length === 0){
                        setSearchChannelResult([]);
                        setSearchPeopleResult([]);
                        setSearchPostResult([]);
                        return;
                    }
                    const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchPeople',
                    {params:{search_input :searchText}});
                    if (response.status === 200) {
                        setSearchPeopleResult(response.data);
                        console.log(response.data);
                        console.log("Successfully retrieved search result for people");
                    } 
                } catch (error) {
                    console.error("Catched axios error: ",error);
                }
            
            }
            

        }
        handleSearch();  
    },[searchText, searchSelect]);

    const showProfile=(userName)=>{
        navigateTo(`/user-profile/${encodeURIComponent(userName)}`)
    }


    const [popularChannels, setPopularChannels] = useState([]);
    useEffect(()=>{
        const fetchChannels= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//popularchannels');
                if (response.status === 200) {
                    setPopularChannels(response.data);
                    console.log("Successfully retrieved popular channels");
                } 
            }catch (error) {
                console.error("Catched axios error: ",error);
            }
        }
        fetchChannels();  
    },[]);

    const showchannel =(channelName)=>{
        navigateTo(`/channel/${encodeURIComponent(channelName)}`)
    }


    
    const handleLikes= async(post, postCreator, loggedInUser)=>{
        if(postCreator === sessionStorage.getItem('auth_user')){
            return;
        }
        console.log(loggedInUser);
        try {
            const data ={ postId: post, 
                          creator:postCreator,
                          user:loggedInUser}
            const response = await axios.post('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/likepost',data);
            if (response.status === 200) {
                fetchAllPosts();
                console.log("Successfully added likes to the post");
            } 
        }catch (error) {
            console.error("Catched axios error: ",error);
        }
    }



    
    return(
        <div className='page-layout'>
            <Stack direction="horizontal" gap={3} className="navbar">
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement' onClick={()=> navigateTo('/profile')}><img  src={userDetails.avatar} style={{height:'1.5vw', marginRight:'0.1vw'}}/> {userDetails.username}</Nav.Link>
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <Nav.Link className='mx-2' onClick={()=>navigateTo('/all-channels')}><span className="material-icons" >keyboard_backspace</span></Nav.Link>
                <h6 className='me-auto'>{channelName}</h6>
                    <Form>  
                        <Form.Control placeholder="🔍 Search" 
                                    className='search-bar'
                                    onClick={openSearchModal}/>

                        <Modal
                        size="md"
                        keyboard={false} 
                        show={showSearchModal} 
                        onHide={closeSearchModal} 
                        centered 
                        style={ {width:'100%'}}
                        >
                        <Modal.Header className='vertical-placement' >
                            <h6 style={{color:'rgb(6, 110, 200)'}}>Search</h6>
                            <Form style={{ width: '100%' }}>
                                <Form.Select 
                                className='search-bar1 mb-1'
                                value= {searchSelect}
                                onChange={(e) => {setSearchSelect(e.target.value);setShowSearchError(false)}} >
                             
                                    <option >Search by</option>
                                    <option value="channel">Channel</option>
                                    <option value="people">People</option>
                                    <option value="post">Post</option>
                                </Form.Select>
                                 <Form.Control placeholder="Search" 
                                      className='search-bar2'
                                      type="text" 
                                      value = {searchText}
                                      onChange={(e) => {setSearchText(e.target.value)}}       
                                />
                            </Form>
                            
                        </Modal.Header>
                        <Modal.Body style={{fontSize:'0.9vw', height:'25vw', overflowY:'auto'}} className={showSearchError ? 'vertical-placement' : 'search-result-block'}>
                            {showSearchError && 
                                <div style={{display:'flex',flexWrap:'wrap', opacity:'0.5'}}>Please select an option from the dropdown menu to continue.</div>
                            }
                            {(!showSearchError && searchChannelResult.length === 0 && searchPeopleResult.length === 0 && searchPostResult.length ===0) &&
                                <div style={{display:'flex',flexWrap:'wrap', opacity:'0.5', fontSize:'1vw'}}>No Search Result</div> 
                            }
                            {searchChannelResult.length > 0 ?
                                searchChannelResult.map((channel)=>(
                                    <div className='channel-result-block' onClick={()=>showchannel(channel.channel)}>
                                       { channel.channel}
                                        <p style={{fontSize:'0.8vw', marginBottom:'0.2vw'}}>Created by<img src={channel.avatar} style={{height:'1vw', marginLeft:'0.7vw'}}/><span> {channel.username}</span></p>
                                    </div>  
                                ))   
                                :  ""
                            } 
                            {searchPeopleResult.length > 0 ?
                                searchPeopleResult.map((person)=>(
                                    <div className='result-block' 
                                         onClick={()=> {
                                            if(person.username=== userDetails.username){
                                                navigateTo('/profile');
                                            }else{
                                                showProfile(person.username)
                                            }
                                        }}>
                                        <img src={person.avatar} style={{height:'2vw'}}/><span> {person.username}</span>  
                                    </div>  
                                ))   
                                :  ""
                            } 
                            {searchPostResult.length > 0 ?
                                searchPostResult.map((post)=>(
                                    <div className='result-block' onClick={()=>goToPost(post.channel,post.id)}>
                                        <strong>{post.channel}</strong> <br></br>
                                        <img src={post.avatar} style={{height:'1.5vw'}}/><span style={{fontSize:'0.8vw'}} > {post.username}</span>
                                        <p style={{fontSize:'0.8vw', marginBottom:'0.2vw'}}>{post.post}</p>
                                    </div>  
                                ))   
                                :  ""
                            } 
                        </Modal.Body>
                    </Modal>
                    </Form> 
                   
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
                        <Button onClick={()=> navigateTo('/profile')}>My Profile</Button>
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
                            {allPosts.map((post,index)=>(
                            <div id={post.id} className="post-div" style={{paddingLeft:`${post.level * 2.5}vw`}}>
                                {(post.level===0 && index > 0) && <hr style={{width:'80%'}}></hr> }
                                <div className='post-sender'>
                                    <Nav.Link >
                                        <img src={post.avatar} style={{height:'1.5vw'}}></img>
                                        <strong style={{fontSize:'0.8vw', marginLeft:'1vw',opacity:'0.7'}}>{post.username}</strong>    
                                    </Nav.Link >
                                    <span style={{fontSize:'0.7vw',  marginLeft:'1vw'}}>{post.datetime}</span>
                                </div>
                                <div className='post-text' style={{paddingLeft:'2.5vw',fontSize:'0.87vw'}}>
                                    <span>{post.post}</span>
                                    {post.files && post.files.length > 0 && ( 
                                        <div className='file-list'> 
                                            {post.files.map(file => (
                                            <Stack direction="horizontal" gap={1} className="post-file-card">
                                                <span className="material-icons file-icon" >text_snippet</span>
                                                <a href={allFiles[file.filename]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none'}} >{file.filename}</a>
                                            </Stack>
                                            ))}
                                        </div>
                                    )}
                                    <Stack direction="horizontal" gap={3} style={{ alignItems:'center'}}>
                                        <Nav.Link style={{ color: 'rgb(12, 132, 237)', display: 'flex', alignItems: 'center' }}>
                                            <span className="material-icons" style={{ margin: 0 }}>recommend</span>
                                            <span>{post.likes}</span>
                                        </Nav.Link>
                                        {post.isLikedByUser ?
                                            <Nav.Link style={{color:'rgb(12, 132, 237)'}} onClick={()=>handleLikes(post.id,post.username,userDetails.id)}>You liked this post</Nav.Link>
                                            :<Nav.Link style={{color:'rgb(12, 132, 237)'}} onClick={()=>handleLikes(post.id,post.username,userDetails.id)}>Like</Nav.Link>
                                        }
                                        
                                        <Nav.Link style={{color:'rgb(12, 132, 237)'}} onClick={()=>handleReplyClick(post.id,post.username, post.post)} >Reply</Nav.Link>
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
                                        <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(user.username)} >View Profile</Nav.Link>
                                    </div>
                                    <Nav.Link style={{fontSize:'small'}} className='view-conversation' onClick ={()=>handleSendMessage(user.username)}>View Conversation</Nav.Link>
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
                    {popularChannels.length > 0 && popularChannels
                            .filter(channel => channel.channel !== decodeURIComponent(channelName))
                            .slice(0,3)
                            .map(channel=>(
                            <Stack direction="horizontal" gap={3} className='suggested-channel-block' onClick={()=>showchannel(channel.channel)} >
                                <div className=' me-auto'>
                                    {channel.channel}
                                    <p style={{fontSize:"small", marginBottom:0}}>Created by {channel.username} <span style={{marginLeft: "2vw"}}>Posts {channel.totalposts}</span></p>
                                </div>
                    

                            </Stack>
                        ))}
                        
                   </Container>       
                </Container>
               
                
            </div>
        </div>

    )
}

export default SelectedChannel;
