const { messaging } = require('firebase-admin');
const supabase = require('../../supabase-client');

const fetchBets = async (req, res) => {
  const { userId } = req.query;

  try {
    const {data: liveBets, error: liveBetsError} = await supabase
      .from('live-bets')
      .select("*")
      .eq('id', userId)

    if (liveBetsError)
    {
      return res.status(503).json({
        success: false,
        error: liveBetsError.message,
        message: "Failed to fetch live bets"
      })
    }

    else if(!liveBets)
    {
      return res.status(404).json({
        success: false,
        message: "You have no live bets"
      })
    }

    else if(liveBets)
    {
      return res.status(200).json({
        success: true,
        message: "bets retrieved successfully",
        data: liveBets
      })
    }

    const { data: userBets, error: userBetsError } = await supabase
      .from('p2p_bets')
      .select('*')
      .or(`current_userid.eq.${userId},opponent_userid.eq.${userId}`);
    
    if (userBetsError) {
      console.error('Error fetching bets:', userBetsError.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bets.',
        error: userBetsError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Bets retrieved successfully.',
      data: userBets,
    });
    
  } catch (err) {
    console.error('Unexpected error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
      error: err.message,
    });
  }
};

module.exports = { fetchBets };
