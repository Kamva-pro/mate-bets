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
  content: '""',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  const navigate = useNavigate(); 

  const [username, setUsername] = useState('');
  const [opp_username, setOppUsername] = useState('');
  const [pastBets, setPastBets] = useState([]); 
  const [activeBets, setActiveBets] = useState([]);
  const [bets, setBets] = useState([]);
  const [gameData, setGameData] = useState(null);


  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCardClick = (bet_id, player_one_lichess_username, player_two_lichess_username, format, status, bet_amount,  result, ) => {
    navigate('/betdetails', { state: { bet_id, player_one_lichess_username, player_two_lichess_username, format, status, bet_amount,  result, } });
  }

  const handleConfirmLogout = async () => {
      try {
        localStorage.clear();
        navigate('/signin')
    
      } catch (error) {
        console.error('Error during logout:', error);
        
      }
    
  };

  useEffect(() => {
    console.log("Component mounted, window.confirm should be available now");
  
    const fetchBets = async () => {
      try {
        const userId = localStorage.getItem("userId");
  
        // Make the API call
        const response = await axios.get(
          `http://localhost:3000/api/fetch-bets?userId=${userId}`
        );
  
        // Check if the response indicates success
        if (response.status === 200 && response.data.success) {
          const bets = response.data.data;
  
          setBets(bets);
  
          if (bets) {
            const active = [];
            const past = [];
  
            bets.forEach((bet) => {
              if (bet.result === "in progress") {
                active.push(bet);
              } else if (bet.result === "completed") {
                past.push(bet);
              }
            });
  
            setActiveBets(active);
            setPastBets(past);
  
            if (active.length > 0 ) {
              setUsername(active[0].lichess_username);
              setOppUsername(active[0].opp_lichess_username);
            }
            if(past.length > 0)
            {
              setUsername(past[0].lichess_username);
              setOppUsername(past[0].opp_lichess_username);

            }

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

  
  const fetchGame = async (username, opp_username) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/fetch-game?playerOne=${username}&opponent=${opp_username}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch game data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchGame = async () => {
    if (!username || !opp_username) return;

    const gameData = await fetchGame(username, opp_username);
    if (gameData) {
      setGameData(gameData); 
    }
  };

  useEffect(() => {
    if (username && opp_username) {
      handleFetchGame();
    }
  }, [username, opp_username]); 
  

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
              <div className="progames-section" >
              {activeBets.map((bet, index) => (
                

              <ProCard 
                onClick={() => handleCardClick(bet.bet_id, bet.lichess_username, bet.opp_lichess_username, bet.match_format,
                  bet.status, bet.bet_amount,  bet.result
                )}
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
                justifyContent: 'start',
                alignItems: 'start',
                height: '100vh',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
               <div  className="progames-section" >
              {pastBets.map((bet, index) => (
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
