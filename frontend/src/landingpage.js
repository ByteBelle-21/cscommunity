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
import ModalBody from 'react-bootstrap/esm/ModalBody.js';


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
    const [showSignupAlert, setShowSignupAlert] = useState(false);
    const [showSignUp401, setShowSignUp401] = useState(false);
    const [signUp401Message, setSignUp401Message] = useState('');

    const openSignUp=()=>{
        setSignupShow(true);
    }
    const closeSignup= ()=>{
        setSignupShow(false);
        setShowLogIn401(false);
        setShowLoginAlert(false);
        setShowSignUp401(false);
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
        openSignUp(false);
        const signupAvatar = '/Group 216.png'
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
            <Stack direction="horizontal" className="navbar">
                <Nav.Link className="me-auto">
                    CScommunity
                </Nav.Link>
                <Nav.Link onClick={openSignUp} style={{background:"black", 
                                                       marginRight:'1vw',
                                                       color:"white", 
                                                       paddingLeft:"1vw", 
                                                       paddingRight:"1vw", 
                                                       paddingTop:"0.5vw",
                                                       paddingBottom:"0.5vw",
                                                       borderRadius:'1vw' }}>
                    Lets Connect
                </Nav.Link>    
            </Stack>
            <Modal size='lg' 
                   backdrop="static" 
                   keyboard={false} 
                   show={signupShow} 
                   onHide={closeSignup} 
                   centered style={{"--bs-modal-border-radius":'2vw',
                   '--bs-modal-padding':0,height:'60vh', width:'50vw',
                   '--bs-modal-margin':0,
                   overflowY:'hidden',
                   left:'25vw',
                   top:'20vh',
                   zIndex:100000}} >
                <ModalBody style={{height:'60vh', width:'50vw', zIndex:100000}}>
                    <div className="form">
                        <div className='slide-over'>
                            <div className='slide-panel left-slide-over'>
                                <p style={{fontSize:'1.5vw',fontWeight:'bold'}}>
                                    Hello, Friend!
                                </p>
                                <p>Don't have an account ?</p>
                                <Button onClick={setActive}>
                                    Sign Up
                                </Button>
                            </div>
                            <div className=' slide-panel right-slide-over'>
                                <p style={{fontSize:'1.5vw',fontWeight:'bold'}}>
                                    Welcome Back!
                                </p>
                                <p>Already have an account ?</p>
                                <Button onClick={removeActive}>
                                    Log In
                                </Button>
                            </div> 
                        </div>
                        <div className='form-field login'>
                            {showLoginAlert && <Alert variant="danger" 
                                                      className='modal-question'
                                                      style={{padding:'0.1vw'}}> 
                                                    💡Please fill out all required fields
                                                </Alert>}
                            {showLogIn401 && <Alert variant="danger" 
                                                    className='modal-question'
                                                    style={{padding:'0.1vw'}} >
                                                    {logIn401Message}
                                                    </Alert> }
                            {!showLogIn401 && !showLoginAlert  && 
                                <p style={{fontSize:'2vw',fontWeight:'bold'}} className='mb-4'>
                                    Log In
                            </p>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="signup-username" >
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" 
                                                  placeholder="Enter username" 
                                                  className='mb-3' 
                                                  onChange={(e) => {
                                                    setLoginUsername(e.target.value); 
                                                    setShowLoginAlert(false);}} />
                                </Form.Group>
                                <Form.Group controlId="signup-password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" 
                                                  placeholder="Password" 
                                                  className='mb-3' 
                                                  onChange={(e) =>{
                                                    setLoginPassword(e.target.value); 
                                                    setShowLoginAlert(false);}} />
                                </Form.Group>
                                <Stack direction="horizontal" gap={3}>
                                    <Button  className="btn btn-primary w-100" 
                                             onClick={closeSignup} >
                                        Cancle
                                    </Button>
                                    <Button onClick={handleLogin} className="btn btn-primary w-100">
                                        Log in
                                    </Button>
                                </Stack>   
                            </Form>

                        </div>
                        <div className='form-field SignUp'>
                            {showSignupAlert && <Alert variant="danger" 
                                                       className='modal-question'
                                                       style={{padding:'0.1vw'}}> 
                                                            💡Please fill out all required fields
                                                </Alert>}
                            {showSignUp401 && <Alert variant="danger" 
                                                     className='modal-question'
                                                     style={{padding:'0.1vw'}} >
                                                        {signUp401Message}
                                                </Alert> }
                                        
                            {!showSignUp401 && !showSignupAlert &&  
                            <p style={{fontSize:'2vw',fontWeight:'bold'}} 
                            className='mb-4'>Sign Up</p>}
                            <Carousel style={{height:'70%'}} interval={600000} 
                                className='vertical-placement' 
                                ref={carouselRef}>
                                <Carousel.Item className='vertical-placement'>
                                    <Form onSubmit={handleSignup}>
                                            <Form.Group controlId="signup-username" >
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" 
                                                placeholder="Enter username" className='mb-3' onChange={(e) => {setSignupUsername(e.target.value); setShowSignupAlert(false);}} />
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
                                </Carousel.Item>
                                <Carousel.Item className='vertical-placement'>
                                  
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
                                            <Button className="btn btn-primary w-100" onClick={handleSignup} >Sign Up</Button>
                                        </Stack>
                                    </Form>
                                    
                                </Carousel.Item>
                            </Carousel>
                </div> 
            </div >
            </ModalBody>
           </Modal>
           
            <div style={{height:'50vh',
                               marginTop:'1vh',
                               background:'#e9ff4f', 
                               marginLeft: '2vw',
                               marginRight:'2vw',
                               borderRadius:'1vw',
                               padding:'2vw'
                               }}>
                <Stack direction="horizontal" gap={4}>
                    <div className="me-auto">
                        <p style={{fontSize:'3vw', fontWeight:'bold'}}> 
                            Welcome to <br></br> Our Community
                        </p>
                        <p style={{fontSize:'1vw'}}> 
                            Every Question Sparks New Idea and every Answer bring Closer to Solution.
                            <br></br>Join the conversation and let's make rogress together ! 
                        </p>
                        <Button style={{background:'black',
                                        border:'black',
                                        color:'white',
                                        display:'inline-block', 
                                        padding:'0.5vw'}}>
                                            Find out more 
                                        </Button>
                    </div>
                    <div>
                        <img style={{height:'50vh', 
                                     transform:'rotate(15deg)',
                                     marginRight:'1vw',
                                     border:'1vw solid #e68d83',
                                     boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)'}} 
                                     src="/Group 210.png"/>
                    </div>
                </Stack>               
            </div>
            <div style={{padding:'2vw'}}>
                <p style={{fontSize:'1.5vw', fontWeight:'bold',margin:'2vw'}}> 
                    Feeling stuck and can't find solutions ?
                    <br></br>Just Ask our community !
                </p>
                <Stack direction='horizontal' gap={5} style={{margin:'2vw'}}>
                    <div style={{background:"#f5f4f2", 
                                width:"30%", 
                                height:'30vh',
                                padding:'2vw',
                                borderRadius:'0.5vw',
                                position:'relative',
                                zIndex:1}}>
                        <p style={{fontWeight:"bold", 
                                    zIndex:10000,
                                    position: 'relative'}}>We're here to help</p>
                        <p style={{zIndex:100000,position: 'relative'}}>
                            Post your question and let our community guide you to the answer. 
                            Whether you're seeking advide,troubleshooting an issue, or just 
                            curious about something, you're in the right place.
                        </p>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'7vw',
                            width:'15vh',
                            background:'#e9ff4f',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        

                    </div>
                    <div style={{background:"#f5f4f2", 
                                width:"70%", 
                                height:'30vh',
                                padding:'2vw',
                                borderRadius:'0.5vw',
                                position:'relative',
                                zIndex:1}}>
                                    
                        <p style={{fontWeight:"bold", position:'relative',zIndex:100000}}>
                            Engage, Explore, and Share
                        </p>
                        <p style={{position:'relative',zIndex:100000}} >
                        We believe in providing you with the tools to engage, 
                            explore, and share in a meaningful way. 
                        <br></br>
                        Whether you’re engaging with others, starting a conversation,
                            or finding valuable content, our goal is to empower you to make 
                            the most of your experience in the community.
                        </p>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'26vh',
                            width:'25vh',
                            background:'#e9ff4f',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'22vh',
                            width:'22vh',
                            background:'#f5f4f2',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'21vh',
                            width:'35vh',
                            background:'#e68d83',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'22vh',
                            width:'22vh',
                            background:'#f5f4f2',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>

                        </div>
                        </div>
                    </div>
               
                </Stack>
               
                <div style={{marginTop:'6vw',
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'
                        }} >
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width:'20vw',
                                height:'35vh'}}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e9ff4f', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                            Create your own space
                        </Stack>
                        
                        <br></br>
                        <p style={{paddingLeft:'2vw'}}>
                        Step into the spotlight by launching your own channel, where you 
                        can share your unique viewpoint, spark meaningful conversations,
                         and connect with like-minded individuals
                        </p>

                    </Container>
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width:'20vw',
                                height:'35vh'}}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e68d83', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                            Search Made Simple
                        </Stack>
                        <br></br>
                        <p style={{paddingLeft:'2vw'}}>
                        Quickly discover exactly what you're looking for by searching for 
                        people, channels, or posts that match your interests, ensuring a 
                        seamless browsing experience
                       </p>
                    </Container> 
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width:'20vw',
                                height:'35vh'}}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e9ff4f', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                            Enhance Your Posts
                        </Stack>
                        <br></br>
                        <p style={{paddingLeft:'2vw'}}>
                        Make your posts more engaging by easily uploading images,
                         files, and code snippets. Share your ideas in full 
                         detail and connect with others through rich, multimedia 
                         content.
                       </p>
                    </Container> 
                </div>
                <Stack style={{height:'30vh',
                               marginTop:'10vw',
                               background:'black', 
                               marginLeft: '2vw',
                               marginRight:'2vw',
                               color:'white',
                               padding:'2vw',
                               borderRadius:'1vw'
                               }}
                        direction='horizontal'
                        gap={4}>
                    <img src="/Vector.png" 
                         style={{height:'40vh',
                                 border:'1vw solid #e9ff4f',
                                 transform:'rotate(-15deg)',
                                 boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                         }}></img>
                         <div>
                            <p style={{fontSize:'1.2vw', fontWeight:'bold'}}>
                                Connect Directly: Message and network with Ease
                            </p>
                            With our new direct messaging feature, you can now 
                            connect with people one-on-one. Start conversations, 
                            exchange ideas, and build your network effortlessly.
                         </div>     
                </Stack>
            </div>
            <div style={{display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:'5vw'
                }}>
                <div>
                    <p style={{fontSize:'1.5vw', 
                               fontWeight:'bold'}}>
                        Meet Some of Our <span style={{color:'#f57567'}}>
                         Active
                        </span> Members
                    </p>
                </div>
                
                <Container direction='horizontal' 
                       style={{margin:'3vw',
                               width:'80%',
                               display:'flex',
                               alignItems:'center',
                               justifyContent:'center',
                               
                       }}>
                    <Container style={{height:'10vw',
                                       width:'10vw',
                                       background:'#f7f7f7',
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                       width:'10vw',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                       width:'10vw',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                       width:'10vw',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                       width:'10vw',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                </Container>
            </div>
            <Stack direction= "horizontal" 
                   style={{ 
                           margin:'4vw',
                           height:'30vh',
                   }}>
                <div className="me-auto"  style={{width:'50%'}}>
                    <p style={{fontSize:'1.5vw', 
                            fontWeight:'bold'}}>
                        Seamless Access on Any Device
                    </p>
                    <p>Stay connected wherever you are! Our platform is 
                        fully optimized for mobile, tablet, and desktop, 
                        making it easy to engage, explore, and share on the go.
                        <br></br>
                        Just a tap away from the conversation !</p>
                </div>
                <img src="/Group 215.png" style={{height:'30vh'}}></img>                
            </Stack>
            <div style={{
                         width:"100%",
                         background:'black',
                         marginTop:'5vh',
                         padding:'1vw',
                         display:'flex',
                         flexDirection:'column',
                         alignItems:'center'}}>
                
                <p style={{fontSize:'2vw', 
                            fontWeight:'medium',
                            color:'white'}}>
                    Join Our Community</p>
                <p style={{color:'white',textAlign: 'center'}}>
                    Don’t miss out! <br></br>
                    Join thousands of others who are already 
                    engaging, learning, and growing. 
                    <br></br>
                    Get started now – 
                    it's free and easy!
                </p>
                <Button onClick={openSignUp} style={{background:'#e9ff4f',
                                color:'black',
                                border:'#e9ff4f',
                                paddingLeft:'0.5vw',
                                paddingRight:'0.5vw'}}>
                    Get started
                </Button>
            </div>
        </Container>
  );
}

export default Homepage; 
