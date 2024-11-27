import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
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
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import supabase from '../../../supabase-client';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { auth } from '../../../firebase'; 
import firebase from 'firebase/app';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', // Ensures container spans full screen height
  position: 'relative',
  padding: theme.spacing(2),
  overflowX: 'hidden', // Prevents horizontal overflow
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false); // Track loading state
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // Snackbar state for success message
  const [snackbarMessage, setSnackbarMessage] = React.useState(''); // Message for snackbar
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    navigate('/signin'); // Navigate to the Sign-In page
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check for errors before submitting
    if (nameError || emailError || passwordError) {
      return; // If there are errors, don't submit
    }
  
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
  
    setIsLoading(true);  // Show loading indicator
  
    try {
      // Register the user with Firebase Authentication
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      console.log('User object:', user);
  
      if (!user) {
        throw new Error('User registration failed');
      }
  
      // After successful registration, use Firebase user ID (UID)
      const firebaseUserId = user.uid;  // Get the Firebase user ID
  
      // Add the user to the "users" table in your Supabase database (or whichever database you're using)
      const { data: userData, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: firebaseUserId,  // Use the Firebase user ID as the UUID
            username: name,
            lichess_username: '',  // Left blank
            chess_com_username: '',  // Left blank
            balance: 0,  // Set balance to 0 initially
          },
        ]);
  
      if (insertError) {
        throw insertError;  // Handle any error from inserting into the database
      }
  
      // Success: Handle user registration success, show a success message, etc.
      console.log('User registered and added to the database!', userData);
  
    } catch (error) {
      console.error('Error during registration or login:', error.message);
      // Handle any error that occurred during registration or database insertion
    } finally {
      setIsLoading(false);  // Hide loading indicator
    }
  };
  
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close snackbar after it's shown
  };

  return (
    <AppTheme {...props}>
      <SignUpContainer direction="column" justifyContent="space-between">
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
              <FormLabel htmlFor="name">Full name</FormLabel>
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
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
              mt={1}
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
