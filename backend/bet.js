// const express = require('express');
// const moment = require('moment');
// const supabase = require("../supabase-client");  // Assuming supabase-client.js is in the correct location

// const router = express.Router();

// const placeBet = async (req, res) => {
//     const { opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername } = req.body;

//     try {
//         // Fetch opponent data
//         const { data: opponentData, error: opponentError } = await supabase
//             .from('users')
//             .select('id')
//             .eq('email', opponentEmail)
//             .single();

//         if (opponentError || !opponentData) {
//             throw new Error('Opponent not found');
//         }

//         const oppUserId = opponentData.id;

//         // Fetch current user data
//         const { data: userData, error: userError } = await supabase
//             .from('users')
//             .select('id, balance')
//             .eq('email', chessUsername)
//             .single();

//         if (userError || !userData) {
//             throw new Error('User not found');
//         }

//         // Check if the user has sufficient balance
//         if (userData.balance < stake) {
//             throw new Error('Insufficient funds to place the bet');
//         }

//         // Generate a unique ID for the bet
//         const betId = `${userData.id}-${oppUserId}-${moment().format('YYYYMMDDHHmmss')}`;

//         // Insert bet into database
//         const { data: betData, error: betError } = await supabase
//             .from('p2p_bets')
//             .insert([
//                 {
//                     id: betId,
//                     current_userid: userData.id,
//                     opponent_userid: oppUserId,
//                     opp_email: opponentEmail,
//                     lichess_username: chessUsername,
//                     opp_lichess_username: opp_chessUsername,
//                     match_format: gameFormat,
//                     match_type: gameSeries,
//                     bet_amount: stake,
//                     status: 'pending',
//                     result: 'in progress',
//                 },
//             ]);

//         if (betError) {
//             throw new Error('Error placing bet');
//         }

//         // Update user's balance
//         const newBalance = userData.balance - stake;
//         const { error: updateError } = await supabase
//             .from('users')
//             .update({ balance: newBalance })
//             .eq('id', userData.id);

//         if (updateError) {
//             throw new Error('Error updating balance');
//         }

//         res.status(200).json({ message: 'Bet placed successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Define the POST route for placing bets
// router.post('/place-bet', placeBet);

// module.exports = router;
