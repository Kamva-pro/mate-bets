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
import ColorModeSelect from './shared-theme/ColorModeSelect';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Alert from '@mui/material/Alert';


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
  },
}));

export default function BetForm(props) {
  const [gameFormat, setGameFormat] = useState('');
  const [gameSeries, setGameSeries] = useState('');
  const [opponentEmail, setOpponentEmail] = useState('');
  const [stake, setStake] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('');


  const { userToken, currentUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userToken) {
      setAlertMessage("You must be logged in to place a bet.");
      setAlertSeverity("error");
      return;
    }

    if (!opponentEmail || !gameFormat || !gameSeries || !stake) {
      setAlertMessage('Please fill out all fields.');
      setAlertSeverity('error');
      return;
    }


    const userId = currentUser ? currentUser.uid : localStorage.getItem("userId");

    try {
      const response = await axios.post('http://localhost:3000/api/place-bet', {
        opponentEmail,
        gameFormat,
        gameSeries,
        stake,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });

      if (response.status === 200) {
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
              maxHeight: '80vh',
              overflowY: 'auto',
              paddingRight: '10px',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
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

            {/* <FormControl>
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
              </FormControl> */}

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