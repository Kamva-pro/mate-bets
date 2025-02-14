const supabase = require('../../supabase-client');

const placeLiveBet = async(req, res) =>
{
    const {selectedBet, userId} = req.body;

    try {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select("*")
            .eq("id", userId)
            .single();
            
        if (userError || !userData) {
            return res.status(403).json({ message: 'User not authenticated', userError });
        }

        if (userData.balance < selectedBet.amount) {
            return res.status(402).json({ message: 'Insufficient funds to place the bet' });
        }

        const { data: betData, error: betError } = await supabase
            .from('live-bets')
            .insert([
                {
                    current_userId: userId,
                    game_id: selectedBet.gameId,
                    stake: selectedBet.amount,
                    player_picked: selectedBet.player,
                    result: "in progress"
                }
            ])
        if (betError || !betData) {
            return res.status(500).json({ message: 'Error placing bet: ', betError });
        }

        const newBalance = userData.balance - amount;
        const { error: updateError } = await supabase
            .from('users')
            .update({ balance: newBalance })
            .eq('id', userId);

        if (updateError) {
            return res.status(503).json({ message: 'Error updating balance: ', updateError});
        }

        res.status(200).json({ message: 'Bet placed successfully' });

    } catch (error) {
        res.status(500).json({ message: 'An unexpected error occured: ', error });
    }
}

module.exports = placeLiveBet;