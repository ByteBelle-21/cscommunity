import './App.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className='homepage'>
        <Stack direction="horizontal" gap={3} className="full-width-bands">
            <Nav.Link href="/home" className="me-auto mx-4">CScommunity</Nav.Link>
            <Nav.Link href="/home">Sign Up</Nav.Link>
            <Nav.Link href="/home" className="mx-4">Log In</Nav.Link>
        </Stack>
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
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='member-card'>
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

export default App;
