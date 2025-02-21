// App.js
import React from 'react';
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';

import Home from './pages/HomePage'; 
const PlayFriend = lazy(() => import("./pages/PlayFriend"))
// import PlayFriend from './pages/PlayFriend';
import ProGamesPage from './pages/ProGamesPage';
import Dashboard from './pages//Dashboard';
import BetDetails from './pages/BetDetails';

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
                <Route path='/betdetails' element={<BetDetails/>} />
            </Routes>
        </Router>
    );
}

export default App;

