import React from "react";
import Navbar from "../components/Header";
import HomeBetForm from "../components/HomeBetForm";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div>
            <Navbar />
            <HomeBetForm />
            <Footer />
        </div>
    );
}