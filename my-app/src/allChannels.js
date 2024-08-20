import './homepage.css';
import './allChannels.css'
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function AllChannels(){
    const [createChannelform, setCreateChannelForm] = useState(false)
    const openCreationForm = ()=>{
        setCreateChannelForm(true)
    }
    const closeCreationForm=()=>{
        setCreateChannelForm(false)
    }




    return(
        <div className="allChannels-page">
            <Stack direction="horizontal" gap={3} className="full-width-bands" style={{height:'5vh'}}>
                <Nav.Link href="#" className="me-auto mx-4">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>Profile</Nav.Link>
                <Nav.Link href="#" className="mx-4" >Log Out</Nav.Link>
            </Stack>
            <div className='sub-head horizontal-placement'>
                <h6 className='me-auto mx-4'>All Channels</h6>
                <div className='search-container horizontal-placement mx-4'>
                    <span className="material-icons">search</span> Search  
                    <Form className='ms-4'>    
                        <Form.Control placeholder="Channel name" className='search-bar'/>
                    </Form> 
                </div>       
            </div>
            <div className='horizontal-placement' style={{margin:'2vh'}}>
                <Container className='channels-list'>

                </Container>
                <Container className='rightside-bar vertical-placement '>  
                    <Container className='direct-messages '>
                        <h6>Direct Messages</h6>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
                            <Stack direction="horizontal" gap={3}>
                                <img src="/Group 205.png"  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    Username
                                    <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                            </Stack>
                        </div>
                        <div className='direct-msg-member'>
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
                    
                    <div className='create-channel-stack vertical-placement '>
                        <img src="/Group 209.png" />
                        <Button className='create-channel-btn' onClick={openCreationForm}>Create new Channel</Button>
                    </div>
                    <Modal  show={createChannelform} onHide={closeCreationForm} centered style={{"--bs-modal-border-radius":'1vw'}} >
                        <Modal.Body className='vertical-placement'>
                            <h5>Create your Own Channel</h5>
                            <Form className='mt-2'>
                                <Form.Group controlId="signup-username" >
                                    <Form.Label>Enter Channel Name</Form.Label>
                                    <Form.Control type="text" placeholder="i.e Java discussion channel" className='mb-3'/>
                                </Form.Group>
                                <Button>Create Channel</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>                                
                </Container>
            </div>
        </div>
    )

}

export default AllChannels;