import { useLocation } from "react-router-dom";

const BetDetails = () => {
    const location = useLocation();
    const {bet_id, status, bet_amount, result, player_one_lichess_username,
        player_two_lichess_username, format
    } = location.state || {};
    

    return (
        <div className="receipt-card bg-white text-black p-2 rounded-sm shadow-md max-w-[200px] mx-auto border border-gray-400 font-mono text-xs">
    <h1 className="text-center font-bold text-sm mb-1 border-b pb-1">Bet Details</h1>
    
    <div className="flex flex-col text-xs mb-1">
        <p><strong>Player One:</strong> {player_one_lichess_username}</p>
        <p><strong>Player Two:</strong> {player_two_lichess_username}</p>
        <p><strong>Format:</strong> {format}</p>
        <p><strong>Status:</strong> {status}</p>
    </div>

    <div className="mb-1">
        <p><strong>Bet:</strong> ${bet_amount}</p>
        <p className={`font-bold ${result === 'Won' ? 'text-green-500' : 'text-red-500'}`}>
            <strong>Result:</strong> {result}
        </p>
    </div>

    <div className="border-t pt-1 text-center text-[10px] text-gray-500">
        <p>Thanks for your bet!</p>
    </div>
</div>

    );
};

export default BetDetails;
