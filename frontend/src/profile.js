import './UniformStyle.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


function Profile(){
    return(
           <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>Profile</Nav.Link>
                <Nav.Link href="#" >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto '>User Profile</h6>
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container'>
                    <h6>Suggestions for you</h6>
                        <Container className='all-conversations small-grid-container-child'>
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
                            </div><div className='child-blocks'>
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
                </Container>
                <Container className='large-grid-container'>
                    <Container className='profile-background'>

                    </Container>
                </Container>
            </div>

        </div> 
    )
}

export default Profile;