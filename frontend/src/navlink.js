import Nav from 'react-bootstrap/Nav';
import './Uniformstyle.css';
import './profile.css';
import './channels.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {SignInModal, fetchConnectedUsers,getUserDeatils,getMainPost} from './functions.js'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Navlink({authentication,removeAuthentication}){

    // get current user details 
    const [userDetails, setUserDetails] = useState([]);
    useEffect(()=>{
        getUserDeatils(setUserDetails);    
    },[]);

    // functionality to navigate between pages 
    const navigateTo = useNavigate();
    const location = useLocation();
    const homepage = location.pathname === '/';

    // functionality to get connected users
    const[connectedUsers, setConnectedUsers] = useState(null);
    useEffect(()=>{
        fetchConnectedUsers(setConnectedUsers);
    })


    // functionality for search modal
    const[showSearchModal, setShowSearchModal] = useState(false);
    const openSearchModal = ()=>{
        setShowSearchModal(true);
    }

    const closeSearchModal = ()=>{
        setShowSearchModal(false);
        setSearchSelect('');
        setSearchText('');
        setSearchChannelResult([]);
        setSearchPostResult([]);
        setSearchPeopleResult([]);
    }

    const [searchText, setSearchText] = useState('');
    const [searchSelect, setSearchSelect] = useState('');
    const [showSearchError, setShowSearchError] = useState(false);
    const [searchChannelResult, setSearchChannelResult] = useState([]);
    const [searchPostResult, setSearchPostResult] = useState([]);
    const [searchPeopleResult, setSearchPeopleResult] = useState([]);

    useEffect(()=>{
        if(searchSelect === '' || searchSelect === '0'){
            setShowSearchError(true);
            setSearchChannelResult([]);
            setSearchPostResult([]);
            setSearchPeopleResult([]);
            setSearchText('');
        }
    }, [searchSelect]);

    useEffect(()=>{
        const handleSearch= async()=>{
            if (searchSelect === '' || searchSelect === '0'){
                setShowSearchError(true);
                return;
            }else if (searchSelect === '3'){
                try {
                    const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/searchChannel',
                        {params:{search_input :searchText}} );
                    if (response.status === 200) {
                        setSearchChannelResult(response.data);
                        console.log("Successfully retrieved search result for channels");
                    } 
                } catch (error) {
                    console.error("Catched axios error: ",error);
                }
            
            }else if (searchSelect === '1'){
                if(searchText.length < 3){
                    return;
                }
                try {
                    const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/searchPost',
                    {params:{search_input :searchText}});
                    if (response.status === 200) {
                        setSearchPostResult(response.data);
                        console.log("Successfully retrieved search result for posts");
                    } 
                } catch (error) {
                    console.error("Catched axios error: ",error);
                }
            
            }else if (searchSelect === '2'){
                try {
                    const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/searchPeople',
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
    },[searchText]);

    const [mainPost, setMainPost] = useState(null); 
    const [channelName, setChannelName] = useState(null); 
    const goToPost = async (postId,channelName) =>{
        closeSearchModal();
        setChannelName(channelName);
        getMainPost(postId,setMainPost);
    }

    useEffect(()=>{
        if(mainPost !== null && channelName != null){
            navigateTo(`/channels/${encodeURIComponent(channelName)}?postId=${mainPost}`);
        }
    },[mainPost, channelName]);

    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }


    // functionality for sign in modal
    const[showNavlinkSignInModal, setShowNavlinkSignInModal] = useState(false);
    const openNavlinkSignInModal = ()=>{
        setShowNavlinkSignInModal(true);
    }

    const closeNavlinkSignInModal = ()=>{
        setShowNavlinkSignInModal(false);
    }


    // functionality to naviagte after clicking on menu
    const goToChannels = () =>{ 
            navigateTo('/channels/homepage');   
    }

    const goToMessages = () =>{
        const selectedUser = connectedUsers[connectedUsers.length -1].username;
        navigateTo(`/messages/${selectedUser}`);
    }

    const goToProfile = () =>{
        navigateTo('/profile');  
    }

    const goToChannel = (channel) =>{
        closeSearchModal();
        navigateTo(`/channels/${channel}`);
    }

    // functionality to directly connect searched person
    const openOffCanvas = (username)=>{
        closeSearchModal();
        if(username !== userDetails.username){
            navigateTo(`/messages/${username}`);
        }
        else{
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
                        <SignInModal authenticate={authentication} showSignUpModal={showNavlinkSignInModal} closeSignUpModal={closeNavlinkSignInModal} />
                    <Nav.Link className='join-button' onClick={openNavlinkSignInModal}>Join Us</Nav.Link>
                    </Nav.Item>  
                </>
            ):(
                <>
                    <Nav.Item className='me-auto'>
                        <Nav.Link style={{marginLeft:'5vw', padding:'0'}} >CScommunity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={openSearchModal}> Search</Nav.Link>
                    </Nav.Item>
                    <Modal 
                        size="md" 
                        show={showSearchModal} 
                        onHide={closeSearchModal}
                        centered 
                        backdrop="static">
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
                            <Form.Select 
                            aria-label="Default select example"  
                            className="mb-3" 
                            onChange={(e) => {setSearchSelect(e.target.value);setShowSearchError(false)}}>
                                <option value="0">Select Criteria</option>
                                <option value="1">Post</option>
                                <option value="2">People</option>
                                <option value="3">Channel</option>
                            </Form.Select>
                            <Form.Label htmlFor="basic-url">What are you looking for ?</Form.Label>
                            <Form.Control type="text" placeholder="Enter what you remember" value={searchText} onChange={(e) => setSearchText( e.target.value)}/>
                            <div className='search-results'>
                                    <hr></hr>
                                    {(!showSearchError && searchChannelResult.length === 0 && searchPeopleResult.length === 0 && searchPostResult.length ===0) ?
                                        <p className='fw-bold'>No Search Result</p> : <p className='fw-bold'>Search Results</p>
                                    }
                                    {showSearchError && 
                                        <div style={{display:'flex',flexWrap:'wrap', opacity:'0.5', fontSize:'small'}}>Please select an option from the dropdown menu to continue.</div>
                                    }
                                     {searchChannelResult.length > 0  && searchSelect ==='3' ?
                                        <ListGroup as="ol" >
                                            {searchChannelResult.map((channel)=>(
                                                <ListGroup.Item
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start suggestion-item" 
                                                    onClick={() => {goToChannel(channel.channel)}}>
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{channel.channel}</div>
                                                        <span className='sfont'>Created by {channel.username}</span>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup> 
        
                                        :  ""
                                    } 
                                    {searchPeopleResult.length > 0 && searchSelect ==='2' ?
                                        <ListGroup as="ol" >
                                            {searchPeopleResult.map((person)=>(
                                                <ListGroup.Item
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start suggestion-item">
                                                    <div className="image-container">
                                                        <Image 
                                                            src={person.avatar}
                                                            className="top-user-img" 
                                                            roundedCircle 
                                                        />
                                                    </div>
                                                    <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{person.name}</div>
                                                        <Nav.Link className='view-link' onClick={() =>openOffCanvas(person.username)}>View Profile</Nav.Link>
                                                        
                                                    </div>
                                                </ListGroup.Item> 
                                            ))}
                                        </ListGroup>
                                        :  ""
                                    } 
                                    {searchPostResult.length > 0 && searchSelect ==='1' ?
                                        searchPostResult.map((post)=>(
                                            <>
                                            <ListGroup.Item
                                                as="li"
                                                className="d-flex justify-content-between align-items-start history-item" 
                                                onClick={()=>{goToPost(post.id,post.channel )}}>
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">{post.channel}</div>
                                                    {showPreview(post.post,10)}
                                                </div>
                                            </ListGroup.Item> 
                                              <hr></hr>
                                            </>
                                        ))   
                                        :  ""
                                    }   
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{border:'none', backgroundColor:'#f0f5fa'}}>
                            <Button className='cancle-channel-btn' onClick={closeSearchModal}>
                                Cancle
                            </Button>
                            <Button className='edit-profile-btn' onClick={closeSearchModal}>
                                Search
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Nav.Item >
                        <Nav.Link onClick={()=>{goToChannels()}}> Channels</Nav.Link>
                    </Nav.Item>
                    {connectedUsers  && connectedUsers.length > 1 ?
                        <Nav.Item>
                            <Nav.Link  onClick={goToMessages}> Messages</Nav.Link>
                        </Nav.Item> :<></> }
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