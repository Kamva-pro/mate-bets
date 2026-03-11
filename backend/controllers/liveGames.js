const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const axios = require('axios');
const ndjson = require('ndjson');
const url = 'https://lichess.org/api/tv/feed';

const fetchLiveGames = async (req, res) => {
    try {
        // 1. Get current top games in each channel
        const channelsResponse = await axios.get('https://lichess.org/api/tv/channels');
        const channels = channelsResponse.data;

        // 2. We want to fetch the full game details for the top channels (blitz, rapid, bullet, classical)
        const targetChannels = ['blitz', 'rapid', 'bullet', 'classical', 'best'];
        const gamePromises = targetChannels
            .filter(ch => channels[ch] && channels[ch].gameId)
            .map(async (ch) => {
                const gameId = channels[ch].gameId;
                try {
                    const gameDetails = await axios.get(`https://lichess.org/game/export/${gameId}`, {
                        headers: { Accept: 'application/json' }
                    });
                    return {
                        channel: ch,
                        ...gameDetails.data
                    };
                } catch (err) {
                    console.error(`Error fetching game ${gameId}:`, err.message);
                    return null;
                }
            });

        const games = (await Promise.all(gamePromises)).filter(g => g !== null);

        res.status(200).json({
            success: true,
            data: games,
        });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({
            message: "Error fetching games snapshot",
            error: error.message,
        });
    }
};

module.exports = { fetchLiveGames };
