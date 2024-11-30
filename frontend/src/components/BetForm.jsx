import * as React from 'react';
import { useState, useEffect } from 'react';
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
// import supabase from '../../../supabase-client';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import axios from 'axios';
import Alert from '@mui/material/Alert';

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
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  height: '100%',
  marginTop: "100px",
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    // backgroundImage:
    //   'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    // backgroundRepeat: 'no-repeat',
    // ...theme.applyStyles('dark', {
    //   backgroundImage:
    //     'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    // }),
  },
}));

export default function BetForm(props) {
  const [gameFormat, setGameFormat] = useState('');
  const [gameSeries, setGameSeries] = useState('');
  const [chessUsername, setChessUsername] = useState('');
  const [opp_chessUsername, setOppChessUsername] = useState('');
  const [opponentEmail, setOpponentEmail]= useState('');
  const [stake, setStake] = useState('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for errors before submitting
    if (!opponentEmail || !gameFormat || !gameSeries || !chessUsername || !opp_chessUsername || !stake) {
      setAlertMessage('Please fill out all fields.');
      setAlertSeverity('error');
      return; // If there are errors, don't submit
    }

    // setIsLoading(true);  // Show loading indicator

    try {
      // Send data to your backend for user registration
      const response = await axios.post('http://127.0.0.1:3000/place-bet', {
        opponentEmail,
        gameFormat,
        gameSeries,
        chessUsername,
        opp_chessUsername,
        stake
      });

      if (response.status === 200)
      {
        setAlertMessage("Successfully placed bet");
        setAlertSeverity("success")
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
      }
      

    } catch (error) {
      setAlertMessage('Something went wrong: ' + error.message);
      setAlertSeverity('error');
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    } finally {
      // setIsLoading(false);  // Hide loading indicator
    }
  };

    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <BetContainer>
          <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
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
                maxHeight: '80vh',  // Adjust the height as needed
                overflowY: 'auto',  // Adds the scrollbar
                paddingRight: '10px',  // Adjust for scrollbar visibility if needed
                '&::-webkit-scrollbar': {
                  display: 'none',  // Hides scrollbar for Webkit browsers
                },
                '-ms-overflow-style': 'none',  // Hides scrollbar for IE/Edge
                'scrollbar-width': 'none',  // Hides scrollbar for Firefox
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
    
              {/* Chess Username */}
              <FormControl>
                <FormLabel htmlFor="chessUsername">Lichess Username</FormLabel>
                <TextField
                  id="chessUsername"
                  type="text"
                  value={chessUsername}
                  onChange={(e) => setChessUsername(e.target.value)}
                  placeholder={`Enter your username`}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            
              {/* Opponent Chess Username */}
              <FormControl>
                <FormLabel htmlFor="oppChessUsername">Opponent Lichess Username</FormLabel>
                <TextField
                  id="oppChessUsername"
                  type="text"
                  value={opp_chessUsername}
                  onChange={(e) => setOppChessUsername(e.target.value)}
                  placeholder={`Enter your opponent's username`}
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
    
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
    
              {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
    
              {/* Submit Button */}
              <Button
                type="submit"
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