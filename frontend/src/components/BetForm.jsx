import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import { Link as RouterLink } from 'react-router-dom';
import supabase from '../../supabase-client';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(1.5),
  margin: 'auto',
  maxWidth: '100%',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const BetContainer = styled(Stack)(({ theme }) => ({
  marginTop: '60px',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: '#121212', 
  backgroundImage: `
    linear-gradient(
      rgba(18, 18, 18, 0.8), 
      rgba(18, 18, 18, 0.8)
    ), 
    radial-gradient(
      ellipse at center, 
      hsl(210, 100%, 97%), 
      hsl(0, 0%, 100%)
    )`,
  backgroundBlendMode: 'overlay', 
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  ...theme.applyStyles('dark', {
    backgroundColor: '#121212',
    backgroundImage: `
      linear-gradient(
        rgba(18, 18, 18, 0.8), 
        rgba(18, 18, 18, 0.8)
      ), 
      radial-gradient(
        ellipse at center, 
        hsla(210, 100%, 16%, 0.5), 
        hsl(220, 30%, 5%)
      )`,
    backgroundBlendMode: 'overlay',
  }),
}));

export default function BetForm(props) {
  const [gameFormat, setGameFormat] = useState('');
  const [chessWebsite, setChessWebsite] = useState('');
  const [gameSeries, setGameSeries] = useState('');
  const [chessUsername, setChessUsername] = useState('');
  const [opp_chessUsername, setOppChessUsername] = useState('');
  const opponentEmail= useState('');
  const [stake] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); 
  const auth = getAuth();
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('');

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!opponentEmail || !gameFormat || !chessWebsite || !chessUsername || !stake) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');

      const {data: betData, error: betError} = await supabase 
      .from("p2p_bets")
      .insert([
        {
          current_userID: user.uid,
          opponent_userID: opponentEmail, //{use this value to obtain their userID}
          lichess_username: chessUsername,
          opp_lichess_username: opp_chessUsername,
          match_format: gameFormat,
          match_type: gameSeries,
          bet_amount: stake,
          status: "pending",
          result: "in progress"
        }
      ]);

      if(betError)
      {
        setAlertMessage('Error placing bet:', betError);
        setAlertSeverity('error');
        
      }

      setAlertMessage('Bet has been successfully initiated');
      setAlertSeverity('success');
    }

  

  return (
    <AppTheme {...props}>
      <BetContainer>
      {alertMessage && (
        <Alert variant="outlined" severity={alertSeverity} style={{ marginBottom: '20px' }}>
          {alertMessage}
        </Alert>
      )}
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', textAlign: 'start' }}
          >
            Place Your Bet!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 2,
            }}
          >
            {/* Opponent Username */}
            <FormControl>
              <FormLabel htmlFor="opponentEmail">Opponent's Email</FormLabel>
              <TextField
                id="opponentEmail"
                type="email"
                name="opponentEmail"
                value={opponentEmail}
                onChange={(e) => setOpponentEmail(e.target.value)}
                placeholder="Enter opponent's email"
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
            </FormControl>

            {/* Game Format */}
            <FormControl>
              <FormLabel htmlFor="gameFormat">Game Format</FormLabel>
              <TextField
                id="gameFormat"
                select
                value={gameFormat}
                onChange={(e) => setGameFormat(e.target.value)}
                SelectProps={{ native: true }}
                required
                fullWidth
                variant="outlined"
              >
                <option value="" disabled>Select a format</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
                <option value="bullet">Bullet</option>
              </TextField>
            </FormControl>

            {/* Match Type */}
            <FormControl>
              <FormLabel htmlFor="gameseries">Game Series</FormLabel>
              <TextField
                id="gameseries"
                select
                value={gameSeries}
                onChange={(e) => setGameSeries(e.target.value)}
                SelectProps={{ native: true }}
                required
                fullWidth
                variant="outlined"
              >
                <option value="" disabled>Game Series</option>
                <option value="one_game">One Game</option>
                <option value="best_of_three">Best of Three</option>
                <option value="best_of_five">Best of Five</option>

              </TextField>
            </FormControl>

            {/* Chess Website */}
            {/* <FormControl>
              <FormLabel htmlFor="chessWebsite">Chess Website</FormLabel>
              <TextField
                id="chessWebsite"
                select
                value={chessWebsite}
                onChange={(e) => setChessWebsite(e.target.value)}
                SelectProps={{ native: true }}
                required
                fullWidth
                variant="outlined"
              >
                <option value="" disabled>Select a website</option>
                <option value="chess.com">Chess.com</option>
                <option value="lichess.org">Lichess.org</option>
              </TextField>
            </FormControl> */}

            {/* Chess Username */}
            {chessWebsite && (
              <FormControl>
                <FormLabel htmlFor="chessUsername">
                  Lichess Username
                </FormLabel>
                <TextField
                  id="chessUsername"
                  type="text"
                  value={chessUsername}
                  onChange={(e) => setChessUsername(e.target.value)}
                  placeholder={`Enter your ${chessWebsite} username`}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            )}

            
           
            {/* Stake */}
            <FormControl>
              <FormLabel htmlFor="stake">Stake</FormLabel>
              <TextField
                id="stake"
                type="number"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                placeholder="Enter the stake amount"
                required
                fullWidth
                variant="outlined"
                inputProps={{
                  min: 0,
                  step: 0.01,
                }}
              />
            </FormControl>

            {/* Error Message */}
            {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

            {/* Success Message */}
            {successMessage && <Typography sx={{ color: 'green' }}>{successMessage}</Typography>}

            {/* Submit Button */}
            <Button
              type="submit"
              onSubmit={handleSubmit()}
              fullWidth
              variant="contained"
            >
              Place Bet
            </Button>
          </Box>
        </Card>
      </BetContainer>
    </AppTheme>
  );

}