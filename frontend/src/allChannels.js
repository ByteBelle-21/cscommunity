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



function AllChannels({removeAuthentication}){
    const [createChannelform, setCreateChannelForm] = useState(false)
    const [username, setUsername] = useState('')
    const openCreationForm = ()=>{
        setCreateChannelForm(true)
    }
    const closeCreationForm=()=>{
        setCreateChannelForm(false)
    }

    const navigateTo = useNavigate()
    const showchannel =()=>{
        navigateTo('/channel')
    }
    const showConversation = () =>{
        navigateTo('/messages')
    }

    const goToHome =()=>{
        navigateTo('/')
    }

    useEffect(()=>{
        setUsername(sessionStorage.getItem('auth_user'));
    },[])


    const [channel, setChannel] = useState('')


    const handleChannelCreation =async(e)=>{
        e.preventDefault();
        const data = {
            username,channel
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/createchannel', data);
            if (response.status === 200) {
                console.log("Successfully created channel")
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }





  

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
                        <Row  className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>    
                                <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                        <Row className='channel horizontal-placement' onClick={showchannel}>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                    
                    
                        <Row className='channel horizontal-placement'>
                            <Col xs={6} md={6}>
                            <img src="/Group 210.png"  style={{height:'3vw'}}/> <span style={{fontWeight:'semi-bold'}}>dmhcvjqhvdckw</span>
                            </Col>
                            <Col xs={2} md={1}>50</Col>
                            <Col xs={2} md={1}>30</Col>
                            <Col xs={2} md={4}><img src="/Group 205.png"  style={{height:'2vw'}}/> Username XX</Col> 
                        </Row>
                    </Container>
                </Container>
                <Container className='small-grid-container'>  
                    <h6>Direct Messages</h6>
                    <Container className=' direct-messages small-grid-container-child'>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} onClick={showConversation}>View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
    
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                    </Container>
                    <div className='create-channel-container small-grid-container-child vertical-placement'>
                        <div className='create-channel-block vertical-placement'>
                            <img src="/Group 209.png" />
                            <Button className='create-channel-btn' onClick={openCreationForm}>Create new Channel</Button>
                        </div>

                    </div>

                    
                    <Modal  show={createChannelform} onHide={closeCreationForm} centered style={{"--bs-modal-border-radius":'1vw'}} >
                        <Modal.Body className='vertical-placement'>
                            <h5>Create your Own Channel</h5>
                            <Form className=' new-channels-form mt-2'>
                                <Form.Group controlId="signup-username" >
                                    <Form.Label>Enter Channel Name</Form.Label>
                                    <Form.Control type="text" placeholder="i.e Java discussion channel" className='mb-3' onChange={(e) => setChannel(e.target.value)}/>
                                </Form.Group>
                            </Form>
                             <Button type='submit' className='channel-form-button' onClick={handleChannelCreation}>Create</Button>
                        </Modal.Body>
                    </Modal>                                
                </Container>
            </div>
        </div>
    )

}

export default AllChannels;