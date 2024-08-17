import './App.css';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className='homepage'>
        <Stack direction="horizontal" gap={3} className="navbar">
            <Nav.Link href="/home" className="me-auto mx-4">CScommunity</Nav.Link>
            <Nav.Link href="/home">Sign Up</Nav.Link>
            <Nav.Link href="/home" className="mx-4">Log In</Nav.Link>
        </Stack>
        <div className='intro-board'>
            <div className='title'>
                <h5 className='mt-4'>Welcome to our Community</h5>
                <p>Every question sparks a new idea, and every answer brings us closer to a solution.</p>
            </div>
            <div className='illustration1'>
                <img src="/Group 183.png"  />
                <img src="/Group 182.png"  />
                <img src="/Group 168.png"  />
                <img src="/Group 174.png"  />
                <div className='screen' />
                <img src="/Group 162.png"  />
                <img src="/Group 176.png"  />
                <img src="/Group 179.png"  />
                <img src="/Group 180.png" style={{height:'20vh'}}/> 
            </div>  
        </div>
        <Container>
            <div className='intro-para'>
                
            </div>
        </Container>
        

    </div>
  );
}

export default App;
