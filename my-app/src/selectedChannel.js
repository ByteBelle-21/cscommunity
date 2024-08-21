import './homepage.css';
import './UniformStyle.css'
import './selectedChannel.css'
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


function SelectedChannel(){
    return(
        <div className='page-layout'>
            <Stack direction="horizontal" gap={3} className="navbar">
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>Profile</Nav.Link>
                <Nav.Link href="#" >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto'>Selected Channel</h6>
                <div className='search-container horizontal-placement'>
                    <span className="material-icons">search</span> Search  
                    <Form className='horizontal-placement ms-4'> 
                        <Form.Select aria-label="Search by" className='search-bar'>
                            <option >Search by</option>
                            <option value="people">People</option>
                            <option value="post">Post</option>
                        </Form.Select>   
                        <Form.Control placeholder="people or post" className='search-bar'/>
                    </Form> 
                </div>       
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container' >  
                <h6>Direct Messages</h6>
                   <Container className='small-grid-container-child'> 
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
                   <h6>Suggested Channels for you</h6>
                   <Container className='small-grid-container-child'>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                        <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                        <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                        <div className='child-blocks'>
                        <Stack direction="horizontal" gap={3}>
                                <div className=' me-auto'>
                                    Channel name
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Go to Channel</Nav.Link>
                            </Stack>
                        </div>
                   </Container>       
                </Container>
                <Container className='large-grid-container'>
                    <Container className='all-posts'>
                        wkjnrfgjehrfvbkwjhefkjwnhbdcjabfjnhdnfvjwb
                    </Container>   
                    <Form className='text-area'>
                        <Form.Group  controlId="post">
                            <Form.Control as="textarea" rows={3} style={{height:'2vw'}}/>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        </div>

    )
}

export default SelectedChannel;
