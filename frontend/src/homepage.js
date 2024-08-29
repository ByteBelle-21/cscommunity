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


function Homepage({authentication}) {

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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/signup', data);
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
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/login', data);
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


    // Functionality to retrieve 4 active memebers
    const [activeMembers, setActiveMembers] = useState([]);

    useEffect(()=>{
        const fetchMembers= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/activeusers');
                if (response.status === 200) {
                    setActiveMembers(response.data);
                    console.log("Successfully retrieved active members");
                } 
            }catch (error) {
                console.error("Catched axios error: ",error);    
            }
        }
        fetchMembers();  
    },[]);


    // Functionality to retrieve total number of users
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(()=>{
        const fetchTotalMembers= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/totalUsers');
                if (response.status === 200) {
                    setTotalUsers(response.data -1);
                    console.log("Successfully retrieved total numebrs of users");
                } 
            }catch (error) {
                console.error("Catched axios error: ",error);    
            }
        }
        fetchTotalMembers();  
    },[]);



    // Functionality to retrieve 6 populat channels
    const [popularChannels, setPopularChannels] = useState([]);

    useEffect(()=>{
        const fetchChannels= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/popularchannels');
                if (response.status === 200) {
                    setPopularChannels(response.data);
                    console.log("Successfully retrieved popular channels");
                } 
            }catch (error) {
                console.error("Catched axios error: ",error);
            }
        }
        fetchChannels();  
    },[]);


    // Functionality to calculate the rating for user
    const handleRating = (likes, posts)=>{
        if (posts === 0){
            return "⭐️"
        }
        else if(likes/posts >= 5){
            return "⭐️⭐️⭐️⭐️⭐️"
        }
        else if(likes/posts >= 3 && likes/posts < 5){
            return "⭐️⭐️⭐️⭐️"
        }
        else if(likes/posts >= 1 && likes/posts < 3){
            return "⭐️⭐️⭐️"
        }
        else {
            return "⭐️⭐️"
        }
    }


 
    return (
        <div className='page-layout'>
            <Stack direction="horizontal" gap={3} className="navbar">
                <Nav.Link className="me-auto">CScommunity</Nav.Link>
                <Nav.Link onClick={openSignUp}>Sign Up</Nav.Link>
                <Nav.Link onClick={openLogin}>Log In</Nav.Link>
            </Stack>
            <Modal size='lg' backdrop="static" keyboard={false} show={signupShow} onHide={closeSignup} centered style={{"--bs-modal-border-radius":'1vw', '--bs-modal-padding':'0'}} >
                <Modal.Body className='horizontal-placement'>
                    <div className='form-img-text left-img vertical-placement'>
                        <h5 className='mb-0'>Welcome</h5>
                        <p>Engage, Explore, and Share</p>
                        <img src="/Group 196.png"/>
                    </div>
                    <div className='form-field vertical-placement'> 
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
                                <Nav.Link style={{fontSize:'0.9vw',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                            </Carousel.Item>
                            <Carousel.Item className='vertical-placement'>
                                <h5 className='mb-4'>Sign Up</h5>
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
                                <Nav.Link style={{fontSize:'0.9vw',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
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
                                    {showSignupAlert && <Alert variant="danger" style={{fontSize:'0.9vw'}}> 💡Please fill out all required fields</Alert>}
                                    {showSignUp401 && <Alert variant="danger" style={{fontSize:'0.9vw'}} >{signUp401Message}</Alert> }
                                    <Stack direction="horizontal" gap={3}>
                                        <Button className="btn btn-primary w-100" onClick={goToPrevForm} >Go back</Button>
                                        <Button className="btn btn-primary w-100" onClick={handleSignup} >Sign Up</Button>
                                    </Stack>
                                </Form>
                                <Nav.Link style={{fontSize:'0.9vw',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                            </Carousel.Item>
                        </Carousel>
                        </div>
                </Modal.Body>
            </Modal>
            <Modal size='lg'  backdrop="static" keyboard={false} show={loginShow} onHide={closeLogin} centered style={{"--bs-modal-border-radius":'1vw', '--bs-modal-padding':'0'}} >
                <Modal.Body className='horizontal-placement'>
                    <div className='form-field vertical-placement'>
                        <h5 className='mb-4'>Log in</h5>
                        <Form  onSubmit={handleLogin}>
                            <Form.Group controlId="signup-username" >
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" className='mb-3' onChange={(e) => {setLoginUsername(e.target.value); setShowLoginAlert(false);}}/>
                            </Form.Group>
                            <Form.Group controlId="signup-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className='mb-3'onChange={(e) => {setLoginPassword(e.target.value); setShowLoginAlert(false);}}/>
                            </Form.Group>
                            {showLoginAlert && <Alert variant="danger" style={{fontSize:'0.9vw'}}>💡Please fill out all required fields</Alert>}
                            {showLogIn401 && <Alert variant="danger" style={{fontSize:'0.9vw'}}>{logIn401Message}</Alert>}
                            <Stack direction="horizontal" gap={3}>
                                <Button  className="btn btn-primary w-100" onClick={closeLogin} >Cancle</Button>
                                <Button type='submit' className="btn btn-primary w-100" >Log in</Button>
                            </Stack>  
                        </Form>
                        <Nav.Link style={{fontSize:'0.9vw',marginTop:'0.5vw'}} onClick={goTOSignup}>Don't have an account? Sign up</Nav.Link>
                    </div>

                    <div className='form-img-text right-img vertical-placement'>
                        <h5 className='mb-0'>Welcome Back</h5>
                        <p>Engage, Explore, and Share</p>
                        <img src="/Group 196.png"/>
                    </div>
                </Modal.Body>
            </Modal>
            <div className='welcome-board vertical-placement'>
                <Container className='title vertical-placement'>
                    <h4 className='mb-0'>Welcome to our Community</h4>
                    <p className='mb-0'>Every question sparks a new idea, and every answer brings us closer to a solution.</p>
                </Container>
                <Container className='people-group horizontal-placement'>
                    <img src="/Group 183.png"  />
                    <img src="/Group 182.png"  />
                    <img src="/Group 168.png"  />
                    <img src="/Group 174.png"  />
                    <img src="Desktop - 15.png"/>
                    <img src="/Group 162.png"  />
                    <img src="/Group 176.png"  />
                    <img src="/Group 179.png"  />
                    <img src="/Group 180.png" style={{height:'10vw'}}/> 
                </Container>  
            </div>
            <Container className='text-img-container horizontal-placement'>
                <Container>
                    <h5>Feeling stuck and can’t find solutions ? <br/>Just ask our community !</h5>
                    <p>Post your question and let our community guide you to the answer
                        We're here to help, one solution at a time! Whether you're seeking 
                        advice, troubleshooting an issue, or just curious about something,
                        you're in the right place.
                    </p>
                    <p style={{color:'red'}}>Join Our Community</p>       
                </Container>
                <Container className='working-boy vertical-placement'>
                    <img src="/Group 185.png"/>
                </Container>
            </Container>


            <Container className="vertical-placement">
                <h5>Engage, Explore, and Share</h5>
                <Container className='horizontal-placement'>
                    <Card className='info-card' style={{background:"#FFDFDF"}}> 
                        <Card.Body className='vertical-placement'>
                            <img src="/Group 186.png" style={{height:'7.5vw'}}/>
                            <Card.Text style={{marginTop:'1vw'}}>
                                Launch your own channel and start sharing your unique perspective with the world.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='info-card' style={{background:'#F9FAD6'}}>
                        <Card.Body className='vertical-placement'>
                            <img src="/Group 187.png" style={{height:'7.5vw'}}/>
                            <Card.Text style={{marginTop:'1vw'}}>
                                Get answers to your burning questions — Just ask, and our community will respond.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='info-card' style={{background:"#FBD9F3"}}>
                        <Card.Body className='vertical-placement'>
                        <img src="/Group 189.png" style={{height:'7.5vw'}}/>
                            <Card.Text style={{marginTop:'1vw'}}>
                                Jump in anytime — Your insights are welcome on any post, whenever you're ready.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className='info-card' style={{background:'#E8FFD6'}}>
                        <Card.Body className='vertical-placement'>
                            <img src="/Group 188.png" style={{height:'7.5vw'}}/>
                            <Card.Text style={{marginTop:'1vw'}}>
                                Easily find what you're looking for — Quickly search for people, channels, or posts.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>

            <Container className='text-img-container horizontal-placement'>
                <Container className='working-team'>
                    <img src="/Group 191.png" />
                </Container>
                <Container >
                    <h5>Enhance Your Posts: Upload Images, Files, and Code</h5>
                    <p>Make your posts more engaging by easily uploading images, 
                        files, and code snippets. Share your ideas in full detail 
                        and connect with others through rich, multimedia content.
                    </p>
                </Container>
            </Container>


            <div className='full-width-bands vertical-placement'>
                <h5 className='mb-4'>Meet Some of our <span style={{color:"red"}}>Active</span> Members</h5>
                <Container className='horizontal-placement'>
                    {activeMembers.length > 0 && activeMembers.map(member=>(
                        <Card>
                            <Card.Body className='member-card'>
                                <img src={member.avatar} style={{height:'2.5vw'}} /><span style={{fontSize:'0.9vw'}}>  {member.username}</span> 
                                <h6 style={{marginTop:'0.2vw'}}>{member.name}</h6>
                                <p style={{fontSize:'0.9vw'}}>{handleRating(member.likes,member.totalPosts)}</p>  
                            </Card.Body>
                        </Card>

                    ))}
                    <div style={{background:'#1A183F'}} className='vertical-placement'>
                            <h6 style={{color:'white'}}> + {totalUsers}</h6>
                            <h6 style={{color:'white'}}>Members in our community</h6>    
                    </div>
                </Container>
            </div>

            <Container className='board-container vertical-placement'>
                <h5>Our most popular discussion boards</h5>
                <div>
                    {popularChannels.length > 0 && popularChannels.map(channel=>(
                        <Stack direction="horizontal" gap={3} className='board-card'>
                            <div className=' me-auto'>
                                {channel.channel}
                                <p style={{fontSize:'small'}}>Created by {channel.username}</p>
                            </div>
                            <div className='vertical-placement'>
                                Posts
                                <p style={{fontSize:'small'}}>{channel.totalposts}</p>
                            </div>
                            <div className='vertical-placement' >
                                Members
                                <p style={{fontSize:'small'}}>{channel.totalpeople}</p>
                            </div>
                        </Stack>
                    ))}
                </div>   
            </Container>

            <Container className='text-img-container horizontal-placement'>
                    <Container>
                        <h5>Connect Directly: Message and Network with Ease</h5>
                        <p>With our new direct messaging feature, you can now connect 
                            with people one-on-one. Start conversations, exchange ideas, 
                            and build your network effortlessly.
                        </p>
                    </Container>
                    <Container className='greeting-people'>
                        <img src="/Group 194.png"/>
                    </Container>
            </Container>

            <div className='full-width-bands horizontal-placement'>
                <Container className='last-band-content'>
                    <h6>About Us</h6>
                    <p style={{fontSize:'small'}}>Welcome to CScommunity, a platform for computer technology 
                            enthusiasts and professionals. Share your knowledge, connect 
                            with others, and explore the latest trends in tech. Whether 
                            you're posting code, asking questions, or messaging peers, 
                            our community is here to support your journey in technology.</p>
                </Container>
                <Container className='last-band-content vertical-placement'>
                    <h6>Join Us</h6>
                    <Button variant="danger" className='band-button' onClick={openSignUp}>Sign Up</Button>
                    <Button variant="danger" className='band-button' onClick={openLogin}>Log In</Button>
                </Container>
            </div>   

        </div>
  );
}

export default Homepage;