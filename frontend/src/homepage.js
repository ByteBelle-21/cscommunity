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


function Homepage({authentication}) {
    const navigateTo = useNavigate()
    
    const [signupShow, setSignupShow] = useState(false)
    const openSignUp=()=>{
        setSignupShow(true)
    }
    const closeSignup= ()=>{
        setSignupShow(false)
    }

    const [signupUsername, setSignupUsername] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupName, setSignupName] = useState('')
    const [signupOccupation, setSignupOccupation] = useState('')
    const [signupSkills, setSignupSkills] = useState('')
    const [signupAvatar, setSignupAvatar] = useState('')


    const handleSignup =async(e)=>{
        e.preventDefault();
        const skillsArray = signupSkills.split(',').map(item => item.trim()).join(',');
        
        const data = {
            signupUsername, signupEmail, signupPassword, signupName, signupOccupation, skills: skillsArray, signupAvatar
        }
    
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/signup', data);
            if (response.status === 200) {
                authentication(true,signupUsername)
                navigateTo('/all-channels')
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }

    const [loginUsername, setLoginUsername] = useState('')
    
    const [loginPassword, setLoginPassword] = useState('')


    const handleLogin =async(e)=>{
        e.preventDefault();
        const data = {
            loginUsername, loginPassword
        }
    
        try {
            const response = await axios.post('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/login', data);
            if (response.status === 200) {
                authentication(true,loginUsername)
                navigateTo('/all-channels')
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
      
    }


    const [loginShow, setLoginShow] = useState(false)
    const openLogin=()=>{
        setLoginShow(true)
    }
    const closeLogin= ()=>{
        setLoginShow(false)
    }



    const goTOSignup=()=>{
        closeLogin();
        openSignUp();
    }

    const goToLogin=()=>{
        closeSignup();
        openLogin();
    }


    const [avatar, setAvatar] = useState(null)
    const handleAvatarClick=(index,imgNum)=>{
        setAvatar(index);
        setSignupAvatar(`/Group ${imgNum}.png`)

    }

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


    return (
    <div className='homepage'>

        <Stack direction="horizontal" gap={3} className="full-width-bands">
            <Nav.Link href="#" className="me-auto mx-4">CScommunity</Nav.Link>
            <Nav.Link href="#" onClick={openSignUp}>Sign Up</Nav.Link>
            <Nav.Link href="#" className="mx-4" onClick={openLogin}>Log In</Nav.Link>
        </Stack>

        <Modal size='lg' show={signupShow} onHide={closeSignup} centered style={{"--bs-modal-border-radius":'1vw', '--bs-modal-padding':'0'}} >
            <Modal.Body className='horizontal-placement'>
                <div className='form-img-text left-img vertical-placement'>
                    <h5 className='mb-0'>Welcome</h5>
                    <p>Engage, Explore, and Share</p>
                    <img src="/Group 196.png"/>
                </div>
                <div className='form-field vertical-placement'>
                    <Carousel slide={false} className='vertical-placement' ref={carouselRef}>
                        <Carousel.Item className='vertical-placement'>
                            <h5 className='mb-4'>Sign Up</h5>
                            <Form onSubmit={handleSignup}>
                                <Form.Group controlId="signup-username" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" className='mb-3' onChange={(e) => setSignupUsername(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="signup-email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" className='mb-3' onChange={(e) => setSignupEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="signup-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" className='mb-3' onChange={(e) => setSignupPassword(e.target.value)} />
                                </Form.Group>

                                    
                                    <Button  className="btn btn-primary w-100" onClick={goToNextForm} >Continue</Button>
                                
                                
                            </Form>
                            <Nav.Link style={{fontSize:'small',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                        </Carousel.Item>
                        <Carousel.Item className='vertical-placement'>
                            <h5 className='mb-4'>Sign Up</h5>
                            <Form onSubmit={handleSignup}>
                                <Form.Group controlId="signup-name" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" className='mb-3' onChange={(e) => setSignupName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="signup-occupation">
                                    <Form.Label>Occupation</Form.Label>
                                    <Form.Control type="text" placeholder="Enter occupation" className='mb-3' onChange={(e) => setSignupOccupation(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="signup-skills">
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Control type="text" placeholder="Enter skills" className='mb-3' onChange={(e) => setSignupSkills(e.target.value)} />
                                </Form.Group>
                                <Stack direction="horizontal" gap={3}>
                                    <Button  className="btn btn-primary w-100" onClick={goToPrevForm} >Go back</Button>
                                    <Button className="btn btn-primary w-100" onClick={goToNextForm} >Continue</Button>
                                </Stack>
                            </Form>
                            <Nav.Link style={{fontSize:'small',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                        </Carousel.Item>
                        <Carousel.Item className='vertical-placement'>
                            <h5 className='mb-4'>Sign Up</h5>
                            <Form >
                                <Form.Group controlId="signup-avatar">
                                    <Form.Label>Choose your Avatar</Form.Label>
                                        <Container className='wrap-container'>
                                            {[198, 199, 200, 205, 203, 204, 201, 206].map((imgNum, index) => (
                                                    <Button key={index} onClick={() => handleAvatarClick(index,imgNum)} className={avatar === index ? 'active' : ''}>
                                                        <img src={`/Group ${imgNum}.png`} alt={`Avatar ${index + 1}`} />
                                                    </Button>
                                            ))}
                                        </Container>
                                </Form.Group>
                                <Stack direction="horizontal" gap={3}>
                                    <Button className="btn btn-primary w-100" onClick={goToPrevForm} >Go back</Button>
                                    <Button type='submit' className="btn btn-primary w-100" onClick={handleSignup} >Sign Up</Button>
                                </Stack>
                            </Form>
                            <Nav.Link style={{fontSize:'small',marginTop:'0.5vw'}} onClick={goToLogin}>Already have an account? Log In</Nav.Link>
                        </Carousel.Item>
                    

                    </Carousel>
                    </div>
            </Modal.Body>
        </Modal>

        <Modal size='lg' show={loginShow} onHide={closeLogin} centered style={{"--bs-modal-border-radius":'1vw', '--bs-modal-padding':'0'}} >
            <Modal.Body className='horizontal-placement'>
                <div className='form-field vertical-placement'>
                    <h5 className='mb-4'>Log in</h5>
                    <Form  onSubmit={handleLogin}>
                        <Form.Group controlId="signup-username" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" className='mb-3' onChange={(e) => setLoginUsername(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="signup-password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" className='mb-3'onChange={(e) => setLoginPassword(e.target.value)}/>
                        </Form.Group>
                        <Button type='submit' className="btn btn-primary w-100" >Log in</Button>
                    </Form>
                    <Nav.Link style={{fontSize:'small',marginTop:'0.5vw'}} onClick={goTOSignup}>Don't have an account? Sign up</Nav.Link>
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
                <img src="/Group 180.png" style={{height:'20vh'}}/> 
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
                        <img src="/Group 186.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='info-card' style={{background:'#F9FAD6'}}>
                    <Card.Body className='vertical-placement'>
                        <img src="/Group 187.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='info-card' style={{background:"#FBD9F3"}}>
                    <Card.Body className='vertical-placement'>
                    <img src="/Group 189.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='info-card' style={{background:'#E8FFD6'}}>
                    <Card.Body className='vertical-placement'>
                        <img src="/Group 188.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
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
                <Card>
                    <Card.Body className='member-card'>
                        <div horizontal-placement>
                            <img src="/Group 205.png" style={{height:'5vh'}} /> Username

                        </div>
                        
                        <h6 className="mt-2">name sjhbcjh</h6>
                        <p style={{fontSize:'1.5vh'}}>⭐⭐⭐⭐</p>
                        
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
                        
                        <img src="/Group 206.png" style={{height:'5vh'}} /> Username
                        <h6 className="mt-2">name sjhbcjh</h6>
                        <p style={{fontSize:'1.5vh'}}>⭐⭐⭐⭐</p>
                        
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
                        
                        <img src="/Group 200.png" style={{height:'5vh'}} /> Username
                        <h6 className="mt-2">name sjhbcjh</h6>
                        <p style={{fontSize:'1.5vh'}}>⭐⭐⭐⭐</p>
                        
                    </Card.Body>
                </Card>
                
               
                <div style={{background:'#1A183F'}} className='vertical-placement'>
                        <h6 style={{color:'white'}}> + 30</h6>
                        <h6 style={{color:'white'}}>Members in our community</h6>    
                </div>
            </Container>
        </div>


        <Container className='board-container vertical-placement'>
            <h5>Our most popular discussion boards</h5>
            <div>
                <Stack direction="horizontal" gap={3} className='board-card'>
                    <div className=' me-auto'>
                        discussionboard
                        <p style={{fontSize:'small'}}>Created by xyz</p>
                    </div>
                    <div className='vertical-placement'>
                        Posts
                        <p style={{fontSize:'small'}}>30</p>
                    </div>
                    <div className='vertical-placement' >
                        Members
                        <p style={{fontSize:'small'}}>25</p>
                    </div>
                </Stack>
                <Stack direction="horizontal" gap={3} className='board-card'>
                    <div className=' me-auto'>
                        discussionboard
                        <p style={{fontSize:'small'}}>Created by xyz</p>
                    </div>
                    <div className='vertical-placement'>
                        Posts
                        <p style={{fontSize:'small'}}>30</p>
                    </div>
                    <div className='vertical-placement' >
                        Members
                        <p style={{fontSize:'small'}}>25</p>
                    </div>
                </Stack>
                <Stack direction="horizontal" gap={3} className='board-card'>
                    <div className=' me-auto'>
                        discussionboard
                        <p style={{fontSize:'small'}}>Created by xyz</p>
                    </div>
                    <div className='vertical-placement'>
                        Posts
                        <p style={{fontSize:'small'}}>30</p>
                    </div>
                    <div className='vertical-placement' >
                        Members
                        <p style={{fontSize:'small'}}>25</p>
                    </div>
                </Stack>
                <Stack direction="horizontal" gap={3} className='board-card'>
                    <div className=' me-auto'>
                        discussionboard
                        <p style={{fontSize:'small'}}>Created by xyz</p>
                    </div>
                    <div className='vertical-placement'>
                        Posts
                        <p style={{fontSize:'small'}}>30</p>
                    </div>
                    <div className='vertical-placement' >
                        Members
                        <p style={{fontSize:'small'}}>25</p>
                    </div>
                </Stack>
                <Stack direction="horizontal" gap={3} className='board-card'>
                    <div className=' me-auto'>
                        discussionboard
                        <p style={{fontSize:'small'}}>Created by xyz</p>
                    </div>
                    <div className='vertical-placement'>
                        Posts
                        <p style={{fontSize:'small'}}>30</p>
                    </div>
                    <div className='vertical-placement' >
                        Members
                        <p style={{fontSize:'small'}}>25</p>
                    </div>
                </Stack>
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
                <Button variant="danger" className='band-button'>Sign Up</Button>
                <Button variant="danger" className='band-button'>Log In</Button>
            </Container>
        </div>   

    </div>
  );
}

export default Homepage;