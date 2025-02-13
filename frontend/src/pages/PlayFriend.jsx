import {React, useState} from "react";
import "../css/PlayFriend.css";
import Navbar from "../components/Header";
import BetForm from "../components/BetForm";


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