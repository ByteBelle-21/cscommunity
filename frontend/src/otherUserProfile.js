import './homepage.css';
import './allChannels.css';
import './UniformStyle.css';
import './otherUserProfile.css';
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
import DirectMessage from './directmessage';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';


function OtherUserProfile({removeAuthentication}){
    const {userName} = useParams();
    const current_user = sessionStorage.getItem('auth_user');

    const [suggestedPeople, setSuggestedPeople] = useState([]);
    useEffect(()=>{
        fetchSuggestedPeople();
        fetchSelectedUserDetails();
    });
        const fetchSuggestedPeople= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/activeusers');
                if (response.status === 200) {
                    setSuggestedPeople(response.data);
                    console.log("Successfully retrieved suggested user details");
                } 
                else if(response.status === 401){
                    console.log(response.message)
                }
            } catch (error) {
                console.error("Catched axios error: ",error);
            }

        }

 

    const navigateTo = useNavigate()
    const showProfile=(userName)=>{
        navigateTo(`/user-profile/${encodeURIComponent(userName)}`)
    }


    const [selectedUserDetails, setSelectedUserDetails] = useState([]);
    const the_user = userName;
    const fetchSelectedUserDetails= async()=>{
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/selected-user',{
                params: {user: the_user}
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
    }


    const showPreview =(text, num)=>{
        const words = text.split(' ');
        return words.slice(0, num).join(' ')+" . . . . . . . .";
    }

    return(
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link className="me-auto" >CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{current_user}</Nav.Link>
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <h6 className='me-auto '>{userName}</h6>   
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container2'>  
                    <h6 className='mb-3'>Suggested People for you</h6>
                    {suggestedPeople.length >0 && suggestedPeople.map(person=>(
                        <div className='child-blocks'>
                            <Stack direction="horizontal" gap={3}>
                                <img src={person.avatar}  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    {person.username}
                                    <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(person.username)} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} >Send message</Nav.Link>
                            </Stack>
                        </div>
                        
                    ))}
                </Container>
                <Container className='user-profile'>
                    <div className='profile-background'></div>
                    <img  src={selectedUserDetails.avatar} className='user-img'/> 
                    <div className='user-details'>
                        <Button onClick={()=>navigateTo('/messages')}>Send Message</Button>
                        <h5> Hello 👋 I am {selectedUserDetails.name} !</h5>
                        <p>
                            <span style={{fontWeight:'bold'}}>{selectedUserDetails.username}</span>
                            <span style={{marginLeft:'1vw'}}><span className="material-icons" style={{fontSize:'1vw', color:'blue'}}  >work</span> {selectedUserDetails.occupation}</span>
                            <span style={{marginLeft:'1vw'}}>{selectedUserDetails.totalPosts} Posts</span>
                        </p>
                        <h6 className='mt-3'>Skills</h6>
                        <hr style={{width:'70%'}}/>
                        <div className='all-skills'>
                            
                            {selectedUserDetails.skills ? 
                                (selectedUserDetails.skills.split(',').map((skill) => (
                                    <div className='each-skill'>{skill.trim()}</div>
                                )))
                                : <div>No skils avaialable</div>}
                        </div>
                        <h6 className='mt-5'>Activities</h6>
                        <hr style={{width:'70%'}}/>
                        <div className='all-skills'>
                            {selectedUserDetails.posts ? (selectedUserDetails.posts.map(post =>(
                                <div className='activity-post'>
                                    <strong>{post.channel}</strong>
                                    <p>{showPreview(post.post,10)}</p>
                                </div>
                            )))
                                
                            
                            : <div>No activities yet</div>}
                        </div>
                       
                    </div>
                    
                </Container>
                       

                    
                    
            </div>
        </div>
    )

}

export default OtherUserProfile;