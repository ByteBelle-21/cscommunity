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
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import DirectMessage from './directmessage';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';




function AllChannels({removeAuthentication}){
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


  

    return(
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link className="me-auto" onClick={goToHome}>CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{username}</Nav.Link>
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto '>All Channels</h6>
                <div className='search-container horizontal-placement '>
                    <span className="material-icons">search</span> Search  
                    <Form className='horizontal-placement ms-4'> 
                        <Form.Select aria-label="Search by" className='search-bar'>
                            <option >Search by</option>
                            <option value="channel">Channel</option>
                            <option value="people">People</option>
                            <option value="post">Post</option>
                        </Form.Select>   
                        <Form.Control placeholder="Channel or people or post" className='search-bar'/>
                    </Form> 
                </div>       
            </div>
            <div className='page-content horizontal-placement'>
                <Container className="small-grid-container1">
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
                    <h6 className='mb-3'> Suggested People</h6>
                    <Container className='small-grid-container-child'>
                        {suggestedPeople.length >0 && suggestedPeople.map(person=>(
                                <Stack direction="horizontal" gap={3} style={{marginBottom:'0.5vw'}}>
                                    <img src={person.avatar}  style={{height:'2.5vw'}}/>
                                    <div className=' me-auto'>
                                        {person.username}
                                        <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(person.username)} >View Profile</Nav.Link>
                                    </div>   
                                </Stack>
                        ))}
                    </Container>
                </Container>
                <Container className='large-grid-container '>
                    <Container className='col-titles'>
                        <Row style={{width:'100%'}} >
                            <Col xs={6} md={6}>Channel</Col>
                            <Col xs={2} md={1}>Posts</Col>
                            <Col xs={2} md={1}>People</Col>
                            <Col xs={2} md={4}>Creator</Col>
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
                    
                    <div className='create-channel-container small-grid-container-child vertical-placement'>
                        <div className='create-channel-block vertical-placement'>
                            <img src="/Group 209.png" />
                            <Button className='create-channel-btn' onClick={openCreationForm}>Create new Channel</Button>
                        </div>

                    </div>

                    
                    <Modal show={createChannelform} onHide={closeCreationForm} centered style={{"--bs-modal-border-radius":'1vw'}} >
                        <Modal.Body className='vertical-placement'>
                            <h5>Create your Own Channel</h5>
                            <Form className=' new-channels-form mt-2'>
                                <Form.Group controlId="signup-username" >
                                    <Form.Label>Enter Channel Name</Form.Label>
                                    <Form.Control type="text" placeholder="i.e Java discussion channel" className='mb-3' onChange={(e) => {setChannel(e.target.value); setCreateChannelAlert(false);}}/>
                                </Form.Group>
                            </Form>
                            {createChannelAlert && <Alert variant="danger" > 💡Please fill out all required fields</Alert>}
                            <Stack direction="horizontal" gap={3}>
                                <Button type='submit' className='channel-form-button' onClick={closeCreationForm}>Cancle</Button>
                                <Button type='submit' className='channel-form-button' onClick={handleChannelCreation}>Create</Button>
                            </Stack>
                             
                        </Modal.Body>
                    </Modal>                                
                </Container>
            </div>
        </div>
    )

}

export default AllChannels;