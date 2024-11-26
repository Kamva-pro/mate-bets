import {React, useState} from "react";
import "../css/PlayFriend.css";
import Navbar from "./Header";


const PlayFriend = () => {

    const active_link = document.getElementById('#playfriend');
    return(
    <div>
        <Navbar/>
        <div id="playfriend-form">
        </div>
    </div>
    )
}

export default PlayFriend;