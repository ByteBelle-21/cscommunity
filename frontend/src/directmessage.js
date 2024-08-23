
import './UniformStyle.css';
import './directmessage.css';
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

function DirectMessage () {
    const navigateTo = useNavigate()
    const goToProfile=()=>{
        navigateTo('/profile')
    }

    const goToHome =()=>{
        navigateTo('/')
    }

    return (
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link  className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>Profile</Nav.Link>
                <Nav.Link href="#" >Log Out</Nav.Link>
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
                <Container className='left-sidebar small-grid-container'>
                    <h6>Direct Messages</h6>
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
                <Container className='middle-sidebar large-grid-container'>
                        knhcfre
                </Container>
                <Container className='right-sidebar small-grid-container'>
                    <img src="/Group 205.png"  style={{height:'7vw'}}/>
                    <h6>Username</h6>
                    <Container className='user-info'>
                        <p>Occupation : sdhfwbjhefjkwe</p>
                        <p>Total Posts : 2</p>
                        <p>Ratings : ⭐⭐⭐⭐</p>
                    </Container>
                    <Button onClick={goToProfile}>View Profile</Button>
                </Container>

            </div>

        </div>
    )

}

export default DirectMessage;