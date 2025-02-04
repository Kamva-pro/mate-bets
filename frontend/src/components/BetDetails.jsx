import { useLocation } from "react-router-dom";

const BetDetails = () => {
    const location = useLocation();
    const bet_id = location.state?.bet_id;

    return (
        <div>
            <h1>Bet Details</h1>
            <p>Bet ID: {bet_id}</p>
        </div>
    );
};

export default BetDetails;
