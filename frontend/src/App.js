import './App.css';
import SetUpPage from './setUpPage';
import Homepage from './homepage';
import AllChannels from './allChannels';
import SelectedChannel from './selectedChannel';
import DirectMessage from './directmessage';
import Profile from './profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/setup" element={<SetUpPage />} />
                <Route path="/all-channels" element={<AllChannels />} />
                <Route path="/channel" element={<SelectedChannel/>}/>
                <Route path="/messages" element={<DirectMessage/>}/>
                <Route path="/messages" element={<DirectMessage/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
    );
}

export default App;
