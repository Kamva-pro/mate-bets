// App.js
import React from 'react';
import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';

const Home  = lazy(()=> import("./pages/HomePage"))
const PlayFriend = lazy(() => import("./pages/PlayFriend"))
const ProGamesPage = lazy(() => import("./pages/ProGamesPage"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const BetDetails = lazy(() => import("./pages/BetDetails"))

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

