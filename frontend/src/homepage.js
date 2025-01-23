import './Homepage.css';
import './Uniformstyle.css';
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
import {SignInModal} from './functions.js';


function Homepage({authentication}){
    const [signupShow, setSignupShow] = useState(false);
    const openSignUp=()=>{
        setSignupShow(true);
    }
    const closeSignup= ()=>{
        setSignupShow(false);
    }
    
    return(
        <div className='homepage'>
            <SignInModal authenticate={authentication} showSignUpModal={signupShow} closeSignUpModal={closeSignup} />
            <Stack direction="horizontal" gap={4} className='welcome-block'>
                <div className="me-auto">
                    <p className='welcome-headline'> 
                        Welcome to <br></br> Our Community
                    </p>
                    <p className='mfont'> 
                        Feeling stuck and can't find solutions ?
                        <br></br>Post your question and let our community guide you to the answer. 
                    </p>
                    <Button className='rfont action-button' onClick={openSignUp}> Get Started </Button>
                </div>
                <div>
                    <img className='hero-img' src="/Group 210.png"/>
                </div>
            </Stack>
            <div>
                <Stack direction="horizontal" gap={5} className='highlights'>
                    <div className='hero-points rfont'>
                        <span class="material-symbols-outlined icons">rocket_launch</span>
                        <p>
                            Step into the spotlight by <span style={{color:'#f54d3b'}}>launching your own channel</span>, 
                            where you can share your unique viewpoint,
                            spark meaningful conversations, and connect with like-minded individuals
                        </p>
                    </div> 
                    <div className='hero-points rfont'>
                        <span class="material-symbols-outlined icons">location_searching</span>
                        <p>
                        Quickly discover exactly what you're looking for by <span style={{color:'#f54d3b'}}>searching 
                        for people, channels, or posts </span>that match your interests, 
                        ensuring a seamless browsing experience
                        </p>
                    </div>
                    <div className='hero-points rfont'>
                        <Stack direction='horizontal'>
                        <span class="material-symbols-outlined icons">description</span>
                        </Stack>
                        <p>
                        Make your posts more engaging by <span style={{color:'#f54d3b'}}>easily uploading images, files, and 
                        code snippets.</span> Share your ideas in full detail and 
                        connect with others through rich, multimedia content.
                        </p>
                    </div>
                </Stack>
            </div>
            <Stack className='feature-block' direction='horizontal'gap={4} >
                <img src="/Vector.png" className=' me-auto vector-img'></img>
                <div>
                    <p className='lfont' style={{fontWeight:'bold'}}>
                        <span style={{color:'#f54d3b'}}>Connect Directly:</span> Message and network with Ease
                    </p>
                    <p className='rfont'>
                        With our new direct messaging feature, you can now 
                        connect with people one-on-one. <br/>Start conversations, 
                        exchange ideas, and build your network effortlessly.
                    </p>
                </div>     
            </Stack>
            <div className='footbar'>
                <p className='mfont' style={{fontWeight:'bold'}}>Join Our Community</p>
                <p className='rfont'> Don’t miss out! Join others who are already 
                    engaging, learning, and growing. 
                    <br></br>
                    Get started now – 
                    it's free and easy!
                </p>
               <Button className='footbar-btn' onClick={openSignUp}> Join Us </Button> 
            </div> 
        </div>
     
    );
}

export default Homepage;