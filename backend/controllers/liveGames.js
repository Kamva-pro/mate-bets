const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); 

const axios = require('axios');
const ndjson = require('ndjson');
const url = 'https://lichess.org/api/tv/feed';

const fetchLiveGames = async (req, res) => {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            timeout: 10000, 
        });

        const stream = response.data.pipe(ndjson.parse());

        stream.on('data', (data) => {
            if (data.t === 'featured') {
                console.log('New featured game:', data.d);
            } else if (data.t === 'fen') {
                console.log('Game update:', data.d);
            }
        });

        stream.on('error', (err) => {
            console.error('Error reading stream:', err);
        });

        stream.on('end', () => {
            console.log('Stream ended');
        });
    }  catch (error) {    
        res.status(500).json({
            message: "Error fetching games",
            error: error.message,
        });
    }
    
};

module.exports = { fetchLiveGames };
