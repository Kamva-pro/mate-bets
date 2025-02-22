import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
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

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [lichessError, setLichessError] = React.useState(false);
  const [lichessErrorMessage, setLichessErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); 
  const [openSnackbar, setOpenSnackbar] = React.useState(false); 
  const [snackbarMessage, setSnackbarMessage] = React.useState(''); 
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword); 
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (nameError || emailError || passwordError) {
      return; 
    }
  
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email').toLowerCase();
    const password = data.get('password');
    const lichess_username = data.get('lichess_username')
  
    setIsLoading(true); 
  
    try{
      const response = await axios.post('http://localhost:3000/api/sign-up', {
        name,
        email,
        lichess_username,
        password
      });

      if(response.status === 200)
      {
        setAlertMessage("Account successfully created");
        setAlertSeverity("success")
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        handleLogin();
      }
    
    }

    catch (error) {
      setAlertMessage('Something went wrong: ' + error.message);
      setAlertSeverity('error');
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
    
    finally {
      setIsLoading(false); 
    }
  };
  

  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <AppTheme {...props}>
      <SignUpContainer direction="column" justifyContent="space-between">
      {alertMessage && (
        <Alert variant="outlined" severity={alertSeverity} style={{ marginBottom: '20px' }}>
          {alertMessage}
        </Alert>
      )}
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Username</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lichess_username">Lichess Username</FormLabel>
              <TextField
                autoComplete="Lichess Username"
                name="lichess_username"
                required
                fullWidth
                id="lichess_username"
                placeholder="DNGER_LVLS"
                error={lichessError}
                helperText={lichessErrorMessage}
                color={lichessError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={showPassword} onChange={handleShowPasswordToggle} />} 
              label="Show password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ padding: '0.9rem', fontWeight: 600 }}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Typography
                variant="subtitle2"
                fontWeight={300}
                color="text.secondary"
              >
                Already have an account?
              </Typography>
              <Link
                component={RouterLink}
                variant="button"
                color="primary"
                to="/signin"
              >
                Sign In
              </Link>
            </Stack>
          </Box>
        </Card>
      </SignUpContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('Error') ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AppTheme>
  );
}
