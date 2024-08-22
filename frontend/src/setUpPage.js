import { useState, useEffect } from 'react';
import './setUpPage.css';
import './homepage.css';
import Container from 'react-bootstrap/Container'; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function SetUpPage(){

    const [avatar, setAvatar] = useState(null)
    const handleAvatarClick=(index)=>{
        setAvatar(index)
    }

    const navigateTo = useNavigate()
    const goToAllChannels =(event)=>{
        event.preventDefault(); 
        navigateTo('/all-channels');
    }
    

    return(
        <div className="setuppage vertical-placement">
            <Container className='main-container horizontal-placement'>
                <Container className='image-field vertical-placement'>
                    <img src="/Group 207.png"  />
                </Container>
                <Container className='form-field vertical-placement'>
                    <h6 className='mb-4'>Customize Your Profile : Let Your Expertise Shine and Build Trust with the Community!</h6>
                    <Form >
                        <Form.Group controlId="signup-name" >
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control type="text" placeholder="i.e. John Doe" className='mb-3'/>
                        </Form.Group>
                        <Form.Group controlId="signup-occupation">
                            <Form.Label>Enter your occupation</Form.Label>
                            <Form.Control type="text" placeholder="i.e. data scientist or student" className='mb-3'/>
                        </Form.Group>
                        <Form.Group controlId="signup-skills">
                            <Form.Label>Add your skills</Form.Label>
                            <Form.Control type="text" placeholder="i.e java, SQL,..." className='mb-3'/>
                        </Form.Group>
                        <Form.Group controlId="signup-avatar">
                            <Form.Label>Choose your Avatar</Form.Label>
                            <Container className='wrap-container'>
                                {[198, 199, 200, 205, 203, 204, 201, 206].map((imgNum, index) => (
                                        <Button key={index} onClick={() => handleAvatarClick(index)} className={avatar === index ? 'active' : ''}>
                                            <img src={`/Group ${imgNum}.png`} alt={`Avatar ${index + 1}`} />
                                        </Button>
                                ))}
                            </Container>
                        </Form.Group>
                    </Form>
                    <Button className='done-button' onClick={goToAllChannels}>Finish Up</Button>
                </Container>
            </Container>
        </div>      
    )
}

export default SetUpPage;