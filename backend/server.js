// server.js (or your Express app)
const express = require('express');
const supabase = require('../supabase-client'); // Import your Supabase client
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Allow requests from your frontend
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  }));

// Endpoint to place a bet
app.post('/place-bet', async (req, res) => {
    const { opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername } = req.body;

    try {
        // Step 1: Fetch opponent data (check if opponent exists)
        const { data: opponentData, error: opponentError } = await supabase
            .from('users')
            .select('id')
            .eq('email', opponentEmail)
            .single();

        if (opponentError || !opponentData) {
            return res.status(400).json({ message: 'Opponent not found' });
        }
        const oppUserId = opponentData.id;

        // Step 2: Check current user's balance
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, balance')
            .eq('email', chessUsername)
            .single();

        if (userError || !userData) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Step 3: Ensure the user has enough balance
        if (userData.balance < stake) {
            return res.status(400).json({ message: 'Insufficient funds to place the bet' });
        }

        // Step 4: Insert the bet into the database
        const { data: betData, error: betError } = await supabase
            .from('p2p_bets')
            .insert([
                {
                    current_userid: userData.id,
                    opponent_userid: oppUserId,
                    opp_email: opponentEmail,
                    lichess_username: chessUsername,
                    opp_lichess_username: opp_chessUsername,
                    match_format: gameFormat,
                    match_type: gameSeries,
                    bet_amount: stake,
                    status: 'pending',
                    result: 'in progress',
                },
            ]);

        if (betError) {
            return res.status(500).json({ message: 'Error placing bet' });
        }

        // Step 5: Update user's balance
        const newBalance = userData.balance - stake;
        const { error: updateError } = await supabase
            .from('users')
            .update({ balance: newBalance })
            .eq('id', userData.id);

        if (updateError) {
            return res.status(500).json({ message: 'Error updating balance' });
        }

        // Step 6: Send success response
        res.status(200).json({ message: 'Bet placed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while placing the bet' });
    }
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
