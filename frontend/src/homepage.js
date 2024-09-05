import './UniformStyle.css';
import './homepage.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useRef } from 'react';
import Alert from 'react-bootstrap/Alert';
import { fetchActiveMembers ,fetchPopularChannels,handleRating,recognizeDevice} from './functions.js';


function Homepage({authentication}) {
    useEffect(()=>{
        fetchMembers();
        fetchTotalMembers();
        fetchChannels();
    },[])

    // Navigate to different routes in application
    const navigateTo = useNavigate()
    

    // Sign up functionality
    const [signupShow, setSignupShow] = useState(false);
    const [signupUsername, setSignupUsername] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupOccupation, setSignupOccupation] = useState('');
    const [signupSkills, setSignupSkills] = useState('');
    const [signupAvatar, setSignupAvatar] = useState('');
    const [showSignupAlert, setShowSignupAlert] = useState(false);
    const [showSignUp401, setShowSignUp401] = useState(false);
    const [signUp401Message, setSignUp401Message] = useState('');

    const openSignUp=()=>{
        setSignupShow(true);
    }
    const closeSignup= ()=>{
        setSignupShow(false);
    }


    // Functionality to choose the avatar
    const [avatar, setAvatar] = useState(null)
    const handleAvatarClick=(index,imgNum)=>{
        setShowSignupAlert(false);
        setAvatar(index);
        setSignupAvatar(`/Group ${imgNum}.png`)

    }


    // Functionality to move between signup forms
    const carouselRef = useRef(null)
    const goToNextForm=()=>{
        if (carouselRef.current) {
            carouselRef.current.next();
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
        if(skillsArray.length ==0 || !signupUsername || !signupEmail || !signupPassword || !signupName || !signupOccupation || !signupAvatar){
            setShowSignupAlert(true);
            return;
        }
        openSignUp(false);
        const data = {
            signupUsername, signupEmail, signupPassword, signupName, signupOccupation, skills: skillsArray, signupAvatar
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//signup', data);
            if (response.status === 200) {
                authentication(true,signupUsername);
                navigateTo('/all-channels');
            } 
        } catch (error) {
            if(error.response.status === 401){
                setShowSignUp401(true);
                setSignUp401Message(error.response.data);
               
            }
            else{
                console.error("Catched axios error: ",error);
            }
        }
      
    }
    
    
    // Log in functionality
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [showLogIn401, setShowLogIn401] = useState(false);
    const [logIn401Message, setLogIn401Message] = useState('');
    const [loginShow, setLoginShow] = useState(false);

    const openLogin=()=>{
        setLoginShow(true)
    }

    const closeLogin= ()=>{
        setLoginShow(false)
    }

    const handleLogin =async(e)=>{
        e.preventDefault();
        if( !loginUsername || !loginPassword){
            setShowLoginAlert(true);
            return;
        }
        openLogin(false);
        const data = {
            loginUsername, loginPassword
        }
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//login', data);
            if (response.status === 200) {
                authentication(true,loginUsername);
                navigateTo('/all-channels');
            }     
        } catch (error) {
            if(error.response.status === 401){
                setShowLogIn401(true);
                setLogIn401Message(error.response.data);
            }
            else{
                console.error("Catched axios error: ",error);
            }     
        } 
    }


    // Go to signup page from login page
    const goTOSignup=()=>{
        closeLogin();
        setShowLogIn401(false);
        setLogIn401Message('');
        setShowLoginAlert(false);
        setShowSignupAlert(false);
        openSignUp();
    }


    // Go to login page from signup page
    const goToLogin=()=>{
        closeSignup();
        setShowSignUp401(false);
        setSignUp401Message('');
        setShowLoginAlert(false);
        setShowSignupAlert(false);
        openLogin();
    }


    // Functionality to retrieve  active memebers
    const [activeMembers, setActiveMembers] = useState([]);
    const fetchMembers= async()=>{
        try {
            const response = await fetchActiveMembers();
            if (response != null) {
                setActiveMembers(response);
            } 
        }catch (error) {
            console.error("Catched error during retrieving active users: ",error);    
        }
    }
  



    // Functionality to retrieve total number of users
    const [totalUsers, setTotalUsers] = useState(0);
    const fetchTotalMembers= async()=>{
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//totalUsers');
            if (response.status === 200) {
                setTotalUsers(response.data -1);
                console.log("Successfully retrieved total numebrs of users");
            } 
        }catch (error) {
            console.error("Catched axios error: ",error);    
        }
    }
        




    // Functionality to retrieve 6 populat channels
    const [popularChannels, setPopularChannels] = useState([]);
    const fetchChannels= async()=>{
        try {
            const response = await fetchPopularChannels();
            if (response != null) {
                setPopularChannels(response);
            } 
        }catch (error) {
            console.error("Catched error during retrieving popular channels: ",error);    
        }
    }
        

    const [device, setDevice] = useState();
    useEffect(() => {
        const fetchDeviceType= ()=>{
            try {
                const response = recognizeDevice();
                if (response != null) {
                    setDevice(response);
                } 
            }catch (error) {
                console.error("Catched error during retrieving popular channels: ",error);    
            }
        }
        window.addEventListener('resize', fetchDeviceType);
        fetchDeviceType(); 

        return () => window.removeEventListener('resize', fetchDeviceType);
    }, []);


 
    return (
        <Container className='page-layout'>
            <Stack direction="horizontal" gap={4} className="navbar">
                <Nav.Link className="me-auto">CScommunity</Nav.Link>
                <Nav.Link onClick={openSignUp}>Sign Up</Nav.Link>
                <Nav.Link onClick={openLogin}>Log In</Nav.Link>
            </Stack> 
            <Modal size='lg' backdrop="static" keyboard={false} show={signupShow} onHide={closeSignup} centered style={{"--bs-modal-border-radius":'1vw', '--bs-modal-padding':'0'}} >
                <Modal.Body className='modal-body'>
                        {device !==0 && 
                            <Container className='form-img-text left-img vertical-placement'>
                                <h5 className='mb-0'>Welcome</h5>
                                <p>Engage, Explore, and Share</p>
                                <img src="/Group 196.png"/>
                            </Container>
                        }
                        <Container className='form-field vertical-placement'> 
                            <Carousel interval={600000} className='vertical-placement' ref={carouselRef}>
                                <Carousel.Item className='vertical-placement'>
                                    <h5 className='mb-4'>Sign Up</h5>
                                    <Form onSubmit={handleSignup}>
                                        <Form.Group controlId="signup-username" >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Enter username" className='mb-3' onChange={(e) => {setSignupUsername(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-email">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" className='mb-3' onChange={(e) => {setSignupEmail(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" className='mb-3' onChange={(e) => {setSignupPassword(e.target.value); setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button  className="btn btn-primary w-100" onClick={closeSignup} >Cancle</Button>
                                            <Button  className="btn btn-primary w-100" onClick={goToNextForm} >Continue</Button>
                                        </Stack>   
                                    </Form>
                                    <Nav.Link className='modal-question' onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                                </Carousel.Item>
                                <Carousel.Item className='vertical-placement'>
                                    <h5 className='mb-4 '>Sign Up</h5>
                                    <Form onSubmit={handleSignup}>
                                        <Form.Group controlId="signup-name" >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" className='mb-3' onChange={(e) => {setSignupName(e.target.value) ; setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-occupation">
                                            <Form.Label>Occupation</Form.Label>
                                            <Form.Control type="text" placeholder="Enter occupation" className='mb-3' onChange={(e) => {setSignupOccupation(e.target.value) ; setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-skills">
                                            <Form.Label>Skills</Form.Label>
                                            <Form.Control type="text" placeholder="Enter skills" className='mb-3' onChange={(e) => {setSignupSkills(e.target.value) ; setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Stack direction="horizontal" gap={3}>
                                            <Button  className="btn btn-primary w-100" onClick={goToPrevForm} >Go back</Button>
                                            <Button className="btn btn-primary w-100" onClick={goToNextForm} >Continue</Button>
                                        </Stack>
                                    </Form>
                                    <Nav.Link className='modal-question'  onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                                </Carousel.Item>
                                <Carousel.Item className='vertical-placement'>  
                                    <h5 className='mb-4'>Sign Up</h5>
                                    <Form className='from3'>
                                        <Form.Group controlId="signup-avatar">
                                            <Form.Label>Choose your Avatar</Form.Label>
                                                <Container className='wrap-container'>
                                                    {[300, 301, 302, 303, 304, 305, 306, 307].map((imgNum, index) => (
                                                            <Button key={index} onClick={() => handleAvatarClick(index,imgNum)} className={avatar === index ? 'active' : ''}>
                                                                <img src={`/Group ${imgNum}.png`} alt={`Avatar ${index + 1}`} />
                                                            </Button>
                                                    ))}
                                                </Container>
                                        </Form.Group>
                                        {showSignupAlert && <Alert variant="danger" className='modal-question'> 💡Please fill out all required fields</Alert>}
                                        {showSignUp401 && <Alert variant="danger" className='modal-question' >{signUp401Message}</Alert> }
                                        <Stack direction="horizontal" gap={3}>
                                            <Button className="btn btn-primary w-100" onClick={goToPrevForm} >Go back</Button>
                                            <Button className="btn btn-primary w-100" onClick={handleSignup} >Sign Up</Button>
                                        </Stack>
                                    </Form>
                                    <Nav.Link className='modal-question' onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                                </Carousel.Item>
                            </Carousel>
                            </Container>
                    </Modal.Body>
            </Modal>                  
        </Container>
  );
}

export default Homepage;