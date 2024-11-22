import React, { useState } from "react";
import '../css/Filter.css';

const FilterGames = () => {
    const [selectedFormat, setSelectedFormat] = useState(""); 
    const [selectedTournament, setSelectedTournament] = useState(""); 
    const [selectedDate, setSelectedDate] = useState(""); 

    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value); 
    };
    const handleTournamentChange = (event) => {
        setSelectedTournament(event.target.value); 
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value); 
    };

    return (
        <div id="filter-section">
   <div>
            <select 
                id="options-dropdown" 
                value={selectedFormat} 
                onChange={handleFormatChange}
            >
                <option value="" disabled>Format</option>
                <option value="option1">Rapid</option>
                <option value="option2">Blitz</option>
                <option value="option3">Classical</option>
                <option value="option3">Bullet</option>

            </select>

            
        </div>
        <div>
            <select 
                id="options-dropdown" 
                value={selectedTournament} 
                onChange={handleTournamentChange}
            >
                <option value="" disabled>Tournament</option>
                <option value="option1">Titled Tuesday</option>
                <option value="option2">Tata Steel</option>
                <option value="option3">World Chess Championship 2024</option>
            </select>

            
        </div>

        <div>
            <select 
                id="options-dropdown" 
                value={selectedDate} 
                onChange={handleDateChange}
            >
                <option value="" disabled>Date</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

            
        </div>


        <button id="filter-button">Filter</button>
        </div>
     
    );
};

export default FilterGames;
