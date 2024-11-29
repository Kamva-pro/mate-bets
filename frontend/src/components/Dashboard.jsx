import React, { useMemo, useState } from 'react';
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
import Navbar from './Header'; // Your custom Navbar component
import { getAuth, signOut } from 'firebase/auth';

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

  // Logout Handler
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log('User logged out successfully');
          router.navigate('/signin'); // Redirect to login page
        })
        .catch((error) => {
          console.error('Error during logout:', error.message);
        });
    }
  };

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
      title: 'Bets',
    },
    {
      segment: 'my bets',
      title: 'My Bets',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'active bets',
          title: 'Active Bets',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'past bets',
          title: 'Past Bets',
          icon: <DescriptionIcon />,
        },
      ],
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
      {/* Use your Navbar as the header */}
      <DashboardLayout>
      <PageContainer>
  {router.pathname === '/Profile' && (
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
      This is the Profile Screen
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
  {router.pathname === '/my bets' && (
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
  )}
  {router.pathname === '/active bets' && (
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
      This is the Active Bets Screen
    </div>
  )}
  {router.pathname === '/past bets' && (
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
      This is the Past Bets Screen
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
</PageContainer>

      </DashboardLayout>
    </AppProvider>
  );
}
