const supabase = require('../../supabase-client');


const fetchBets = async (req, res) => {
    const {userId} = req.query;

    const { data: userBets, error: userBetsError } = await supabase
    .from('p2p_bets')
    .select('*') // Retrieve all columns
    .or(`current_userid.eq.${userId},opponent_userid.eq.${userId}`); 
  if (userBetsError) {
    console.error('Error fetching bets:', userBetsError.message);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({
        success: false,
        message: 'Failed to fetch bets.',
        error: userBetsError.message,
      }),
    };
  } else {
    return {
      statusCode: 200, // OK
      body: JSON.stringify({
        success: true,
        message: 'Bets retrieved successfully.',
        data: userBets,
      }),
    };
  }
  

}

module.exports = {fetchBets};