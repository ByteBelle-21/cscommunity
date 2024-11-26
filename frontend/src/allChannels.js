import './homepage.css';
import './allChannels.css';
import './UniformStyle.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import DirectMessage from './directmessage';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { fetchActiveMembers ,fetchPopularChannels,handleRating,recognizeDevice} from './functions.js';
import Offcanvas from 'react-bootstrap/Offcanvas';

import Image from 'react-bootstrap/Image';


function AllChannels({removeAuthentication}){
    const formControlRef = useRef(null);
    const [createChannelform, setCreateChannelForm] = useState(false)
    const [username, setUsername] = useState('');
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




    const openCreationForm = ()=>{
        setCreateChannelForm(true)
    }
    const closeCreationForm=()=>{
        setCreateChannelAlert(false);
        setCreateChannelForm(false)
    }

    const navigateTo = useNavigate()
    const showchannel =(channelName)=>{
        navigateTo(`/channel/${encodeURIComponent(channelName)}`)
    }
    const showConversation = () =>{
        navigateTo('/messages')
    }

    const showProfile=(userName)=>{
        navigateTo(`/user-profile/${encodeURIComponent(userName)}`)
    }
    

    const goToHome =()=>{
        navigateTo('/')
    }

    useEffect(()=>{
        setUsername(sessionStorage.getItem('auth_user'));
    },[])

    const [fetchAgain, setFetchAgain] = useState(false);



    const [channel, setChannel] = useState('')
    const [createChannelAlert,setCreateChannelAlert] = useState(false)
    const handleChannelCreation =async(e)=>{
        e.preventDefault();
        if(!channel){
            setCreateChannelAlert(true);
            return;
        }
        closeCreationForm();
        const data = {
            username,channel
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/createchannel', data);
            if (response.status === 200) {
                setFetchAgain(!fetchAgain);
                console.log("Successfully created channel")
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }


    const [suggestedPeople, setSuggestedPeople] = useState([]);
    useEffect(()=>{
        const fetchSuggestedPeople= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/activeusers');
                if (response.status === 200) {
                    setSuggestedPeople(response.data);
                    console.log("Successfully retrieved suggested user details");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchSuggestedPeople();  
    },[]);

    



    

    const [allChannels, setAllChannels] = useState([]);
    useEffect(()=>{
        const fetchAllChannels= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/allchannels');
                if (response.status === 200) {
                    setAllChannels(response.data);
                    console.log("Successfully retrieved all channels");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchAllChannels();  
    },[fetchAgain]);


    
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


    const handleSendMessage=(selectedUser)=>{
        navigateTo(`/messages/${encodeURIComponent(selectedUser)}`);
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
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/searchChannel',
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
                    
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/searchPost',
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
                    const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/searchPeople',
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

    return(
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
                    <Container className='large-grid-container '>
                        <Stack direction='horizontal' gap={1}  className='create-channel-block '>
                            <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                            <Form className='me-auto create-channel-form' style={{ flexGrow: 1 }}>   
                            <Form.Control placeholder={createChannelAlert?"Enter channel's name":"Channel name"}
                                         style={{border:createChannelAlert?'0.1vw solid red':''}} 
                                        className='channel-bar'
                                        onChange={(e) => {setChannel(e.target.value); setCreateChannelAlert(false)}}
                                />
                            </Form>  
                            <Button className='create-channel-btn'  onClick={handleChannelCreation}>
                                Create Channel
                            </Button> 
                        </Stack>
                        <Container className='col-titles'>
                            <Row style={{width:'100%'}} >
                                <Col xs={6} md={6} ><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Channel</p></Col>
                                <Col xs={2} md={1}><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Posts</p></Col>
                                <Col xs={2} md={1}> <p style={{fontSize:'calc(0.4em + 1vmin)'}}>People</p></Col>
                                <Col xs={2} md={4}><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Creator</p></Col>
                            </Row>
                        </Container>
                        <Container className="channel-list">
                            {allChannels.length > 0 && allChannels.map(channel=>(
                                <Row  className='channel horizontal-placement' onClick={()=>showchannel(channel.channel)}>
                                    <Col xs={6} md={6}>
                                     <span style={{fontWeight:'semi-bold'}}>{channel.channel}</span>
                                    </Col>
                                    <Col xs={2} md={1}>{channel.totalposts}</Col>
                                    <Col xs={2} md={1}>{channel.totalpeople}</Col>
                                    <Col xs={2} md={4}><img src={channel.avatar}  style={{height:'2vw'}}/> {channel.username}</Col> 
                                </Row>
    
                            ))}
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
                            <Container className='direct-messages small-grid-container-child'>
                               <p className='semifont' >Suggested People</p>
                                {(suggestedPeople.length >0 && userDetails ) &&  suggestedPeople.slice(0,5).map(person=>(
                                        (person.id !== userDetails.id && 
                                            <Stack direction="horizontal" gap={3} style={{marginBottom:'1vw'}}>
                                                <img src={person.avatar}  style={{height:'2.5vw'}}/>
                                                <div className=' me-auto'>
                                                    {person.username}
                                                    <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(person.username)} >View Profile</Nav.Link>
                                                </div>   
                                        </Stack>

                                        )
                                        
                                ))}
                    </Container>                           
                    </Container>
                </div>} 
                {width>=600 && width<=1000 &&
                    <div className='page-content horizontal-placement'>
                   <Container className='large-grid-container '>
                       <Stack direction='horizontal' gap={1}  className='create-channel-block '>
                           <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                           <Form className='me-auto create-channel-form' style={{ flexGrow: 1 }}>   
                           <Form.Control placeholder={createChannelAlert?"Enter channel's name":"Channel name"}
                                        style={{border:createChannelAlert?'0.1vw solid red':''}} 
                                       className='channel-bar'
                                       onChange={(e) => {setChannel(e.target.value); setCreateChannelAlert(false)}}
                               />
                           </Form>  
                           <Button className='create-channel-btn'  onClick={handleChannelCreation}>
                               Create 
                           </Button> 
                       </Stack>
                       <Container className='col-titles semifont'>
                           <Row style={{width:'100%'}} >
                           <Col xs={6} md={6} ><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Channel</p></Col>
                                <Col xs={2} md={1}><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Posts</p></Col>
                                <Col xs={2} md={1}> <p style={{fontSize:'calc(0.4em + 1vmin)'}}>People</p></Col>
                                <Col xs={2} md={4}><p style={{fontSize:'calc(0.4em + 1vmin)'}}>Creator</p></Col>
                           </Row>
                       </Container>
                       <Container className="channel-list">
                           {allChannels.length > 0 && allChannels.map(channel=>(
                               <Row  className='channel horizontal-placement' onClick={()=>showchannel(channel.channel)}>
                                   <Col xs={6} md={6}>
                                    <span style={{fontWeight:'semi-bold'}}>{channel.channel}</span>
                                   </Col>
                                   <Col xs={2} md={1}>{channel.totalposts}</Col>
                                   <Col xs={2} md={1}>{channel.totalpeople}</Col>
                                   <Col xs={2} md={4}><img src={channel.avatar}  style={{height:'2vw'}}/> {channel.username}</Col> 
                               </Row>
   
                           ))}
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
                           <Container className='direct-messages small-grid-container-child'>
                              <p className='semifont' >Suggested People</p>
                               {(suggestedPeople.length >0 && userDetails ) &&  suggestedPeople.slice(0,5).map(person=>(
                                       (person.id !== userDetails.id && 
                                           <Stack direction="horizontal" gap={3} style={{marginBottom:'1vw'}}>
                                               <img src={person.avatar}  style={{height:'2.5vw'}}/>
                                               <div className=' me-auto'>
                                                   {person.username}
                                                   <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(person.username)} >View Profile</Nav.Link>
                                               </div>   
                                       </Stack>

                                       )
                                       
                               ))}
                            </Container>                           
                   </Container>
               </div>}   
               {(width<600) &&
                     <Container className='large-grid-container'>
                     <Stack direction='horizontal' gap={1}  className='create-channel-block '>
                         <Image style={{margin:0, border:'solid #e68d83'}} src="holder.js/171x180" roundedCircle />
                         <Form className='me-auto create-channel-form' style={{ flexGrow: 1 }}>   
                         <Form.Control placeholder={createChannelAlert?"Enter channel's name":"Channel name"}
                                      style={{border:createChannelAlert?'0.1vw solid red':''}} 
                                     className='channel-bar'
                                     onChange={(e) => {setChannel(e.target.value); setCreateChannelAlert(false)}}
                             />
                         </Form>  
                         <Button className='create-channel-btn'  onClick={handleChannelCreation}>
                             Create 
                         </Button> 
                     </Stack>
                     <Container className='col-titles'>
                         <Row style={{width:'100%'}} >
                         <Col xs={6} md={6} ><p style={{fontSize:'calc(0.5em + 1vmin)'}}>Channel</p></Col>
                                <Col xs={2} md={1}><p style={{fontSize:'calc(0.5em + 1vmin)'}}>Posts</p></Col>
                                <Col xs={2} md={1}> <p style={{fontSize:'calc(0.5em + 1vmin)'}}>People</p></Col>
                                <Col xs={2} md={4}><p style={{fontSize:'calc(0.5em + 1vmin)'}}>Creator</p></Col>
                         </Row>
                     </Container>
                     <Container className="channel-list">
                         {allChannels.length > 0 && allChannels.map(channel=>(
                             <Row  className='channel horizontal-placement' onClick={()=>showchannel(channel.channel)}>
                                 <Col xs={6} md={6}>
                                  <span style={{fontWeight:'semi-bold'}}>{channel.channel}</span>
                                 </Col>
                                 <Col xs={2} md={1}>{channel.totalposts}</Col>
                                 <Col xs={2} md={1}>{channel.totalpeople}</Col>
                                 <Col xs={2} md={4}><img src={channel.avatar}  style={{height:'2vw'}}/> {channel.username}</Col> 
                             </Row>
 
                         ))}
                     </Container>
                 </Container>

               }
                       

        </div>
    )

}

export default AllChannels;