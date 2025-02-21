const supabase = require('../../supabase-client');

const placeBet = async (req, res) => {
    const { opponentEmail, stake, gameFormat, gameSeries, userId } = req.body;

    try {
        const { data: opponentData, error: opponentError } = await supabase
            .from('users')
            .select('*')
            .eq('email', opponentEmail.toLowerCase())
            .single();

        if (opponentError || !opponentData) {
            return res.status(400).json({ message: 'Opponent not found' });
        }
        const oppUserId = opponentData.id;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select("*")
            .eq("id", userId)
            .single();
        

        if (userError || !userData) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (userData.balance < stake) {
            return res.status(402).json({ message: 'Insufficient funds to place the bet' });
        }

        else if(opponentData.balance < stake)
        {
            return res.status(402).json({ message: 'Opponent has Insufficient funds to place the bet' });

        }

        const now = new Date();

        const { data: betData, error: betError } = await supabase
            .from('p2p_bets')
            .insert([
                {
                    bet_id: userData.id + oppUserId + now,
                    current_userid: userData.id,
                    opponent_userid: oppUserId,
                    opp_email: opponentEmail,
                    lichess_username: userData.lichess_username,
                    opp_lichess_username: opponentData.lichess_username,
                    match_format: gameFormat,
                    match_type: gameSeries,
                    bet_amount: stake,
                    status: 'pending',
                    result: 'in progress',
                },
            ]);

        if (betError) {
            return res.status(500).json({ message: 'Error placing bet', betError });
        }

        const newBalance = userData.balance - stake;
        const newOppBalance = opponentData.balance - stake;
        const { error: updateError } = await supabase
            .from('users')
            .update({ balance: newBalance })
            .eq('id', userData.id);

        if (updateError) {
            return res.status(500).json({ message: 'Error updating balance' });
        }

        const {error: oppUpdateError} = await supabase
            .from('users')
            .update({balance: newOppBalance})
            .eq('id', opponentData.id);
        
        if (oppUpdateError)
        {
            return res.status(500).json({message: `Error updating opponent balance`});
        }

        res.status(200).json({ message: 'Bet placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while placing the bet' });
    }
};

module.exports = { placeBet };
