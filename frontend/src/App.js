import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './homepage';
import Navlink from './navlink';
import Channels from './channels';
import Messages from './messages';
import Profile from './profile';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

function App() {
    window.BASE_URL = 'https://psutar9920-4000.theiaopenshiftnext-1-labs-prod-theiaopenshift-4-tor01.proxy.cognitiveclass.ai';

    // functionality to authenticate user
    const [hasAuthentication, setHasAuthentication] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState(()=>{
        const user = sessionStorage.getItem('auth_user')
        if (user){
            setHasAuthentication(true)
            return user;
        }
        return '';
    })

    useEffect(() => {
        if(authenticatedUser){
            sessionStorage.setItem('auth_user', authenticatedUser);
        }
        else{
            sessionStorage.removeItem('auth_user');
        }
        
    }, [authenticatedUser]);

    const authentication = (hasAccess,current_user)=>{
        setHasAuthentication(hasAccess);
        setAuthenticatedUser(current_user);
    };

    const removeAuthentication = ()=>{
        setHasAuthentication(false);
        setAuthenticatedUser('');
        sessionStorage.removeItem('auth_user');
    };
    
  return (
    <Router >
      <div className='page-layout'>
          <Navlink authentication={authentication} removeAuthentication={removeAuthentication}/>
          <div className='subpages'>
            <Routes>
                <Route path="/" element={<Homepage authentication={authentication} />}/>
                <Route path="/channels/:channelsName" element={hasAuthentication ? <Channels /> : <Navigate to="/" />} />
                <Route path="/messages/:selectedUser" element={hasAuthentication ? <Messages /> : <Navigate to="/" />} />
                <Route path="/profile" element={hasAuthentication ? <Profile /> : <Navigate to="/" />} />
            </Routes>
          </div>  
          
      </div>
    </Router>
    
  );
}

export default App;
