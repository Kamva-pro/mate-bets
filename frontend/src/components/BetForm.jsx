import React, { useState } from 'react';

const BetForm = () => {
  const [gameFormat, setGameFormat] = useState('');
  const [chessWebsite, setChessWebsite] = useState('');
  const [chessUsername, setChessUsername] = useState('');
  const [opponentUsername, setOpponentUsername] = useState('');
  const [stake, setStake] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!opponentUsername || !gameFormat || !chessWebsite || !chessUsername || !stake) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    // Simulate placing a bet (replace with actual API call if necessary)
    setSuccessMessage('Bet has been placed successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Place Your Bet</h2>
      
      {/* Opponent Username */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="opponentUsername">Opponent's Username</label>
        <input
          type="text"
          id="opponentUsername"
          value={opponentUsername}
          onChange={(e) => setOpponentUsername(e.target.value)}
          placeholder="Enter opponent's username"
          required
        />
      </div>

      {/* Game Format */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="gameFormat">Game Format</label>
        <select
          id="gameFormat"
          value={gameFormat}
          onChange={(e) => setGameFormat(e.target.value)}
          required
        >
          <option value="" disabled>Select a format</option>
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="bullet">Bullet</option>
        </select>
      </div>

      {/* Chess Website */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="chessWebsite">Chess Website</label>
        <select
          id="chessWebsite"
          value={chessWebsite}
          onChange={(e) => setChessWebsite(e.target.value)}
          required
        >
          <option value="" disabled>Select a website</option>
          <option value="chess.com">Chess.com</option>
          <option value="lichess.org">Lichess.org</option>
        </select>
      </div>

      {/* Chess Username */}
      {chessWebsite && (
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="chessUsername">
            {chessWebsite === 'chess.com'
              ? 'Chess.com Username'
              : 'Lichess.org Username'}
          </label>
          <input
            type="text"
            id="chessUsername"
            value={chessUsername}
            onChange={(e) => setChessUsername(e.target.value)}
            placeholder={`Enter your ${chessWebsite} username`}
            required
          />
        </div>
      )}

      {/* Stake */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="stake">Stake</label>
        <input
          type="number"
          id="stake"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          placeholder="Enter the stake amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Success Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Submit Button */}
      <button type="submit">Place Bet</button>
    </form>
  );
};

export default BetForm;
