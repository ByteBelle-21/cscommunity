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
    useEffect(()=>{
        fetchUserDetails();
    })

    
    const [userDetails, setUserDetails] = useState([]);
    const fetchUserDetails= async()=>{
        const current_user = sessionStorage.getItem('auth_user');
        try {
            const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/user',{
                params: {user: current_user}
            });
            if (response.status === 200) {
                setUserDetails(response.data[0]);
                console.log("Successfully retrieved current user details");
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
            <div className='page-content '>
                <div className='profile-background'></div>
                <img  src={userDetails.avatar} className='current-user-img'/> 
                <div className=' horizontal-placement' style={{padding:'1vw'}}>
                       <div className='user-details-col1'>
                       <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label><span className="material-icons">edit</span>     Name</Form.Label>
                                <Form.Control type="text" placeholder={userDetails.name} readOnly />
                                <Form.Label><span className="material-icons">edit</span>Username</Form.Label>
                                <Form.Control type="text" placeholder={userDetails.username} readOnly />
                                <Form.Label><span className="material-icons">edit</span>Email </Form.Label>
                                <Form.Control type="text" placeholder={userDetails.email} readOnly />
                            </Form.Group>
                        </Form>
                        <p><span className="material-icons">edit</span>    Skills</p>
                        <div className='all-skills'>
                            
                            {userDetails.skills ? 
                                (userDetails.skills.split(',').map((skill) => (
                                    <div className='each-skill'>{skill.trim()}</div>
                                )))
                                : <div>No skils avaialable</div>}
                        </div>
                       </div>
                       <div className='user-details-col2'>
                           <h4>{userDetails.name}</h4>
                           
                           <div className='mini-info-bar horizontal-placement'>
                                <div className='vertical-placement'>
                                    <h6>{userDetails.occupation}</h6>
                                    Occupation 
                                </div>
                                <div className='vertical-placement'>
                                    <h6>{userDetails.totalPosts}</h6>
                                    Total Posts 
                                </div>
                                <div className='vertical-placement'>
                                    <h6>{userDetails.likes}</h6>
                                    Likes 
                                </div>
                                
                                <div className='vertical-placement'>
                                    <h6>{userDetails.totalPosts}</h6>
                                    Total Posts 
                                </div>
                           </div>
                       </div>
                       <div className='user-details-col1'>
                                ekgfnkejnfkejbkfj
                       </div>

                </div>
                
            </div>

        </div> 
    )
}

export default Profile;