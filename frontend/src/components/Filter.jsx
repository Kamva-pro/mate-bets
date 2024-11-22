import React, { useState } from "react";
import '../css/Filter.css';

const FilterGames = () => {
    const [selectedOption, setSelectedOption] = useState(""); // State to track selected option

    const handleChange = (event) => {
        setSelectedOption(event.target.value); // Update the state when selection changes
    };

    return (
        <div id="filter-section">
   <div>
            <select 
                id="options-dropdown" 
                value={selectedOption} 
                onChange={handleChange}
            >
                <option value="" disabled>Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

            {selectedOption && (
                <p>You selected: {selectedOption}</p> // Display selected value
            )}
        </div>
        <div>
            <select 
                id="options-dropdown" 
                value={selectedOption} 
                onChange={handleChange}
            >
                <option value="" disabled>Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

            {selectedOption && (
                <p>You selected: {selectedOption}</p> // Display selected value
            )}
        </div>

        <div>
            <select 
                id="options-dropdown" 
                value={selectedOption} 
                onChange={handleChange}
            >
                <option value="" disabled>Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>

            {selectedOption && (
                <p>You selected: {selectedOption}</p> // Display selected value
            )}
        </div>

        <button>Filter</button>
        </div>
     
    );
};

export default FilterGames;
