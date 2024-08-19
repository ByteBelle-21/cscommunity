import './App.css';
import SetUpPage from './setUpPage';
import Homepage from './homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/setup" element={<SetUpPage />} />
            </Routes>
    );
}

export default App;
