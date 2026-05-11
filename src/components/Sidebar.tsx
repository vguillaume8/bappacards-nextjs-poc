'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { styled, keyframes } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IosShareIcon from '@mui/icons-material/IosShare';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import StarIcon from '@mui/icons-material/Star';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BadgeIcon from '@mui/icons-material/Badge';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Auth placeholders — will be replaced when auth is migrated
const user: { email: string } | null = null;
const isAdmin = false;
const isAffiliate = false;
// TODO: replace above placeholders with real auth context after auth migration

const drawerWidth = 240;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const subtlePulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(0.98); }
`;

const NewBadge = styled(Chip)(() => ({
  backgroundColor: '#4caf50',
  color: '#FFFFFF',
  fontWeight: 700,
  fontSize: '0.625rem',
  height: 18,
  borderRadius: '4px',
  padding: '0 6px',
  marginLeft: 'auto',
  letterSpacing: '0.05em',
  boxShadow: '0 2px 4px rgba(76, 175, 80, 0.3)',
  animation: `${subtlePulse} 3s ease-in-out infinite`,
}));

const AnimatedIcon = styled('div')(() => ({
  animation: `${pulse} 2s infinite ease-in-out`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AnimatedText = styled('div')(() => ({
  animation: `${pulse} 2s infinite ease-in-out`,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1A1A1A',
    backgroundImage: 'linear-gradient(180deg, #1A1A1A 0%, #151515 100%)',
    color: '#FFFFFF',
    borderRight: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: 'inset -1px 0 0 rgba(0, 0, 0, 0.3)',
    overflowX: 'hidden',
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-track': { background: 'rgba(255, 255, 255, 0.05)' },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '3px',
    },
  },
}));

interface MenuItem {
  text: React.ReactNode;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
  isNew?: boolean;
}

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // TODO: call logoutUser() after auth migration
    router.push('/');
  };

  // TODO: read group param from URL after router migration
  // const [navbarData, setNavbarData] = useState(navBarMap.default);
  // useEffect(() => { ... }, []);

  const menuItems: MenuItem[] = [
    ...(user
      ? [
          { text: 'Manage Profile', icon: <PersonIcon />, path: '/dashboard' },
          { text: 'Contacts', icon: <ContactsIcon />, path: '/contacts' },
          {
            text: 'Analytics',
            icon: (
              <AnimatedIcon>
                <AnalyticsIcon sx={{ color: '#4caf50' }} />
              </AnimatedIcon>
            ),
            path: '/analytics',
            isNew: true,
          },
          {
            text: (
              <AnimatedText>
                <Typography sx={{ fontWeight: 'bold', color: '#e53935' }}>
                  Upgrade Now
                </Typography>
              </AnimatedText>
            ),
            icon: (
              <AnimatedIcon>
                <StarIcon sx={{ color: '#e53935' }} />
              </AnimatedIcon>
            ),
            path: '/my-subscription',
          },
          ...(isAdmin
            ? [
                { text: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
                { text: 'Affiliate Manager', icon: <AccountBalanceIcon />, path: '/affiliate-manager' },
                { text: 'Staff', icon: <BadgeIcon />, path: '/staff' },
                { text: 'Card Tracking', icon: <ShoppingCartIcon />, path: '/staff/card-tracking' },
              ]
            : []),
          ...(isAffiliate || isAdmin
            ? [
                { text: 'Affiliate', icon: <MonetizationOnIcon />, path: '/affiliate' },
                {
                  text: 'Card Designer',
                  icon: <OpenInNewIcon />,
                  onClick: () => {
                    window.open('https://designer.bappacards.com', '_blank');
                  },
                },
              ]
            : [
                {
                  text: 'Become an Affiliate',
                  icon: <CardGiftcardIcon />,
                  path: '/become-an-affiliate',
                },
              ]),
          { text: 'Log Out', icon: <ExitToAppIcon />, onClick: handleLogout },
        ]
      : [{ text: 'Log In', icon: <LoginIcon />, path: '/log-in' }]),
  ];

  const LogoWithTitle = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.85 },
      }}
      onClick={() => {
        router.push('/');
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          color: '#FFFFFF',
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
        }}
      >
        BappaCards
      </Typography>
    </Box>
  );

  const drawer = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      {!isMobile && (
        <Box
          sx={{
            p: 3,
            pb: 2.5,
            mb: 1,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <LogoWithTitle />
          </Box>
          {user && (
            <IconButton
              aria-label="Share My Card"
              size="small"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': { color: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <IosShareIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
      <List sx={{ flex: 1, px: 0.5, pt: 1 }}>
        {menuItems.map((item, idx) => (
          <ListItem key={idx} disablePadding sx={{ mx: 1.5, mb: 0.5, width: 'auto' }}>
            <ListItemButton
              component={item.onClick ? 'div' : NextLink}
              href={item.onClick ? undefined : (item.path ?? '/')}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                }
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              selected={pathname === item.path}
              role="menuitem"
              aria-current={pathname === item.path ? 'page' : undefined}
              sx={{
                py: 1.25,
                px: 2,
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                transition:
                  'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                ...(pathname === item.path
                  ? {
                      backgroundColor: 'rgba(235, 28, 36, 0.10)',
                      borderLeft: '3px solid #EB1C24',
                      '&:hover': { backgroundColor: 'rgba(235, 28, 36, 0.14)' },
                    }
                  : {
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        transform: 'translateX(4px)',
                      },
                    }),
                '&:focus-visible': {
                  outline: '2px solid #EB1C24',
                  outlineOffset: '-2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                [theme.breakpoints.down('sm')]: {
                  py: 1.5,
                  px: 2.5,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname === item.path ? '#EB1C24' : 'rgba(255, 255, 255, 0.7)',
                  minWidth: 40,
                  mr: 1.5,
                  '& .MuiSvgIcon-root': { fontSize: '1.375rem' },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.text}
                    {item.isNew && <NewBadge label="NEW" size="small" />}
                  </Box>
                }
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      fontFamily: "'Lato', sans-serif",
                    },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer section of sidebar */}
      <Box
        sx={{
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      >
        <ListItem disablePadding sx={{ mx: 1.5, mb: 1, width: 'auto' }}>
          <ListItemButton
            component={NextLink}
            href="/products"
            onClick={() => { if (isMobile) handleDrawerToggle(); }}
            selected={pathname === '/products'}
            role="menuitem"
            aria-current={pathname === '/products' ? 'page' : undefined}
            sx={{
              py: 1.25,
              px: 2,
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              ...(pathname === '/products'
                ? {
                    backgroundColor: 'rgba(235, 28, 36, 0.10)',
                    borderLeft: '3px solid #EB1C24',
                    '&:hover': { backgroundColor: 'rgba(235, 28, 36, 0.14)' },
                  }
                : {
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      transform: 'translateX(4px)',
                    },
                  }),
            }}
          >
            <ListItemIcon
              sx={{
                color: pathname === '/products' ? '#EB1C24' : 'rgba(255, 255, 255, 0.7)',
                minWidth: 40,
                mr: 1.5,
                '& .MuiSvgIcon-root': { fontSize: '1.375rem' },
              }}
            >
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText
              primary="Products"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    fontFamily: "'Lato', sans-serif",
                  },
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 0.75 }}>
            {[
              { label: 'Quick Start', href: '/quick-guide' },
              { label: 'Guide', href: '/guide' },
              { label: 'Contact', href: '/contact' },
            ].map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && (
                  <Box component="span" sx={{ mx: 0.75, color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem' }}>
                    ·
                  </Box>
                )}
                <Box
                  component={NextLink}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.7rem',
                    fontFamily: "'Lato', sans-serif",
                    textDecoration: 'none',
                    '&:hover': { color: 'rgba(255,255,255,0.75)' },
                  }}
                >
                  {link.label}
                </Box>
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mb: 0.75 }}>
            {[
              { label: 'Terms', href: '/terms-of-service' },
              { label: 'Privacy', href: '/privacy-notice' },
            ].map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && (
                  <Box component="span" sx={{ mx: 0.75, color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem' }}>
                    ·
                  </Box>
                )}
                <Box
                  component={NextLink}
                  href={link.href}
                  sx={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.7rem',
                    fontFamily: "'Lato', sans-serif",
                    textDecoration: 'none',
                    '&:hover': { color: 'rgba(255,255,255,0.75)' },
                  }}
                >
                  {link.label}
                </Box>
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
            <Box
              component="a"
              href="https://instagram.com/bappacards"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', '&:hover': { color: 'rgba(255,255,255,0.75)' } }}
            >
              <InstagramIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box
              component="a"
              href="https://www.linkedin.com/company/bappa-cards"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', '&:hover': { color: 'rgba(255,255,255,0.75)' } }}
            >
              <LinkedInIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
          <Box sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', mt: 1 }}>
            &copy; {new Date().getFullYear()} BappaCards
          </Box>
        </Box>
      </Box>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'block', sm: 'none' },
          backgroundColor: '#000000',
          color: '#FFFFFF',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {isMobile && <LogoWithTitle />}
          {user && (
            <IconButton
              color="inherit"
              aria-label="Share My Card"
              sx={{ ml: 'auto' }}
            >
              <IosShareIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <StyledDrawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </StyledDrawer>
      </Box>
    </>
  );
};

export default Sidebar;
