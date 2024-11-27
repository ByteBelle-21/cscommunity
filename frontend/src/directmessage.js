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
import Offcanvas from 'react-bootstrap/Offcanvas';
import { fetchActiveMembers ,fetchPopularChannels,handleRating,recognizeDevice} from './functions.js';
import Image from 'react-bootstrap/Image';

function DirectMessage ({removeAuthentication}) {
    const navigateTo = useNavigate()
    const {selectedUser} = useParams();
    
    const goToProfile=(userName)=>{
        navigateTo(`/user-profile/${encodeURIComponent(userName)}`)
    }

    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
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
        fetchConnectedUsers();  
    },[]);





    const [loggedInUserDetails, setLoggedInUserDetails] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchUserDetails= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//user',{
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//message', data);
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
        fetchUserDetails();
    },[]);


    const [allMessages, setAllMessages] = useState([]);
    const fetchAllMessages= async()=>{
        const you = sessionStorage.getItem('auth_user');
        const reciever = selectedUser;
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//allMessages',
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



    const goToPost = (channel,postId) =>{
        const channelName = channel;
        navigateTo(`/channel/${encodeURIComponent(channelName)}?postId=${postId}`)
    }



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



    const [searchText, setSearchText] = useState('');
    const [searchSelect, setSearchSelect] = useState('');
    const [showSearchError, setShowSearchError] = useState(false);
    const [searchChannelResult, setSearchChannelResult] = useState([]);
    const [searchPostResult, setSearchPostResult] = useState([]);
    const [searchPeopleResult, setSearchPeopleResult] = useState([]);

    const [showSearchModal, setShowSearchModal] = useState(false);
    const openSearchModal = () => {
        setShowSearchModal(true);
    }

    const closeSearchModal =()=>{
        setShowSearchModal(false);
    }


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



    return (
        <div className="page-layout">
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
                        <Container className=' small-grid-container1 connected-user-profile'>
                        <img src={selectedUserDetails.avatar}  style={{height:'6vw'}}/>
                        <strong className='mt-2'>{selectedUserDetails.name}</strong>
                        <p style={{fontSize:'0.9vw'}}>{selectedUserDetails.username}</p>
                        <Container className='user-info'>
                            <p>Occupation : {selectedUserDetails.occupation}</p>
                            <p>Total Posts : {selectedUserDetails.totalPosts}</p>
                            <p>Rating : {handleRating(selectedUserDetails.likes, selectedUserDetails.totalPosts)}</p>
                        </Container>
                        <Button onClick={()=>goToProfile(selectedUserDetails.username)}>View Profile</Button>
                    </Container>

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
                        
                    </Container>
                    <Container className='small-grid-container2'>  
                            <Container className=' direct-messages-all small-grid-container-child '>
                              <p className='semifont' >All Direct Messages</p>
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

                     
                    </Container>
                </div>} 
                {width>=600 && width<=1000 &&
                    <div className='page-content horizontal-placement'>
                        <Container className='large-grid-container'>
                        <Stack direction='horizontal' gap={1} >
                                     <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                                     <Nav.Link  >That user</Nav.Link>
                                 </Stack>  
                        </Container>
                        <Container className='small-grid-container2'>  
                            <Container className=' direct-messages-all small-grid-container-child '>
                              <p className='semifont' >All Direct Messages</p>
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

                     
                    </Container>
                    
               </div>} 
               {(width < 600) && 
                    <Container className='large-grid-container '>
                            <Stack direction='horizontal' gap={1} >
                                     <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                                     <Nav.Link  >That user</Nav.Link>
                                 </Stack>  
                    

                    </Container>
                }
        </div>
    )

}

export default DirectMessage;