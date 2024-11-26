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
import Overlay from 'react-bootstrap/Overlay';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { fetchActiveMembers ,fetchPopularChannels,handleRating,recognizeDevice} from './functions.js';
import Image from 'react-bootstrap/Image';



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
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//connectedusers',{ params: { user: current_user} });
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
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//allPosts',
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
        
    };
    const handleFileDelete=(filename)=>{
        setInputFiles((prev) => prev.filter((file) => file.name !== filename));
        
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//fileupload', formData, {
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
    



    
    const textAreaRef = useRef(null);
    const handleEmojiSelect = (emoji) =>{
          const cursor = textAreaRef.current.selectionStart;
          const newInput = inputPost.slice(0,cursor) + emoji.native +inputPost.slice(cursor);
          setInputPost(newInput);
          textAreaRef.current.setSelectionRange(cursor + emoji.native.length, cursor + emoji.native.length);
          textAreaRef.current.focus();
    }
    const [showEmojis,setShowEmojis] = useState(false);
    const buttonRef =useRef(null);
    const popoverRef =useRef(null);
    const hideEmojis =(event) =>{
            setShowEmojis(false);
        
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//post', data);
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

    const [device, setDevice] = useState();
    useEffect(() => {
        const fetchDeviceType= ()=>{
            try {
                const response = recognizeDevice();
                if (response != null) {
                    setDevice(response);
                } 
            }catch (error) {
                console.error("Catched error during retrieving popular channels: ",error);    
            }
        }
        window.addEventListener('resize', fetchDeviceType);
        fetchDeviceType(); 

        return () => window.removeEventListener('resize', fetchDeviceType);
    }, []);
 


    const [mobile, setMobile] = useState(false);
    useEffect(()=>{
        const isMobile=()=>{
            const width = window.innerWidth;
            if(width > 600){
                setMobile(false);
            }
            else{
                setMobile(true);
            }
        }
        window.addEventListener('resize', isMobile);
        isMobile(); 
        return () => window.removeEventListener('resize', isMobile);
    },[]);


    const [width, setwidth] = useState(0);
    useEffect(()=>{
        const setCurrentWidth=()=>{
            const width = window.innerWidth;
            setwidth(width);
        }
        window.addEventListener('resize', setCurrentWidth);
        setCurrentWidth(); 
        return () => window.removeEventListener('resize', setCurrentWidth);
    },[]);


    const [showMenu, setShowMenu] = useState(false);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    
    
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
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchChannel',
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
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchPost',
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
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//searchPeople',
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
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//popularchannels');
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/likepost',data);
            if (response.status === 200) {
                fetchAllPosts();
                console.log("Successfully added likes to the post");
            } 
        }catch (error) {
            console.error("Catched axios error: ",error);
        }
    }


    const goToPost = (channel,postId) =>{
        const channelName = channel;
        navigateTo(`/channel/${encodeURIComponent(channelName)}?postId=${postId}`)
    }


    
    return(
        <div className='page-layout'>
             {(!mobile) && <Stack direction="horizontal" className="navbar" gap={4}>
                <Nav.Link >
                    CScommunity
                </Nav.Link>
                 <Form className='horizontal-placement ms-4 me-auto  search-form'>   
                        <Form.Control placeholder="Search" 
                                      className='search-bar'
                                      onClick={openSearchModal}
                    />
                </Form> 
                <Nav.Link style={{color:'#c6e010'}}>
                    Home
                </Nav.Link> 
                <Nav.Link  style={{color:'#c6e010'}} onClick={()=> navigateTo('/messages')} >
                    Message
                </Nav.Link> 
                <Nav.Link onClick={removeAuthentication}>
                    Logout
                </Nav.Link> 
            </Stack>}
            {mobile &&
                <Stack direction="horizontal" className="navbar" gap={4} style={{background:'#e9ff4f'}}>
                <Nav.Link style={{display: 'flex', alignItems: 'center' }} onClick={handleShowMenu} >
                <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)' }}>menu</span>
                 </Nav.Link>
                 <Offcanvas show={showMenu} onHide={handleCloseMenu} style={{background:'black',color:'white'}}>
                    <Offcanvas.Header>
                    <Offcanvas.Title ><p className='rfont'> Menu</p></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={handleCloseMenu}   >
                        <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)', marginRight:'calc(1vmin)' }}>home</span>
                        <p className='rfont' style={{margin:0}}> Home</p>
                        </Nav.Link>
                        <br></br>
                        <Nav.Link style={{display: 'flex', alignItems: 'center' }}  onClick={openSearchModal} >
                        <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)' ,marginRight:'calc(1vmin)' }}>search</span>
                        <p className='rfont' style={{margin:0}}> Search</p>
                        </Nav.Link>
                        <br></br>
                        <Nav.Link style={{display: 'flex', alignItems: 'center' }} onClick={()=> navigateTo('/messages')}   >
                        <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)' ,marginRight:'calc(1vmin)' }}>mail</span>
                        <p className='rfont'style={{margin:0}}>  Messages</p>
                        </Nav.Link>
                        <br></br>
                        <Nav.Link style={{display: 'flex', alignItems: 'center' }} onClick={()=> navigateTo('/profile')} >
                        <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)' ,marginRight:'calc(1vmin)' }}>person</span>
                        <p className='rfont'style={{margin:0}}>My Profile</p>
                        </Nav.Link>
                        <br></br>
                        <Nav.Link style={{display: 'flex', alignItems: 'center' }} onClick={handleCloseMenu} >
                        <span className="material-icons " style={{fontSize:'calc(1em + 1vmin)' ,marginRight:'calc(1vmin)' }}>close</span>
                        <p className='rfont'style={{margin:0}}>Close Menu</p>
                        </Nav.Link>
                    </Offcanvas.Body>
                </Offcanvas>
                <Nav.Link className="me-auto">
                    CScommunity
                 </Nav.Link> 
                 <Nav.Link >
                    Log out
                 </Nav.Link>
            </Stack>
            }
            <Modal
                        size="md"
                        keyboard={false} 
                        show={showSearchModal} 
                        onHide={closeSearchModal} 
                        centered
                        className='search-modal'
                        style={{'--bs-modal-border-radius':0}}
                        >
                        <Modal.Header className='vertical-placement' >
                            <p className='rfont'>Search</p>
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
                            <Modal.Body className=' rfont search-result-block'>
                            {showSearchError && 
                                <p className={device==0?'sfont':'rfont'} style={{display:'flex',flexWrap:'wrap', opacity:'0.5'}}>Please select an option from the dropdown menu to continue.</p>
                            }
                            {(!showSearchError && searchChannelResult.length === 0 && searchPeopleResult.length === 0 && searchPostResult.length ===0) &&
                                <p className={device==0?'sfont':'rfont'}  style={{display:'flex',flexWrap:'wrap', opacity:'0.5'}}>No Search Result</p> 
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
                    {(width > 1000) && 
                    <div className='page-content horizontal-placement'>
                     <Container className="small-grid-container1">
                    {userDetails ? (
                        <Container className=' profile' >
                            <img  src={userDetails.avatar}  style={{height:'5vw'}}/> 
                            <p className='rfont'>{userDetails.username}</p>
                            <p className='rfont' >{userDetails.name}</p>
                            <div className='horizontal-placement'>
                                <div className='mx-2 vertical-placement'>
                                    {userDetails.totalPosts}
                                    <p style={{fontSize:'calc(0.4em + 1vmin)'}}>Posts</p>
                                </div>
                                <div className='mx-2 vertical-placement'>
                                    {userDetails.likes}
                                    <p style={{fontSize:'calc(0.4em + 1vmin)'}}>Likes</p>
                                </div>
                            </div>
                            <Button onClick={()=> navigateTo('/profile')}>My Profile</Button>
                        </Container>) :""}
                    </Container>
                    <Container className='large-grid-container'>
                        <Container className='send-post-block'>
                            <Stack direction='horizontal' gap={1} >
                                    <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                                    <Form className='text-area horizontal-placement' style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div className='content-holder vertical-placement'>
                                            {gotFile && <div className='filePlaceholders'>
                                                {inputFiles.map(file =>(
                                                <Stack direction="horizontal" gap={1} className="file-card">
                                                    <span className="material-icons" >text_snippet</span>
                                                    <div className='me-auto' style={{fontSize:'0.9vw'}}>{file.name}</div>
                                                    <Nav.Link  onClick={()=>handleFileDelete(file.name)}> <span className="material-icons" >close</span></Nav.Link>
                                                </Stack>))}
                                            </div>}
                                            <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your post here" value={inputPost} className='text-area-formcontrol' onChange={handleInputChange}/>
                                        </div>   
                                    </Form>
                                    <Button className='send-btn' >
                                        Post
                                    </Button> 
                                </Stack>  
                            <Stack direction='horizontal' gap={3}>
                                <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput}/>
                                
                                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 250 }} overlay={showFileTooltip}>  
                                                <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={handleButtonClick}   >
                                                    <span className="material-icons"  style={{fontSize:'calc(0.5em + 1vmin)', marginRight:'calc(0.5vmin)' }} onClick={handleButtonClick}>attach_file</span>
                                                    <p className='sfont' style={{margin:0 }}> Attach doc</p>
                                                </Nav.Link>
                                            </OverlayTrigger>
                                            
                                            <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={()=>setShowEmojis(!showEmojis)} ref={buttonRef}   >
                                                    <span className="material-icons"  style={{fontSize:'calc(0.5em + 1vmin)', marginRight:'calc(0.5vmin)' }}>add_reaction</span>
                                                    <p className='sfont' style={{margin:0 }}> Add reaction</p>
                                                </Nav.Link>
                                            
                                            <Overlay
                                                show={showEmojis}
                                                placement="bottom"
                                                target={buttonRef.current}
                                            >
                                                {emojiPopover}
                                            </Overlay>
                                </Stack>    
                       
                        </Container>
                        <Container>
                            
                        </Container>
                    </Container>
                    <Container className='small-grid-container2'>  
                            <Container className=' direct-messages small-grid-container-child '>
                              <p className='semifont' >Recent Direct Messages</p>
                                {connectedUsers.length > 0 && 
                                        connectedUsers.slice(0,5).map(user =>(
                                            <div className='child-blocks'>
                                                <Stack direction="horizontal" gap={3}>
                                                    <img src={user.avatar}  style={{height:'2vw'}}/>
                                                    <div className=' me-auto'>
                                                        {user.username}
                                                        <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(user.username)} >View Profile</Nav.Link>
                                                    </div>
                                                    <Nav.Link style={{fontSize:'small'}} onClick ={()=>handleSendMessage(user.username)} className='view-conversation' >View Conversation</Nav.Link>
                                                </Stack>
                                            </div>
                                        ))}
                                
                                {connectedUsers.length === 0 &&
                                    <Container className=' direct-messages small-grid-container-child vertical-placement'>
                                        <p style={{opacity:'0.5', alignSelf:'center'}}>No messages </p> 
                                    </Container>                            
                                }
                            </Container> 
                            <Container className=' direct-messages small-grid-container-child'>
                                <p className='semifont' >Suggested Channels </p>
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
                </div>}  
                {width>=600 && width<=1000 &&
                    <div className='page-content horizontal-placement'>
                   <Container className='large-grid-container '>
                   <Container className='send-post-block'>
                            <Stack direction='horizontal' gap={1} >
                                    <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                                    <Form className='text-area horizontal-placement' style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div className='content-holder vertical-placement'>
                                            {gotFile && <div className='filePlaceholders'>
                                                {inputFiles.map(file =>(
                                                <Stack direction="horizontal" gap={1} className="file-card">
                                                    <span className="material-icons" >text_snippet</span>
                                                    <div className='me-auto' style={{fontSize:'0.9vw'}}>{file.name}</div>
                                                    <Nav.Link  onClick={()=>handleFileDelete(file.name)}> <span className="material-icons" >close</span></Nav.Link>
                                                </Stack>))}
                                            </div>}
                                            <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your post here" value={inputPost} className='text-area-formcontrol' onChange={handleInputChange}/>
                                        </div>   
                                    </Form>
                                    <Button className='send-btn' >
                                        Post
                                    </Button> 
                                </Stack>  
                            <Stack direction='horizontal' gap={3}>
                                <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput}/>
                                
                                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 250 }} overlay={showFileTooltip}>  
                                                <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={handleButtonClick}   >
                                                    <span className="material-icons"  style={{fontSize:'calc(0.5em + 1vmin)', marginRight:'calc(0.5vmin)' }} onClick={handleButtonClick}>attach_file</span>
                                                    <p className='sfont' style={{margin:0 }}> Attach doc</p>
                                                </Nav.Link>
                                            </OverlayTrigger>
                                            
                                            <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={()=>setShowEmojis(!showEmojis)} ref={buttonRef}   >
                                                    <span className="material-icons"  style={{fontSize:'calc(0.5em + 1vmin)', marginRight:'calc(0.5vmin)' }}>add_reaction</span>
                                                    <p className='sfont' style={{margin:0 }}> Add reaction</p>
                                                </Nav.Link>
                                            
                                            <Overlay
                                                show={showEmojis}
                                                placement="bottom"
                                                target={buttonRef.current}
                                            >
                                                {emojiPopover}
                                            </Overlay>
                                </Stack>    
                       
                        </Container>
                      
                   </Container>
                   <Container className='small-grid-container2'> 
                        {userDetails ? (
                            <Container className=' profile' >
                                <img  src={userDetails.avatar}  style={{height:'5vw'}}/> 
                                <p className='rfont'>{userDetails.username}</p>
                                <p className='rfont' >{userDetails.name}</p>
                                <div className='horizontal-placement'>
                                    <div className='mx-2 vertical-placement'>
                                        {userDetails.totalPosts}
                                        <p style={{fontSize:'calc(0.4em + 1vmin)'}}>Posts</p>
                                    </div>
                                    <div className='mx-2 vertical-placement'>
                                        {userDetails.likes}
                                        <p style={{fontSize:'calc(0.4em + 1vmin)'}}>Likes</p>
                                    </div>
                                </div>
                                <Button onClick={()=> navigateTo('/profile')}>My Profile</Button>
                            </Container>) :""}
                
                           <Container className=' direct-messages small-grid-container-child '>
                             <p className='semifont' >Recent Direct Messages</p>
                               {connectedUsers.length > 0 && 
                                       connectedUsers.slice(0,5).map(user =>(
                                           <div className='child-blocks'>
                                               <Stack direction="horizontal" gap={3}>
                                                   <img src={user.avatar}  style={{height:'2vw'}}/>
                                                   <div className=' me-auto'>
                                                       {user.username}
                                                       <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(user.username)} >View Profile</Nav.Link>
                                                   </div>
                                                   <Nav.Link style={{fontSize:'small'}} onClick ={()=>handleSendMessage(user.username)} className='view-conversation' >View Conversation</Nav.Link>
                                               </Stack>
                                           </div>
                                       ))}
                               
                               {connectedUsers.length === 0 &&
                                   <Container className=' direct-messages small-grid-container-child vertical-placement'>
                                       <p style={{opacity:'0.5', alignSelf:'center'}}>No messages </p> 
                                   </Container>                            
                               }
                           </Container> 
                           <Container className=' direct-messages small-grid-container-child'>
                                <p className='semifont' >Suggested Channels </p>
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
               </div>}  
               {(width < 600) && 
                    <Container className='large-grid-container '>
                    <Container className='send-post-block'>
                             <Stack direction='horizontal' gap={1} >
                                     <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                                     <Form className='text-area horizontal-placement' style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                         <div className='content-holder vertical-placement'>
                                             {gotFile && <div className='filePlaceholders'>
                                                 {inputFiles.map(file =>(
                                                 <Stack direction="horizontal" gap={1} className="file-card">
                                                     <span className="material-icons" >text_snippet</span>
                                                     <div className='me-auto' style={{fontSize:'0.9vw'}}>{file.name}</div>
                                                     <Nav.Link  onClick={()=>handleFileDelete(file.name)}> <span className="material-icons" >close</span></Nav.Link>
                                                 </Stack>))}
                                             </div>}
                                             <TextareaAutosize ref={textAreaRef} minRows={1} maxRows={3} placeholder="Add your post here" value={inputPost} className='text-area-formcontrol' onChange={handleInputChange}/>
                                         </div>   
                                     </Form>
                                     <Button className='send-btn' >
                                         Post
                                     </Button> 
                                 </Stack>  
                             <Stack direction='horizontal' gap={3}>
                                 <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleFileInput}/>
                                 
                                             <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 250 }} overlay={showFileTooltip}>  
                                                 <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={handleButtonClick}   >
                                                     <span className="material-icons"  style={{fontSize:'calc(0.8em + 1vmin)', marginRight:'calc(0.5vmin)' }} onClick={handleButtonClick}>attach_file</span>
                                                     <p className='semifont' style={{margin:0 }}> Attach doc</p>
                                                 </Nav.Link>
                                             </OverlayTrigger>
                                             
                                             <Nav.Link style={{display: 'flex', alignItems: 'center'}} onClick={()=>setShowEmojis(!showEmojis)} ref={buttonRef}   >
                                                     <span className="material-icons"  style={{fontSize:'calc(0.8em + 1vmin)', marginRight:'calc(0.5vmin)' }}>add_reaction</span>
                                                     <p className='semifont' style={{margin:0 }}> Add reaction</p>
                                                 </Nav.Link>
                                             
                                             <Overlay
                                                 show={showEmojis}
                                                 placement="bottom"
                                                 target={buttonRef.current}
                                             >
                                                 {emojiPopover}
                                             </Overlay>
                                 </Stack>    
                        
                         </Container>
                       
                    </Container>
               } 
        </div>

    )
}

export default SelectedChannel;
