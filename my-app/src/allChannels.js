import './homepage.css';
import './allChannels.css'
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';


function AllChannels(){
    return(
        <div className="allChannels-page">
            <Stack direction="horizontal" gap={3} className="full-width-bands">
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
            <div className='horizontal-placement m-4 '>
                <Container className='channels-list'>

                </Container>
                <Container className='rightside-bar '>
                    <h6>Direct Messages</h6>
                    <Container className='direct-messages vertical-placement'>
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
                    <Stack direction="horizontal" gap={3} className='create-channel-stack'>
                            <img src="/Group 205.png"  style={{height:'2vw'}}/>
                            <div className=' me-auto'>
                                Username
                                <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                            </div>
                                <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                    </Stack>               
                </Container>
            </div>
        </div>
    )

}

export default AllChannels;