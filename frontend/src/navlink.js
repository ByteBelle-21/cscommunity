import Nav from 'react-bootstrap/Nav';
import './Uniformstyle.css';
import './profile.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {SignInModal} from './functions.js'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navlink({removeAuthentication}){
    const navigateTo = useNavigate();

    const location = useLocation();
    const homepage = location.pathname === '/';
    const channelsPage = location.pathname === '/channels';
    const profilePage = location.pathname === '/profile';
    const messagePage = location.pathname === '/messages';

    const[showAddMediaModal, setShowAddMediaModal] = useState(false);
    const openAddMediaModal = ()=>{
        setShowAddMediaModal(true);
    }

    const closeAddMediaModal = ()=>{
        setShowAddMediaModal(false);
    }


    const[showNavlinkSignInModal, setShowNavlinkSignInModal] = useState(false);
    const openNavlinkSignInModal = ()=>{
        setShowNavlinkSignInModal(true);
    }

    const closeNavlinkSignInModal = ()=>{
        setShowNavlinkSignInModal(false);
    }


    const goToChannels = () =>{
        if(!channelsPage){
            navigateTo('/channels');
        }
    }

    const goToMessages = () =>{
        if( !messagePage){
            navigateTo('/messages');
        }
    }

    const goToProfile = () =>{
        if(!profilePage){
            navigateTo('/profile');
        }
    }

    return(
        <Nav className='navlink' defaultActiveKey="/home">
            {homepage ? (
                <>
                    <Nav.Item className='me-auto'>
                        <Nav.Link style={{marginLeft:'5vw', padding:'0'}} >CScommunity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <SignInModal showSignUpModal={showNavlinkSignInModal} closeSignUpModal={closeNavlinkSignInModal} />
                    <Nav.Link className='join-button' onClick={openNavlinkSignInModal}>Join Us</Nav.Link>
                    </Nav.Item>  
                </>
            ):(
                <>
                    <Nav.Item className='me-auto'>
                        <Nav.Link style={{marginLeft:'5vw', padding:'0'}} >CScommunity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={openAddMediaModal}> Search</Nav.Link>
                    </Nav.Item>
                    <Modal 
                        size="md" 
                        show={showAddMediaModal} 
                        onHide={closeAddMediaModal}
                        centered>
                        <Modal.Body>
                            <p className='mfont create-channel-title' >
                                <span 
                                    class="material-symbols-outlined" 
                                    style={{fontSize:'1.5vw', 
                                            marginRight:'1vh',
                                            color:'#2F3C7E'
                                    }}>
                                    search
                                </span>
                                Search Posts, Channels or Other Users
                            </p>
                            <Form.Label htmlFor="inputPassword5">Choose Search Criteria</Form.Label>
                            <Form.Select aria-label="Default select example"  className="mb-3">
                                <option>Select Criteria</option>
                                <option value="1">Post</option>
                                <option value="2">People</option>
                                <option value="3">Channel</option>
                            </Form.Select>
                            <Form.Label htmlFor="basic-url">What are you looking for ?</Form.Label>
                            <Form.Control type="text" placeholder="Enter what you remember" />
                            <div className='search-results'>
                                    <hr></hr>
                                    <p className='fw-bold'>Search Results</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                            <Button className='cancle-channel-btn' onClick={closeAddMediaModal}>
                                Cancle
                            </Button>
                            <Button className='edit-profile-btn' onClick={closeAddMediaModal}>
                                Search
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Nav.Item >
                        <Nav.Link onClick={goToChannels}> 
                            Channels
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  onClick={goToMessages}> Messages</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  onClick={goToProfile}> Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link style={{marginRight:'5vw'}} onClick={removeAuthentication} > Log out</Nav.Link>
                    </Nav.Item>
                </>
            )}  
        </Nav>
    );
}
export default Navlink;