// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import PlayFriend from './components/PlayFriend';

import Home from './components/HomePage'; 
import ProGamesPage from './components/ProGamesPage';
import Dashboard from './components//Dashboard';

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
                
            </Routes>
        </Router>
    );
}

export default App;

// import addNotification from 'react-push-notification';
// import { Notifications } from 'react-push-notification';

// function App() {
//     function buttonOnClick() {
//         addNotification({
//             title: 'Warning',
//             native: true
//         })
//     };
//     return (
//         <div className="App">
//             <Notifications />
//             <h1>Hey Geek!</h1>
//             <button onClick={buttonOnClick}>
//                 Push Notification
//             </button>
//         </div>
//     );
// }

// export default App;