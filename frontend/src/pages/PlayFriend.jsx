import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Header";
import BetForm from "../components/BetForm";


const PlayFriend = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);

    return (
        <div>
            <Navbar />
            <BetForm />
        </div>
    )
}

export default PlayFriend;