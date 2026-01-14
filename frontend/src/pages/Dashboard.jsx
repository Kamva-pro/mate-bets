import React, { useMemo, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
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
import Navbar from '../components/Header';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ProCard from '../components/ProCard';
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

  const { userToken, currentUser } = useAuth(); // Hooks should be at top level
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

  const handleCardClick = (bet_id, player_one_lichess_username, player_two_lichess_username, format, status, bet_amount, result,) => {
    navigate('/betdetails', { state: { bet_id, player_one_lichess_username, player_two_lichess_username, format, status, bet_amount, result, } });
  }

  const handleConfirmLogout = async () => {
    try {
      localStorage.clear();
      await signOut(getAuth()); // Should use useAuth().logout() if available, but direct is fine
      navigate('/signin')

    } catch (error) {
      console.error('Error during logout:', error);

    }

  };

  useEffect(() => {
    console.log("Component mounted, window.confirm should be available now");

    const fetchBets = async () => {
      // Wait for token
      if (!userToken) return;

      try {
        const userId = currentUser ? currentUser.uid : localStorage.getItem("userId");

        // Make the API call with header
        const response = await axios.get(
          `http://localhost:3000/api/fetch-bets?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        );

        // Check if the response indicates success
        if (response.status === 200 && response.data.success) {
          const bets = response.data.data;
          // Handles the new structure {liveBets, p2PBets} or the array
          // The backend now returns { liveBets: [], p2pBets: [] }. 
          // I need to adapt this logic.
          // Original logic expected an array.

          let allBets = [];
          if (Array.isArray(bets)) {
            allBets = bets;
          } else if (bets.liveBets || bets.p2pBets) {
            allBets = [...(bets.liveBets || []), ...(bets.p2pBets || [])];
          }

          setBets(allBets);

          if (allBets) {
            const active = [];
            const past = [];

            allBets.forEach((bet) => {
              if (bet.result === "in progress") {
                active.push(bet);
              } else if (bet.result === "completed") {
                past.push(bet);
              }
            });

            setActiveBets(active);
            setPastBets(past);

            if (active.length > 0) {
              setUsername(active[0].lichess_username || active[0].creator_lichess); // creator_lichess is new field name?
              setOppUsername(active[0].opp_lichess_username || active[0].opponent_lichess);
            }
            if (past.length > 0) {
              setUsername(past[0].lichess_username || past[0].creator_lichess);
              setOppUsername(past[0].opp_lichess_username || past[0].opponent_lichess);
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
  }, [userToken, currentUser]); // Run when token changes


  const fetchGame = async (username, opp_username) => {
    if (!userToken) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/fetch-game?playerOne=${username}&opponent=${opp_username}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      );
      if (response.status !== 200) {
        throw new Error('Failed to fetch game data');
      }
      return response.data.data;

    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchGame = async () => {
    if (!username) {
      console.error('username not found');
      return;
    }

    else if (!opp_username) {
      console.error("Opponent username doesn't exist");
      return;
    }

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
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <h1>Deposit Funds</h1>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Amount to deposit"
                  id="depositAmount"
                  style={{ padding: '10px', fontSize: '16px' }}
                />
                <button
                  onClick={async () => {
                    const amount = document.getElementById('depositAmount').value;
                    if (!amount) return alert("Enter amount");
                    try {
                      const response = await axios.post('http://localhost:3000/api/deposit', { amount }, {
                        headers: { Authorization: `Bearer ${userToken}` }
                      });
                      if (response.status === 200) alert("Deposit successful!");
                    } catch (e) {
                      alert("Deposit failed: " + e.message);
                    }
                  }}
                  style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
                >
                  Deposit
                </button>
              </div>
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
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <ProCard
                      onClick={() => handleCardClick(bet.bet_id, bet.lichess_username, bet.opp_lichess_username, bet.match_format,
                        bet.status, bet.bet_amount, bet.result
                      )}

                      playerOne={bet.lichess_username || bet.creator_lichess}
                      playerTwo={bet.opp_lichess_username || bet.opponent_lichess}
                      playerOneImg="../src/assets/avatar2.png"
                      playerTwoImg="../src/assets/dog.png"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const response = await axios.post('http://localhost:3000/api/verify-result', { betId: bet.bet_id }, {
                            headers: { Authorization: `Bearer ${userToken}` }
                          });
                          alert(response.data.message);
                          // Refresh bets?
                          window.location.reload();
                        } catch (err) {
                          alert("Verification failed: " + (err.response?.data?.message || err.message));
                        }
                      }}
                      style={{ marginTop: '5px' }}
                    >
                      Check Result
                    </Button>
                  </div>
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
              <div className="progames-section" >
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
