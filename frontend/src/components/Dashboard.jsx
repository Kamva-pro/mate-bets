import React, { useMemo, useState, useEffect } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Navbar from './Header'; 
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog'; 
import DialogActions from '@mui/material/DialogActions'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle'; 
import Button from '@mui/material/Button'; 
import ProCard from './ProCard';
import "../css/ProGames.css";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [opp_username, setOppUsername] = useState('');
  const [bets, setBets] = useState([]); // To store all bets


  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  // Handle opening the logout dialog
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle confirming the logout action
  const handleConfirmLogout = async () => {
      try {
        // Step 1: Clear the user data from localStorage
        localStorage.clear();
        // Step 3: Redirect user to login page
        navigate('/signin')
    
      } catch (error) {
        console.error('Error during logout:', error);
        
      }
    
  };



  useEffect(() => {
    console.log('Component mounted, window.confirm should be available now');

    const fetchBets = async () => {
      try {
        const userId = localStorage.getItem("userId");
    
        // Make the API call
        const response = await axios.get(`http://localhost:3000/api/fetch-bets?userId=${userId}`);
    
        // Check if the response indicates success
        if (response.status === 200 && response.data.success) {
          const bets = response.data.data; 
          setBets(bets); // Save the bets to state

    
          if (bets) {
            bets.forEach(bet => {
              setUsername(bet.lichess_username); 
              setOppUsername(bet.opp_lichess_username); 
            });
          }
          
        } else {
          console.error("Failed to fetch bets:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching bets:", error.message);
      }
    };
    
    fetchBets();
  }, []);

  // Updated NAVIGATION array
  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Account',
    },
    {
      segment: 'Profile',
      title: 'Profile',
      icon: <DashboardIcon />,
    },
    {
      segment: 'Deposit',
      title: 'Deposit',
      icon: <ShoppingCartIcon />,
    },
    {
      segment: 'Withdraw',
      title: 'Withdraw',
      icon: <ShoppingCartIcon />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'My Bets',
    },

        {
          segment: 'activebets',
          title: 'Active Bets',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'pastbets',
          title: 'Past Bets',
          icon: <DescriptionIcon />,
        },
  
    {
      segment: 'settings',
      title: 'Settings',
      icon: <LayersIcon />,
    },
    
  ];

  const handleNavigationClick = (navItem) => {
    if (navItem.actionOnly && navItem.onClick) {
      navItem.onClick();
    } else if (navItem.segment) {
      router.navigate(`/${navItem.segment}`);
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: () => handleNavigationClick(item),
      }))}
      // header={<Navbar/>} 
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          {router.pathname === '/Profile' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              <button type='button' onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
          {router.pathname === '/Deposit' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              This is the Deposit Screen
            </div>
          )}
          {router.pathname === '/Withdraw' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              This is the Withdraw Screen
            </div>
          )}
          {/* My Bets Screen */}
          {/* {router.pathname === '/bets' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              This is the My Bets Screen
            </div>
          )} */}

          {router.pathname === '/activebets' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              <div  className="progames-section" >
              {bets.map((bet, index) => (
              <ProCard
                key={index}
                playerOne={bet.lichess_username}
                playerTwo={bet.opp_lichess_username} 
                playerOneImg="../src/assets/avatar2.png"
                playerTwoImg="../src/assets/dog.png"
              />
            ))}
              </div>
            </div>
          )}

          {router.pathname === '/pastbets' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              This is the past bets screen
            </div>
          )}

          {router.pathname === '/settings' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              This is the Settings Screen
            </div>
          )}

          {/* Logout Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
              Are you sure you want to log out?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmLogout} color="secondary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
