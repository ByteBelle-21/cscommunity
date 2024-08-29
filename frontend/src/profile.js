import './UniformStyle.css';
import './profile.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './otherUserProfile.css';
import axios from 'axios';


function Profile({removeAuthentication}){
    
        
   

    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }


    const [id, setId] = useState();
    const [userDetails, setUserDetails] = useState([]);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [skills, setSkills] = useState('');
    const [avatar, setAvatar] = useState(''); 
    useEffect(()=>{
        fetchUserDetails();
    },[]);


    const fetchUserDetails= async()=>{
        const current_user = sessionStorage.getItem('auth_user');
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/selected-user',{
                params: {user: current_user}
            });
            if (response.status === 200) {
                setId(response.data.id);
                setUserDetails(response.data);
                setName(response.data.name);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setOccupation(response.data.occupation);
                setSkills(response.data.skills);
                setAvatar(response.data.avatar);
                console.log("Successfully retrieved current user details");
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
       

    }
    

    const [connectedUsers, setConnectedUsers] = useState([]);
    useEffect(()=>{
        const current_user = sessionStorage.getItem('auth_user');
        const fetchConnectedUsers= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/connectedusers',{ params: { user: current_user} });
                if (response.status === 200) {
                    setConnectedUsers(response.data);
                    console.log("Successfully retrieved all connected users");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }
        fetchConnectedUsers();  
    },[]);

    const [isEditMode, setEditMode] = useState(false);
    const handleEditButtonClick = ()=>{
        setEditMode(!isEditMode);
    }

    const [showModal, setShowModal]  = useState(false);
    const openModal = ()=>{
        setShowModal(true);
    }

    const closeModal = ()=>{
        setShowModal(false);
    }

    const [selectedAvatar, setSelectedAvatar] = useState();
    const handleAvatarClick=(index,imgNum)=>{
        setSelectedAvatar(index);
        setNewAvatar(`/Group ${imgNum}.png`);

    }

    const [newAvatar, setNewAvatar] = useState('');
    const HandleAvatarChange = ()=>{
        setAvatar(newAvatar);
        closeModal();
    }


    const saveChanges = async(e)=>{
        e.preventDefault();
        const userId = id;
        const skillsArray = skills.split(',').map(item => item.trim()).join(',');
        if(skillsArray.length ==0 || !username || !email || !name || !occupation || !avatar){
            // setShowSignupAlert(true);
            return;
        }
        const data = {
            userId,username, email, name, occupation, skills: skillsArray, avatar
        }
        try {
            const response = await axios.put('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/saveChanges', data);
            if (response.status === 200) {
                handleEditButtonClick();
                fetchUserDetails();
                console.log("Successfully saved all changes")
            } 
            else if(response.status === 401){
                console.log(response.message)
            }
        } catch (error) {
            console.error("Catched axios error: ",error);
        }
    }


    return(
           <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link href="#" className="me-auto">CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{userDetails.username}</Nav.Link>
                <Nav.Link onClick={removeAuthentication}>Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto '>My Profile</h6>
            </div>
            <div className='page-content horizontal-placement'> 
                       <div className='user-details-col1'>
                            <img src={avatar}  className='current-user-img'/> 
                            {isEditMode? (
                                <span className="material-icons edit-icon"  onClick={openModal}>edit</span>
                            ):""}
                                <Modal size='lg'  backdrop="static" keyboard={false} show={showModal} onHide={closeModal} centered style={{"--bs-modal-border-radius":'1vw'}} >
                                    <Modal.Body className='vertical-placement'>
                                        <h5 className='mb-4'>Choose your Avatar</h5>
                                        <Form className='from3'>
                                            <Form.Group controlId="signup-avatar">
                                                
                                                    <Container className='wrap-container'>
                                                        {[300, 301, 302, 303, 304, 305, 306, 307].map((imgNum, index) => (
                                                                <Button key={index} onClick={() => handleAvatarClick(index,imgNum)} className={selectedAvatar === index ? 'active' : ''}>
                                                                    <img src={`/Group ${imgNum}.png`} alt={`Avatar ${index + 1}`} />
                                                                </Button>
                                                        ))}
                                                    </Container>
                                                    <Container className='horizontal-placement' style={{gap:5}}>
                                                        <Button onClick={closeModal}>Cancle</Button>
                                                        <Button onClick={HandleAvatarChange} >Done</Button>
                                                    </Container>
                                                   
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                            <h5>{name}</h5>
                            <p>{username}</p>
                            {isEditMode ? (
                                <Button onClick={saveChanges}>
                                   Save Changes
                                </Button>

                            ):
                                <Button onClick={handleEditButtonClick}>
                                Edit Profile
                                </Button>}
                            
                       </div>
                       <div className='user-details-col2'>
                            <h5 style={{marginLeft:'1vw'}}>Basic Information</h5>
                            <div className='basic-information'>
                                <Row style={{width:'100%'}}>
                                    <Col>
                                        <div className='each-info'>
                                            Name
                                            {isEditMode ? (
                                                <Form.Control 
                                                    type="text" 
                                                    value={name} 
                                                    onChange={(e) => setName( e.target.value)}
                                                    
                                                />
                                            )
                                            : <h6>{name}</h6>}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='each-info'>
                                            Username
                                            {isEditMode ? (
                                                <Form.Control 
                                                    type="text" 
                                                    value={username} 
                                                    onChange={(e) => setUsername( e.target.value)}
                                                    
                                                />
                                            )
                                            :  <h6>{username}</h6>}
                                           
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='each-info'>
                                            Email
                                            {isEditMode ? (
                                                <Form.Control 
                                                    type="email" 
                                                    value={email} 
                                                    onChange={(e) => setEmail( e.target.value)}
                                                    
                                                />
                                            )
                                            :  <h6>{email}</h6>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{width:'100%'}}>
                                    <Col>
                                        <div className='each-info'>
                                            Occupation
                                            {isEditMode ? (
                                                <Form.Control 
                                                    type="text" 
                                                    value={occupation} 
                                                    onChange={(e) => setOccupation( e.target.value)}
                                                    
                                                />
                                            )
                                            :  <h6>{occupation}</h6>}
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='each-info'>
                                            Total Posts
                                            <h6>{userDetails.totalPosts}</h6>
                                        </div>
                                    </Col>
                                    <Col>
                                        
                                    </Col>
                                </Row>
                                <Row style={{width:'100%'}}>
                                <div className='each-info'>
                                    Skills
                                    <div className='all-skills'>
                                        { isEditMode ? (
                                            skills ? (
                                                <Form.Control 
                                                    type="text" 
                                                    value={skills}
                                                    onChange={(e) => setSkills( e.target.value)} 
                                                    
                                                />
                                            ):
                                                <Form.Control 
                                                type="text" 
                                                value="No skils avaialable" 
                                                
                                                />
                                        ):
                                        (skills ? 
                                            (userDetails.skills.split(',').map((skill) => (
                                                <div className='each-skill'>{skill.trim()}</div>
                                            )))
                                            : <div>No skils avaialable</div>)


                                        }

                                    </div>
                                    </div>
                                </Row>
                            </div>
                            <h5>Activities</h5>
                                <div className="activities">
                                    {userDetails.posts ? ( userDetails.posts.map(post =>(
                                        <div className='activity-post'>
                                            <strong className='mb-2'>{post.channel}</strong>
                                            
                                                <p>{showPreview(post.post,10)}</p>
                                            
                                            
                                            
                                        </div>
                                    )))
                                        
                                    
                                    : <div>No activities yet</div>}
                            </div>
                        </div>
                        <div className='user-details-col1'>
                            <h5>Connected People</h5>
                            {connectedUsers.length >0 && connectedUsers.map(user=>(
                                <div className='child-blocks'>
                                    <Stack direction="horizontal" gap={3}>
                                        <img src={user.avatar}  style={{height:'2vw'}}/>
                                        <div className=' me-auto'>
                                            {user.username}
                                            <Nav.Link style={{fontSize:'small'}} >View Profile</Nav.Link>
                                        </div>
                                        <Nav.Link style={{fontSize:'small'}} >View Conversation</Nav.Link>
                                    </Stack>
                                </div>
                            ))}
                            {connectedUsers.length === 0 &&
                           
                                <p style={{opacity:'0.5'}}>No messages </p>
                      
                            }
                       </div>

               
                
            </div>

        </div> 
    )
}

export default Profile;
