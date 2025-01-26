import './Homepage.css';
import './Uniformstyle.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export function SignInModal({authenticate,showSignUpModal, closeSignUpModal}){
    const navigateTo = useNavigate();

    // Sign up functionality
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupOccupation, setSignupOccupation] = useState('');
    
    const [signupSkills, setSignupSkills] = useState('');
    const [showSignupAlert, setShowSignupAlert] = useState(false);
    const [showSignUp401, setShowSignUp401] = useState(false);

    const closeSignUpAlerts= ()=>{
        closeSignUpModal();
        setShowLoginAlert(false);
        setShowSignupAlert(false);

    }

    const setActive=()=>{
        const form = document.getElementsByClassName("form");
        form[0].classList.add("active");

    }

    const removeActive=()=>{
        const form = document.getElementsByClassName("form");
        form[0].classList.remove("active");

    }

    // Functionality to move between signup forms
    const carouselRef = useRef(null)
    const goToNextForm=()=>{
        if (carouselRef.current) {
            carouselRef.current.next()
        }
    }

    const goToPrevForm=()=>{
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    }

    const handleSignup =async(e)=>{
        e.preventDefault();
        const skillsArray = signupSkills.split(',').map(item => item.trim()).join(',');
        if(skillsArray.length ==0 || !signupUsername || !signupEmail || !signupPassword || !signupName || !signupOccupation ){
            setShowSignupAlert(true);
            return;
        }
        closeSignUpModal();
        const signupAvatar = '/profile.png'
        const data = {
            signupUsername, signupEmail, signupPassword, signupName, signupOccupation, skills: skillsArray, signupAvatar
        }
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/signup', data);
            if (response.status === 200) {  
                authenticate(true,signupUsername);
                closeSignUpAlerts();
                navigateTo('/channels/homepage');
            } 
        } catch (error) {
                setShowSignUp401(true);
                console.error("Catched axios error during signin: ",error);
        }
    }
    
    
    // Log in functionality
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [showLogIn401, setShowLogIn401] = useState(false);
   
    const handleLogin =async(e)=>{
        e.preventDefault();
        if( !loginUsername || !loginPassword){
            setShowLoginAlert(true);
            return;
        }
        
        const data = {
            loginUsername, loginPassword
        }
        try {
            const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/login', data);
            if (response.status === 200) {
                authenticate( true, loginUsername);
                closeSignUpAlerts();
                navigateTo('/channels/homepage');
            }     
        } catch (error) {
            setShowLogIn401(true);
            console.error("Catched axios error during login: ",error);
        } 
    }

    return(
        <Modal size='lg' 
                backdrop="static" 
                keyboard={false} 
                show={showSignUpModal} 
                onHide={closeSignUpModal} 
                className='homepage-modal'
                centered 
                style={{"--bs-modal-border-radius":'2vw',
                '--bs-modal-padding':0,
                '--bs-modal-margin':0}} >
            <Modal.Body>
                <div className="form">
                    <div className='slide-over'>
                        <div className='slide-panel left-slide-over'>
                            <p className='mfont' style={{fontWeight:'bold'}}>
                                Hello, Friend!
                            </p>
                            <p className='rfont'>Don't have an account ?</p>
                            <Button onClick={setActive}  className='buttonText' >
                                Sign Up
                            </Button>
                        </div>
                        <div className=' slide-panel right-slide-over'>
                            <p className='mfont' style={{fontWeight:'bold'}}>
                                Welcome Back!
                            </p>
                            <p className='rfont'>Already have an account ?</p>
                            <Button onClick={removeActive} className='buttonText'>
                                Log In
                            </Button>
                        </div> 
                    </div>
                    <div className='form-field login'>
                        {showLoginAlert && <p className='sfont' style={{padding:'0.1vw', color:'red'}}>     
                                                Please fill out all required fields
                                            </p>}
                        {showLogIn401 && <p className='sfont' style={{padding:'0.1vw', color:'red'}}>  
                                                Error: Please try again
                                                </p> }
                        {!showLogIn401 && !showLoginAlert  && 
                            <p className='mfont' style={{fontWeight:'bold'}}>
                                Log In
                        </p>}
                        <Form onSubmit={handleLogin}>
                            <Form.Group controlId="signup-username" >
                                <Form.Label className='rfont'>Username</Form.Label>
                                <Form.Control  type="text" 
                                                placeholder="Enter username" 
                                                className='mb-3 ' 
                                                style={{fontSize:'calc(0.4em + 1vmin)'}}
                                                onChange={(e) => {
                                                setLoginUsername(e.target.value); 
                                                setShowLoginAlert(false);}} />
                            </Form.Group>
                            <Form.Group controlId="signup-password">
                                <Form.Label className='rfont' >Password</Form.Label>
                                <Form.Control type="password" 
                                                placeholder="Password" 
                                                style={{fontSize:'calc(0.4em + 1vmin)'}}
                                                className='mb-3' 
                                                onChange={(e) =>{
                                                setLoginPassword(e.target.value); 
                                                setShowLoginAlert(false);}} />
                            </Form.Group>
                            <Stack direction="horizontal" gap={3}>
                                <Button  className="btn btn-primary w-100 buttonText" 
                                            onClick={closeSignUpAlerts} >
                                    Cancle
                                </Button>
                                <Button onClick={handleLogin} className="btn btn-primary w-100 buttonText">
                                    Log in
                                </Button>
                            </Stack>   
                        </Form>

                    </div>
                    <div className='form-field SignUp'>
                        {showSignupAlert && <p className='sfont' style={{padding:'0.1vw', color:'red'}}>     
                                                Please fill out all required fields
                                            </p>}
                        {showSignUp401 && <p className='sfont' style={{padding:'0.1vw', color:'red'}}>  
                                                Error: Please try again
                                                </p> }
                                    
                        {!showSignUp401 && !showSignupAlert &&  
                        <p className='mfont' style={{fontWeight:'bold'}}> Sign Up</p> }
                        <Carousel style={{height:'70%'}} interval={600000} 
                            className='vertical-placement' 
                            ref={carouselRef}>
                            <Carousel.Item className='vertical-placement'>
                                <Form onSubmit={handleSignup}>
                                        <Form.Group controlId="signup-username" >
                                            <Form.Label className='rfont'>Username</Form.Label>
                                            <Form.Control type="text" style={{fontSize:`calc(0.4em + 1vmin)`}}
                                            placeholder="Enter username" className='mb-3' 
                                            onChange={(e) => {setSignupUsername(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-email">
                                            <Form.Label className='rfont'>Email address</Form.Label>
                                            <Form.Control type="email" 
                                            style={{fontSize:'calc(0.4em + 1vmin)'}} 
                                            placeholder="Enter email" 
                                            className='mb-3' 
                                            onChange={(e) => {setSignupEmail(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-password">
                                            <Form.Label className='rfont'>Password</Form.Label>
                                            <Form.Control 
                                            type="password" 
                                            style={{fontSize:'calc(0.4em + 1vmin)'}}  
                                            placeholder="Password" 
                                            className='mb-3' 
                                            onChange={(e) => {setSignupPassword(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button  className="btn btn-primary w-100 buttonText" onClick={closeSignUpAlerts} >Cancle</Button>
                                            <Button  className="btn btn-primary w-100 buttonText" onClick={goToNextForm} >Continue</Button>
                                        </Stack>   
                                    </Form>
                            </Carousel.Item>
                            <Carousel.Item className='vertical-placement'> 
                                <Form onSubmit={handleSignup}>
                                    <Form.Group controlId="signup-name" >
                                        <Form.Label className='rfont'>Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        style={{fontSize:'calc(0.4em + 1vmin)'}} 
                                        placeholder="Enter name" className='mb-3' 
                                        onChange={(e) => {setSignupName(e.target.value) ; setShowSignupAlert(false);}} />
                                    </Form.Group>
                                    <Form.Group controlId="signup-occupation">
                                        <Form.Label className='rfont'>Occupation</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        style={{fontSize:'calc(0.4em + 1vmin)'}} 
                                        placeholder="Enter occupation" 
                                        className='mb-3' 
                                        onChange={(e) => {setSignupOccupation(e.target.value) ; setShowSignupAlert(false);}} />
                                    </Form.Group>
                                    <Form.Group controlId="signup-skills">
                                        <Form.Label className='rfont'>Skills</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        style={{fontSize:'calc(0.4em + 1vmin)'}} 
                                        placeholder="Enter skills" 
                                        className='mb-3' 
                                        onChange={(e) => {setSignupSkills(e.target.value) ; setShowSignupAlert(false);}} />
                                    </Form.Group>
                                    <Stack direction="horizontal" gap={3}>
                                        <Button  className="btn btn-primary w-100 buttonText" onClick={goToPrevForm} >Go back</Button>
                                        <Button className="btn btn-primary w-100 buttonText" onClick={handleSignup} >Sign Up</Button>
                                    </Stack>
                                </Form>
                                
                            </Carousel.Item>
                        </Carousel>
                    </div> 
                </div >
            </Modal.Body>
        </Modal>
    );
}


export function SelectedUserDetailsCanvas({showOffCanvas, closeOffCanvas, otherUser}){
    const [selectedUserDetails, setSelectedUserDetails] = useState([]);
    useEffect(()=>{
        fetchSelectedUserDetails(setSelectedUserDetails, otherUser);
    },[]);


    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }

    return(
        <Offcanvas 
        show={showOffCanvas} 
        onHide={closeOffCanvas} 
        placement='end' 
        name='Enable both scrolling & backdrop'
        className='offcanvas-block'>
        <Offcanvas.Header closeButton>
        <Offcanvas.Title className='fw-bold'>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup as="ol" className='connected-user-profile'>
                <ListGroup.Item className='profile-item ' as="li">
                    <Image src={selectedUserDetails.avatar} className='profile-img' roundedCircle />
                    <p className='rfont' style={{margin:'0', fontWeight:'bold'}}>{selectedUserDetails.username}</p>
                    <p >Hello 👋 Nice to meet you. My name is {selectedUserDetails.name}. I am a {selectedUserDetails.occupation}!</p>
                </ListGroup.Item>
                <ListGroup.Item as="li"  className='social-media-item'>
                    <Stack direction='horizontal' gap={4}>
                        <Link >
                            <Image  src="facebook.png"  className="social-media-img"  roundedCircle />
                        </Link>
                        <Link>
                            <Image  src="instagram.png"  className="social-media-img"  roundedCircle />
                        </Link>
                        <Link>
                            <Image  src="linkedin.png"  className="social-media-img"  roundedCircle />
                        </Link>
                        <Link>
                            <Image  src="message.png"  className="social-media-img" roundedCircle />
                        </Link>
                    </Stack>
                </ListGroup.Item>
                <ListGroup.Item className='profile-skills-item' as="li">
                    <hr></hr>
                    <p  style={{marginTop:'0'}}>
                        • Total Connections : 
                        <span style={{fontWeight:'bold', marginLeft:'1vh'}}>{selectedUserDetails.totalConnections}</span>
                    </p>
                    <p  style={{marginTop:'0'}}>
                        • Total Posts : 
                        <span style={{fontWeight:'bold' , marginLeft:'1vh'}}>{selectedUserDetails.totalPosts}</span>
                    </p>
                    <p  style={{marginTop:'0'}}>
                        • Skill Set : 
                        <span style={{fontWeight:'bold' , marginLeft:'1vh'}}> 
                            {selectedUserDetails.skills ? 
                                (selectedUserDetails.skills.split(',').map((skill) => (
                                    <span className='each-skill' style={{marginRight:'1vh'}}>{skill.trim()} </span>
                                )))
                                : 
                                <div>No skils avaialable</div>
                            }
                        </span>
                    </p>
                    <hr></hr>
                </ListGroup.Item>
                <ListGroup.Item as="li" className='activity-item'>
                    <p  style={{fontWeight:'bold' }}>Browse {selectedUserDetails.name}'s posts</p>
                    <div className='activity-block'>
                        <ListGroup as="ol" className='activity-list'>
                        {selectedUserDetails.posts && selectedUserDetails.posts.length > 0 ? (selectedUserDetails.posts.map(post =>(
                                <ListGroup.Item as="li" className='activity-list-item'>
                                    <div className="fw-bold" style={{color:'#d84434'}}>{post.channel}</div>
                                    <p style={{fontSize:'small'}} >{showPreview(post.post,10)}</p>
                                </ListGroup.Item>
                            )))
                            : 
                            (<ListGroup.Item as="li" className='activity-list-item'>
                                <div >No activities yet</div>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Offcanvas.Body>
    </Offcanvas>
    );
}



export async function fetchSelectedUserDetails(setSelectedUserDetails,otherUser){
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/selected-user',{
            params: {user: otherUser}
        });
        if (response.status === 200) {
            setSelectedUserDetails(response.data);
            console.log(response.data);
            console.log("Successfully retrieved selected user details");
        } 
        else if(response.status === 401){
            console.log(response.message)
        }
    } catch (error) {
        console.error("Catched axios error: ",error);
    }
};


export async function getUserDeatils(setUserDetails){
    const current_user = sessionStorage.getItem('auth_user');
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/user',{
            params: {user: current_user}
        });
        if (response.status === 200) {
            setUserDetails(response.data[0]);
            console.log("Successfully retrieved current user details");
        } 
        else{
            console.log(response.message)
        }
    } catch (error) {
        console.error("Catched axios error: ",error);
    }
}


export async function getAllChannels(setAllChannels){
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/allchannels');
        if (response.status === 200) {
            setAllChannels(response.data);
            console.log("Successfully retrieved all channels");
        } 
        else{
            console.log(response.message)
        }
    } catch (error) {
        console.error("Catched axios error: ",error);
    }
}

export async function handleChannelCreation(setFetchAgain,fetchAgain, data ){ 
    try {
        const response = await axios.post('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/createchannel', data);
        if (response.status === 200) {
            setFetchAgain(!fetchAgain);
            console.log("Successfully created channel")
        } 
        else{
            console.log(response.message)
        }
    } catch (error) {
        console.error("Catched axios error: ",error);
    }
      
}


export async function getActiveUsers(setActiveMembers){ 
    const current_user = sessionStorage.getItem('auth_user');
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/activeusers',{
            params: {user: current_user}
        });
        if (response.status === 200) {
            setActiveMembers(response.data);
            console.log("Successfully retrieved active members");
        } 
    }catch (error) {
        console.error("Catched axios error: ",error);    
    }      
}


export async function fetchConnectedUsers(setConnectedUsers){
    const current_user = sessionStorage.getItem('auth_user');
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/connectedusers',{ params: { user: current_user} });
        if (response.status === 200) {
            setConnectedUsers(response.data);
            console.log("Successfully retrieved all connected users");
        } 
        else {
            console.log(response.message)
        }
    } catch (error) {
        console.error("Catched axios error: ",error);
    }

}


export async function getMainPost(postId,setMainPost){
    try {
        const response = await axios.get('https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai/mainPost',{ params: { post: postId} });
        if (response.status === 200) {
            setMainPost(response.data);
            console.log("Successfully retrieved main post");
        } 
    }catch (error) {
        console.error("Catched axios error: ",error);
    }
}