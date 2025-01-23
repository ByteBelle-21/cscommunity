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
                navigateTo('/channels');
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
                authenticate(true,loginUsername);
                navigateTo('/channels');
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