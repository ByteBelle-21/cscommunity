import './App.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className='homepage'>
        <Stack direction="horizontal" gap={3} className="navbar">
            <Nav.Link href="/home" className="me-auto mx-4">CScommunity</Nav.Link>
            <Nav.Link href="/home">Sign Up</Nav.Link>
            <Nav.Link href="/home" className="mx-4">Log In</Nav.Link>
        </Stack>
        <div className='intro-board'>
            <Container className='title'>
                <h5 className='mt-4'>Welcome to our Community</h5>
                <p>Every question sparks a new idea, and every answer brings us closer to a solution.</p>
            </Container>
            <Container className='illustration1'>
                <img src="/Group 183.png"  />
                <img src="/Group 182.png"  />
                <img src="/Group 168.png"  />
                <img src="/Group 174.png"  />
                <img src="Desktop - 15.png" style={{border:'0.1vh solid black'}}/>
                <img src="/Group 162.png"  />
                <img src="/Group 176.png"  />
                <img src="/Group 179.png"  />
                <img src="/Group 180.png" style={{height:'20vh'}}/> 
            </Container>  
        </div>
            <Container className='intro-para'>
                <Container className='intro-text'>
                    <h6>Feeling stuck and can’t find solutions ? <br/>Just ask our community !</h6>
                    <p>Post your question and let our community guide you to the answer
                        We're here to help, one solution at a time! Whether you're seeking 
                        advice, troubleshooting an issue, or just curious about something,
                        you're in the right place.
                    </p>
                    <p style={{color:'red',font:'bold'}}>Join Our Community</p>
                    
                </Container>
                <Container className='working-boy'>
                    <img src="/Group 185.png"/>
                </Container>
                
            </Container>
       
        <Container className="card-container">
            <h6>Engage, Explore, and Share</h6>
            <Container className='all-cards'>
                <Card className='each-card' style={{background:"#FFDFDF"}}> 
                    <Card.Body style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                        <img src="/Group 186.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='each-card' style={{background:'#F9FAD6'}}>
                    <Card.Body style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                        <img src="/Group 187.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='each-card' style={{background:"#FBD9F3"}}>
                    <Card.Body style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                    <img src="/Group 189.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='each-card' style={{background:'#E8FFD6'}}>
                    <Card.Body style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                        <img src="/Group 188.png" style={{height:'15vh'}}/>
                        <Card.Text style={{marginTop:'2vh'}}>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </Container>
        <Container className='intro-para'>
            <Container className='working-team'>
                <img src="/Group 191.png" />
            </Container>
            <Container className='intro-text'>
                <h6>Enhance Your Posts: Upload Images, Files, and Code</h6>
                <p>Make your posts more engaging by easily uploading images, 
                    files, and code snippets. Share your ideas in full detail 
                    and connect with others through rich, multimedia content.
                </p>
            </Container>
        </Container>
        <div className='middle-band card-container'>
            <h6>Meet Some of our Active Members</h6>
            <Container className='all-cards'>
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
                <div style={{background:'#1A183F'}} className='card-container'>
                        <h6 style={{color:'white'}}> + 30</h6>
                        <h6 style={{color:'white'}}>Members in our community</h6>    
                </div>
            </Container>
        </div>    

    </div>
  );
}

export default App;
