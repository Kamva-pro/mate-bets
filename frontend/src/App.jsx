// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import PlayFriend from './components/PlayFriend';

import Home from './components/HomePage'; 
import ProGamesPage from './components/ProGamesPage';
import Dashboard from './components//Dashboard';
import BetSelect from './components/BetSelect';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />                
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path='/playfriend' element={<PlayFriend />} />
                <Route path='/progames' element={<ProGamesPage/>} />
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/betselect' element={<BetSelect/>}/>
                
            </Routes>
        </Router>
    );
}

export default App;

