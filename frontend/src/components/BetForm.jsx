import * as React from 'react';
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
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: '#121212', // Set the base background color
  backgroundImage: `
    linear-gradient(
      rgba(18, 18, 18, 0.8), 
      rgba(18, 18, 18, 0.8)
    ), 
    radial-gradient(
      ellipse at center, 
      hsl(210, 100%, 97%), 
      hsl(0, 0%, 100%)
    )`, // Blend the gradient with transparency
  backgroundBlendMode: 'overlay', // Ensure background colors mix
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

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <AppTheme {...props}>
      <BetContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', textAlign: 'start' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                // error={passwordError}
                // helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
            >
              Sign in
            </Button>
           
          </Box>
        
        </Card>
      </BetContainer>
    </AppTheme>
  );
}
