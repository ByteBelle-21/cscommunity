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
                                                       color:"white", 
                                                       paddingLeft:"1vw", 
                                                       paddingRight:"1vw", 
                                                       paddingTop:"0.5vw",
                                                       paddingBottom:"0.5vw",
                                                       borderRadius:'1vw'}}>
                    Let's Connect
                </Nav.Link>    
            </Stack>
            <Modal size='lg' 
                   backdrop="static" 
                   keyboard={false} 
                   show={signupShow} 
                   onHide={closeSignup} 
                   centered style={{"--bs-modal-border-radius":'2vw',
                   '--bs-modal-width':`device==0:?90vw`,
                   '--bs-modal-padding':0,
                   '--bs-modal-margin':0}} >
                <ModalBody>
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
                                                    {logIn401Message}
                                                    </p> }
                            {!showLogIn401 && !showLoginAlert  && 
                                <p className='xfont' style={{fontWeight:'bold'}}>
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
                                             onClick={closeSignup} >
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
                                                    {signUp401Message}
                                                    </p> }
                                        
                            {!showSignUp401 && !showSignupAlert &&  
                            <p className='xfont' style={{fontWeight:'bold'}}> Sign Up</p> }
                            <Carousel style={{height:'70%'}} interval={600000} 
                                className='vertical-placement' 
                                ref={carouselRef}>
                                <Carousel.Item className='vertical-placement'>
                                    <Form onSubmit={handleSignup}>
                                            <Form.Group controlId="signup-username" >
                                                <Form.Label className='rfont'>Username</Form.Label>
                                                <Form.Control type="text" style={{fontSize:`calc(0.4em + 1vmin)`}}
                                                placeholder="Enter username" className='mb-3' onChange={(e) => {setSignupUsername(e.target.value); setShowSignupAlert(false);}} />
                                            </Form.Group>
                                            <Form.Group controlId="signup-email">
                                                <Form.Label className='rfont'>Email address</Form.Label>
                                                <Form.Control type="email" style={{fontSize:'calc(0.4em + 1vmin)'}} placeholder="Enter email" className='mb-3' onChange={(e) => {setSignupEmail(e.target.value); setShowSignupAlert(false);}} />
                                            </Form.Group>
                                            <Form.Group controlId="signup-password">
                                                <Form.Label className='rfont'>Password</Form.Label>
                                                <Form.Control type="password" style={{fontSize:'calc(0.4em + 1vmin)'}}  placeholder="Password" className='mb-3' onChange={(e) => {setSignupPassword(e.target.value); setShowSignupAlert(false);}} />
                                            </Form.Group>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button  className="btn btn-primary w-100 buttonText" onClick={closeSignup} >Cancle</Button>
                                                <Button  className="btn btn-primary w-100 buttonText" onClick={goToNextForm} >Continue</Button>
                                            </Stack>   
                                        </Form>
                                </Carousel.Item>
                                <Carousel.Item className='vertical-placement'>
                                  
                                    <Form onSubmit={handleSignup}>
                                        <Form.Group controlId="signup-name" >
                                            <Form.Label className='rfont'>Name</Form.Label>
                                            <Form.Control type="text" style={{fontSize:'calc(0.4em + 1vmin)'}} placeholder="Enter name" className='mb-3' onChange={(e) => {setSignupName(e.target.value) ; setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-occupation">
                                            <Form.Label className='rfont'>Occupation</Form.Label>
                                            <Form.Control type="text" style={{fontSize:'calc(0.4em + 1vmin)'}} placeholder="Enter occupation" className='mb-3' onChange={(e) => {setSignupOccupation(e.target.value) ; setShowSignupAlert(false);}} />
                                        </Form.Group>
                                        <Form.Group controlId="signup-skills">
                                            <Form.Label className='rfont'>Skills</Form.Label>
                                            <Form.Control type="text" style={{fontSize:'calc(0.4em + 1vmin)'}} placeholder="Enter skills" className='mb-3' onChange={(e) => {setSignupSkills(e.target.value) ; setShowSignupAlert(false);}} />
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
                </ModalBody>
           </Modal>
           {device != 2 && <div  className='welcome-block'>
                <Stack direction="horizontal" gap={4}>
                    <div className="me-auto">
                        <p className= {device == 0 ?'xxfont':(device==1?'mfont':'')} style={{fontWeight:'bold'}}> 
                            Welcome to <br></br> Our Community
                        </p>
                        <p className={device == 0 ?'rfont':(device==1?'sfont':'')}> 
                            Every Question Sparks New Idea and every Answer bring Closer to Solution.
                            <br></br>Join the conversation and let's make rogress together ! 
                        </p>
                        <Button style={{background:'black',
                                        fontSize: device==0? 'calc(0.5em + 1vmin)':(device==1?'calc(0.3em + 1vmin)':''),
                                        border:'black',
                                        color:'white',
                                        display:'inline-block', 
                                        padding:'0.5vw'}}>
                                            Find out more 
                                        </Button>
                    </div>
                    <div>
                        <img src="/Group 210.png"/>
                    </div>
                </Stack> 
            </div>
            }
            {device == 2 && 
                    <div  className='welcome-block'>
                        <p className= 'lfont' style={{fontWeight:'bold',textAlign:'center'}}> 
                            Welcome to Our Community
                        </p>
                        <p className='rfont' style={{textAlign:'center'}}> 
                            Every Question Sparks New Idea and every Answer bring Closer to Solution.
                            <br></br>Join the conversation and let's make rogress together ! 
                        </p>
                        <div>
                        <img src="/Group 210.png"/>
                    </div>
                
             </div>}

            {device != 2 &&
             <div style={{padding:'2vw'}}>
                <p className={device==0?'lfont':'mfont'} style={{fontWeight:'bold',margin:'2vw'}}> 
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
                        <p className='rfont' style={{fontWeight:"bold", 
                                    zIndex:10000,
                                    position: 'relative'}}>We're here to help</p>
                        <p className='rfont' style={{zIndex:100000,position: 'relative'}}>
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
                                    
                        <p className='rfont' style={{fontWeight:"bold", position:'relative',zIndex:100000}}>
                            Engage, Explore, and Share
                        </p>
                        <p className='rfont' style={{position:'relative',zIndex:100000}} >
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
                                alignItems:'strntch',
                                justifyContent:'center',

                        }} >
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width: device==0 ?'20vw':'30vw',
                               }}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e9ff4f', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                            <p className='rfont'>Create your own space</p>
                        </Stack>
                        
                        <br></br>
                        <p className='rfont' style={{paddingLeft:'2vw'}}>
                        Step into the spotlight by launching your own channel, where you 
                        can share your unique viewpoint, spark meaningful conversations,
                         and connect with like-minded individuals
                        </p>

                    </Container>
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width: device==0 ?'20vw':'30vw',
                               }}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e68d83', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                             <p className='rfont'>Search Made Simple</p>
                        </Stack>
                        <br></br>
                        <p className='rfont' style={{paddingLeft:'2vw'}}>
                        Quickly discover exactly what you're looking for by searching for 
                        people, channels, or posts that match your interests, ensuring a 
                        seamless browsing experience
                       </p>
                    </Container> 
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'1vw',
                                margin:'2vw',
                                width: device==0 ?'20vw':'30vw',
                               }}>
                        <Stack direction="horizontal" gap={4} style={{fontWeight:'bold'}}>
                            <div style={{background:'#e9ff4f', 
                                        borderRadius:'50%', 
                                        display:'inline-block',
                                        height:'2vw',
                                        width:'2vw',
                                        paddingLeft:'0.5vw'}}></div>
                             <p className='rfont'>Enhance Your Posts</p>
                        </Stack>
                        <br></br>
                        <p className='rfont' style={{paddingLeft:'2vw'}}>
                        Make your posts more engaging by easily uploading images,
                         files, and code snippets. Share your ideas in full 
                         detail and connect with others through rich, multimedia 
                         content.
                       </p>
                    </Container> 
                </div>  
                <Stack className='feature-block' 
                        direction='horizontal'
                        gap={4}>
                    <img src="/Vector.png"></img>
                         <div>
                            <p className={device==0?'lfont':'mfont'} style={{fontWeight:'bold'}}>
                                Connect Directly: Message and network with Ease
                            </p>
                            <p className='rfont'>
                            With our new direct messaging feature, you can now 
                            connect with people one-on-one. Start conversations, 
                            exchange ideas, and build your network effortlessly.
                            </p>
                           
                         </div>     
                </Stack> 
                <div style={{display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:'5vw',
                        marginBottom:'5vw'
                }}>
                <div>
                    <p className='mfont'  style={{
                               fontWeight:'bold'}}>
                        Meet Some of Our <span style={{color:'#f57567'}}>
                         Active
                        </span> Members
                    </p>
                </div>
                
                <Container 
                       style={{margin:'3vw',
                               width:'80%',
                               height:'stretch',
                               display:'flex',
                               alignItems:'center',
                               justifyContent:'center',
                               
                       }}>
                    <Container style={{height:'10vw',
                                       width:'15%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                      width:'15%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                      width:'15%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                     width:'15%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                </Container>
            </div>
            <Stack direction= "horizontal" 
                   style={{ 
                           margin:'2vw',
        
                   }}>
                <div className="me-auto"  style={{width:'50%'}}>
                    <p className='lfont' style={{ 
                            fontWeight:'bold'}}>
                        Seamless Access on Any Device
                    </p>
                    <p className='rfont'>Stay connected wherever you are! Our platform is 
                        fully optimized for mobile, tablet, and desktop, 
                        making it easy to engage, explore, and share on the go.
                        <br></br>
                        Just a tap away from the conversation !</p>
                </div>
                <img src="/Group 215.png" style={{height: device==0?'30vh':'20vh'}}></img>                
            </Stack>
            </div>
            }
            {device == 2 &&
                <div style={{padding:'2vw', display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <p className='mfont' style={{fontWeight:'bold',margin:'2vw', textAlign:'center'}}> 
                        Feeling stuck and can't find solutions ?
                        <br></br>Just Ask our community !
                    </p>  
                    <Stack direction='vertical' gap={5} style={{margin:'2vw', alignItems:'center'}}>
                    <div style={{background:"#f5f4f2", 
                                width:"90%", 
                                padding:'2vw',
                                borderRadius:'0.5vw',
                                position:'relative',
                                zIndex:1}}>
                        <p className='rfont' style={{fontWeight:"bold", 
                                    zIndex:10000,
                                    position: 'relative'}}>We're here to help</p>
                        <p className='rfont' style={{zIndex:100000,position: 'relative'}}>
                            Post your question and let our community guide you to the answer. 
                            Whether you're seeking advide,troubleshooting an issue, or just 
                            curious about something, you're in the right place.
                        </p>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'40%',
                            width:'40%',
                            background:'#e9ff4f',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        

                    </div>
                    <div style={{background:"#f5f4f2", 
                                width:"90%", 
                                padding:'2vw',
                                borderRadius:'0.5vw',
                                position:'relative',
                                zIndex:1}}>
                                    
                        <p className='rfont' style={{fontWeight:"bold", position:'relative',zIndex:100000}}>
                            Engage, Explore, and Share
                        </p>
                        <p className='rfont' style={{position:'relative',zIndex:100000}} >
                        We believe in providing you with the tools to engage, 
                            explore, and share in a meaningful way. 
                        <br></br>
                        Whether you’re engaging with others, starting a conversation,
                            or finding valuable content, our goal is to empower you to make 
                            the most of your experience in the community.
                        </p>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            width:'50%',
                            height:'90%',
                            background:'#e9ff4f',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'70%',
                            width:'60%',
                            background:'#f5f4f2',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'70%',
                            width:'70%',
                            background:'#e68d83',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                        <div style={{borderRadius:'100% 0% 17% 83% / 100% 83% 17% 0% ',
                            height:'70%',
                            width:'50%',
                            background:'#f5f4f2',
                            bottom:'0',
                            right:'0',
                            position:'absolute',
                            zIndex:5
                        }}>
                        </div>
                    </div>           
                </Stack>
            
                <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'2vw',
                                margin:'2vw',
                                width:'80%',
                               }}>
                       
                        <p className='rfont' style={{textAlign:'center', fontWeight:'bold'}}>Create your own space</p>
                        <p className='rfont' >
                        Step into the spotlight by launching your own channel, where you 
                        can share your unique viewpoint, spark meaningful conversations,
                         and connect with like-minded individuals
                        </p>

                    </Container>
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'2vw',
                                margin:'2vw',
                                width:'80%',
                                background:'#ffedeb'
                               }}>
                        
                             <p className='rfont' style={{textAlign:'center', fontWeight:'bold'}}>Search Made Simple</p>
            
                        <p className='rfont' >
                        Quickly discover exactly what you're looking for by searching for 
                        people, channels, or posts that match your interests, ensuring a 
                        seamless browsing experience
                       </p>
                    </Container> 
                    <Container style={{boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
                                padding:'2vw',
                                margin:'2vw',
                                width:'80%',
                               }}>
                       
                             <p className='rfont' style={{textAlign:'center', fontWeight:'bold'}}>Enhance Your Posts</p>
                      
                        <p className='rfont'>
                        Make your posts more engaging by easily uploading images,
                         files, and code snippets. Share your ideas in full 
                         detail and connect with others through rich, multimedia 
                         content.
                       </p>
                    </Container> 
                       
                        <div style={{marginTop:'5vw'}}>
                            <p className='lfont' style={{fontWeight:'bold' , textAlign:'center'}}>
                                Connect Directly: Message and network with Ease
                            </p>
                            <p className='rfont' style={{textAlign:'center'}} >
                            With our new direct messaging feature, you can now 
                            connect with people one-on-one. Start conversations, 
                            exchange ideas, and build your network effortlessly.
                            </p>
                        
                        </div>   
                        <img style={{height:'30vh'}} src="/Vector.png"></img>  
                        <div style={{display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:'5vw'
                }}>
                <div>
                    <p className='mfont'  style={{
                               fontWeight:'bold'}}>
                        Meet Some of Our <span style={{color:'#f57567'}}>
                         Active
                        </span> Members
                    </p>
                </div>
                
                <Container 
                       style={{margin:'3vw',
                               width:'100%',
                               height:'stretch',
                               display:'flex',
                               alignItems:'center',
                               justifyContent:'space-between',
                               flexWrap: 'wrap',
                               
                       }}>
                    <Container style={{height:'10vw',
                                       width:'40%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                       width:'40%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                </Container>
                <Container 
                       style={{margin:'3vw',
                               width:'100%',
                               height:'stretch',
                               display:'flex',
                               alignItems:'center',
                               justifyContent:'space-between',
                               flexWrap: 'wrap',
                               
                       }}>
                    <Container style={{height:'10vw',
                                       width:'40%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                    <Container style={{height:'10vw',
                                     width:'40%',
                                       background:'#f7f7f7'
                    }}>
                         
                    </Container>
                </Container>
            </div>
                    <p className='lfont' style={{ textAlign:'center',
                            fontWeight:'bold', marginTop:'5vw'}}>
                        Seamless Access on Any Device
                    </p>
                    <p style={{ textAlign:'center' }}className='rfont'>Stay connected wherever you are! Our platform is 
                        fully optimized for mobile, tablet, and desktop, 
                        making it easy to engage, explore, and share on the go.
                        <br></br>
                        Just a tap away from the conversation !</p>
                
                    <img src="/Group 215.png" style={{height:'20vh'}}></img>                
                </div> 
               
                
            }

            <div style={{
                         width:"100%",
                         background:'black',
                         marginTop:'5vh',
                         padding:'1vw',
                         display:'flex',
                         flexDirection:'column',
                         alignItems:'center'}}>
                
                <p cclassName={device==0?'mfont':'rfont'} style={{
                            fontWeight:'medium',
                            color:'white'}}>
                    Join Our Community</p>
                <p className={device==0?'rfont':(device==1?'sfont':'rfont')} style={{color:'white',textAlign: 'center'}}>
                    Don’t miss out! <br></br>
                    Join thousands of others who are already 
                    engaging, learning, and growing. 
                    <br></br>
                    Get started now – 
                    it's free and easy!
                </p>
                <Button className='buttonText' onClick={openSignUp} style={{background:'#e9ff4f',
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
