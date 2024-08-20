import { useState } from 'react';
import './setUpPage.css';
import Container from 'react-bootstrap/Container'; 
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/esm/Button';

function SetUpPage(){

    const [avatar,setAvatar] = useState(null)
    const handleAvatarClick = ()=>{
        
    }


    return(
        <div className="setuppage vertical-placement">
            <Container className='main-container horizontal-placement'>
                <Container className='image-field vertical-placement'>
                    <img src="/Group 208.png"  />
                </Container>
                <Container className='form-field vertical-placement'>
                    <h6 className='mb-4'>Customize Your Profile : Let Your Expertise Shine and Build Trust with the Community!</h6>
                    <Form >
                        <Form.Group controlId="signup-name" >
                            <Form.Label>Enter your name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" className='mb-3'/>
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
                                    <Nav.Link><img src="/Group 198.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 199.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 200.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 201.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 203.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 204.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 205.png"  /></Nav.Link>
                                    <Nav.Link><img src="/Group 206.png"  /></Nav.Link>
                            </Container>
                        </Form.Group>
                    </Form>
                    <Button className='done-button'>Finish Up</Button>
                </Container>
            </Container>

        </div>
    )
}

export default SetUpPage;