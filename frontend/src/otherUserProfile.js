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
    },[decodeURIComponent(userName)]);
        const fetchSuggestedPeople= async()=>{
            try {
                const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/activeusers');
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
    console.log(the_user)
    const fetchSelectedUserDetails= async()=>{
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/selected-user',{
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

    const handleSendMessage=(selectedUser)=>{
        navigateTo(`/messages/${encodeURIComponent(selectedUser)}`);
    }


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

    return(
        <div className="page-layout">
            <Stack direction="horizontal" gap={4} className="navbar" >
                <Nav.Link className="me-auto" >CScommunity</Nav.Link>
                <Nav.Link className='horizontal-placement'>{current_user}</Nav.Link>
                <Nav.Link onClick={removeAuthentication} >Log Out</Nav.Link>
            </Stack>
            <div className='sub-navbar horizontal-placement'>
                <Nav.Link className='mx-2' onClick={()=>navigateTo(-1)}><span className="material-icons" >keyboard_backspace</span></Nav.Link>
                <h6 className='me-auto '> User Profile - {userName}</h6>   
            </div>
            <div className='page-content horizontal-placement'>
                <Container className='small-grid-container2'>  
                    <h6 className='mb-3'>Suggested People for you</h6>
                    {suggestedPeople.length >0 && suggestedPeople
                    .filter(person => person.username !== current_user && person.username!== userName )
                    .map(person=>(
                        <div className = "suggested-people-block"> 
                            <Stack direction="horizontal" gap={3} >
                                <img src={person.avatar}  style={{height:'2vw'}}/>
                                <div className=' me-auto'>
                                    {person.username}
                                    <Nav.Link style={{fontSize:'small'}} onClick={()=>showProfile(person.username)} >View Profile</Nav.Link>
                                </div>
                                <Nav.Link style={{fontSize:'small'}} onClick ={()=>handleSendMessage(person.username)} >Send message</Nav.Link>
                            </Stack>
                        </div>
                        
                    ))}
                </Container>
                <Container className='user-profile'>
                    <Container className='block1'>
                        <img  src={selectedUserDetails.avatar} className='user-img'/> 
                        <h6>{selectedUserDetails.name}</h6>
                        <p className='user-username'>{selectedUserDetails.username}</p>
                        <Button onClick={()=>handleSendMessage(selectedUserDetails.username)} style={{marginBottom:'1vw'}}>Send Message</Button>
                        <Container className='user-posts'>
                            <p style={{margin:0}}>Occupation</p>
                            <strong>{selectedUserDetails.occupation}</strong>
                        </Container>
                        <Container className='user-posts'>
                            <p style={{margin:0}}>Total Posts</p>
                            <strong>{selectedUserDetails.totalPosts}</strong>
                        </Container>
                        <Container className='user-posts'>
                            <p style={{margin:0}}>User Rating</p>
                            <strong>{handleRating(selectedUserDetails.likes ,selectedUserDetails.totalPosts)}</strong>
                        </Container>
                    </Container>
                    <Container className='block2'>
                        <Container className='block-3'>
                            <h6>Skills</h6>
                            <hr style={{width:'80%', marginTop:0}}/>
                            <div className='all-skills'>
                                
                                {selectedUserDetails.skills ? 
                                    (selectedUserDetails.skills.split(',').map((skill) => (
                                        <div className='each-skill'>{skill.trim()}</div>
                                    )))
                                    : <div>No skils avaialable</div>}
                            </div>

                        </Container>
                        <Container className='block-4'>
                            <h6 >Activities</h6>
                            <hr style={{width:'80%', marginTop:0}}/>
                            <div className='all-skills'>
                                {selectedUserDetails.posts ? (selectedUserDetails.posts.map(post =>(
                                    <div className='activity-post'>
                                        <strong>{post.channel}</strong>
                                        <p>{showPreview(post.post,10)}</p>
                                    </div>
                                )))
                                
                                : <div>No activities yet</div>}
                            </div>
                        </Container>
                        
                       

                    </Container>
                </Container>   
            </div>
        </div>
    )

}

export default OtherUserProfile;