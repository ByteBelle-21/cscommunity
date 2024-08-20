import './App.css';
import SetUpPage from './setUpPage';
import Homepage from './homepage';
import AllChannels from './allChannels';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/setup" element={<SetUpPage />} />
                <Route path="/all-channels" element={<AllChannels />} />
            </Routes>
    );
}

export default App;
