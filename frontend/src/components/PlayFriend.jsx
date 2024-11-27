import {React, useState} from "react";
import "../css/PlayFriend.css";
import Navbar from "./Header";
import BetForm from "./BetForm";


const PlayFriend = () => {

    const active_link = document.getElementById('#playfriend');
    return(
    <div>
        <Navbar/>
        <BetForm/>
        
    </div>
    )
}

export default PlayFriend;