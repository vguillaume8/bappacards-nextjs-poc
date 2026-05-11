'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Link,
  Button,
  IconButton,
  Drawer,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter, usePathname } from 'next/navigation';

// Auth placeholder — will be replaced when auth is migrated
const isLoggedIn = false;

// Solutions submenu items
const solutionsMenuItems = [
  { label: 'Higher Ed Solutions', href: '/solutions/higher-ed' },
  { label: 'Admissions & Enrollment', href: '/solutions/higher-ed/admissions' },
  { label: 'Career Development & Employer Relations', href: '/solutions/higher-ed/career-development' },
  { label: 'Faculty & Research', href: '/solutions/higher-ed/faculty-research' },
  { label: 'Institutional Advancement & Alumni Engagement', href: '/solutions/higher-ed/institutional-advancement' },
  { label: 'Communications & Marketing', href: '/solutions/higher-ed/communications-marketing' },
  { label: 'Leadership & Governance', href: '/solutions/higher-ed/leadership-governance' },
  { label: 'Student Affairs & Student Government', href: '/solutions/higher-ed/student-affairs' },
];

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  sx?: Record<string, unknown>;
}

interface ActionItem {
  label: string;
  href?: string;
  variant: string;
  onClick?: () => void;
  sx?: Record<string, unknown>;
  mobileSx?: Record<string, unknown>;
}

const defaultNavItems: NavItem[] = [
  { label: 'Solutions', hasDropdown: true },
  { label: 'Products', href: '/products' },
  { label: 'Connect', href: '/bappa-connect' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Become an Affiliate', href: '/become-an-affiliate' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const loggedOutActionItems: ActionItem[] = [
  { label: 'Login', href: '/log-in', variant: 'text' },
  {
    label: 'Get Started Free',
    href: '/sign-up',
    variant: 'contained',
    sx: {
      bgcolor: '#EB1C24',
      color: '#FFFFFF',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      px: 3,
      py: 1,
      borderRadius: '12px',
      whiteSpace: 'nowrap',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
      '&:hover': {
        bgcolor: '#D71920',
        color: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
];

const loggedInActionItems: ActionItem[] = [
  { label: 'Dashboard', href: '/dashboard', variant: 'text' },
  {
    label: 'Logout',
    variant: 'contained',
    onClick: () => {
      // TODO: call Firebase signOut() after auth migration
    },
    sx: {
      bgcolor: '#EB1C24',
      color: '#FFFFFF',
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 600,
      px: 3,
      py: 1,
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
      '&:hover': {
        bgcolor: '#D71920',
        color: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
    },
  },
];

interface HeaderProps {
  navItems?: NavItem[];
  backgroundColor?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Header = ({
  navItems = defaultNavItems,
  backgroundColor = '#FFFFFF',
  maxWidth = 'lg',
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsAnchor, setSolutionsAnchor] = useState<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const actionItems = isLoggedIn ? loggedInActionItems : loggedOutActionItems;

  const isActive = (item: NavItem): boolean => {
    if (item.hasDropdown) {
      return pathname.startsWith('/solutions');
    }
    if (item.href === '/home') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname === item.href;
  };

  const isSubmenuActive = (href: string): boolean => {
    return pathname === href;
  };

  const handleSolutionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (solutionsAnchor) {
      setSolutionsAnchor(null);
    } else {
      setSolutionsAnchor(event.currentTarget);
    }
  };

  const handleSolutionsClose = () => {
    setSolutionsAnchor(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleActionClick = (item: ActionItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
          backgroundColor: backgroundColor,
        }}
      >
        <Container maxWidth={maxWidth}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              height: { xs: '64px', md: '80px' },
              transition: 'all 0.3s ease',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexGrow: 0,
                borderRadius: '4px',
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 1100,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': { opacity: 0.85 },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '4px',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: '#000',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                BappaCards
              </Typography>
            </Link>

            {/* Center Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
                mx: { md: 2, lg: 3 },
              }}
            >
              {navItems.map((item, index) =>
                item.hasDropdown ? (
                  <Button
                    key={index}
                    id="solutions-button"
                    onClick={handleSolutionsClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: isActive(item) ? 'primary.main' : 'text.primary',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: isActive(item) ? 600 : 500,
                      position: 'relative',
                      pointerEvents: 'auto',
                      zIndex: 9999,
                      boxShadow: 'none',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', boxShadow: 'none' },
                      '&::after': isActive(item)
                        ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '3px',
                            backgroundColor: 'primary.main',
                            borderRadius: '2px',
                          }
                        : {},
                    }}
                    aria-haspopup="true"
                    aria-expanded={Boolean(solutionsAnchor)}
                    aria-controls={Boolean(solutionsAnchor) ? 'solutions-menu' : undefined}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Link
                    key={index}
                    href={item.href ?? '/'}
                    sx={{
                      color: isActive(item) ? 'primary.main' : 'text.primary',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: isActive(item) ? 600 : 500,
                      position: 'relative',
                      '&:hover': { color: 'primary.main' },
                      '&::after': isActive(item)
                        ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -4,
                            left: 0,
                            width: '100%',
                            height: '3px',
                            backgroundColor: 'primary.main',
                            borderRadius: '2px',
                          }
                        : {},
                      ...(item.sx || {}),
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </Box>

            {/* Right Side Buttons */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexGrow: 0 }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
                {actionItems.map((item, index) =>
                  item.variant === 'text' ? (
                    <Link
                      key={index}
                      href={item.href ?? '/'}
                      onClick={(e) => {
                        e.preventDefault();
                        handleActionClick(item);
                      }}
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' },
                        ...(item.sx || {}),
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Button
                      key={index}
                      variant={item.variant as 'contained' | 'outlined' | 'text'}
                      onClick={() => handleActionClick(item)}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        px: 3,
                        '&:hover': {
                          borderColor: 'primary.dark',
                          backgroundColor: 'rgba(235, 28, 36, 0.04)',
                        },
                        ...(item.sx || {}),
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                )}
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Solutions Dropdown Menu */}
      <Menu
        id="solutions-menu"
        anchorEl={solutionsAnchor}
        open={Boolean(solutionsAnchor)}
        onClose={handleSolutionsClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: '320px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          },
          list: {
            'aria-labelledby': 'solutions-button',
          },
        }}
      >
        {solutionsMenuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              router.push(item.href);
              handleSolutionsClose();
            }}
            sx={{
              py: 1.5,
              px: 2,
              backgroundColor: isSubmenuActive(item.href) ? 'rgba(235, 28, 36, 0.08)' : 'transparent',
              borderLeft: isSubmenuActive(item.href) ? '3px solid' : '3px solid transparent',
              borderColor: isSubmenuActive(item.href) ? 'primary.main' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(235, 28, 36, 0.08)' },
            }}
          >
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: index === 0 ? '1rem' : '0.95rem',
                    fontWeight: isSubmenuActive(item.href) ? 600 : index === 0 ? 600 : 400,
                    color: isSubmenuActive(item.href) ? 'primary.main' : 'inherit',
                  },
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        disableScrollLock={true}
        slotProps={{ paper: { sx: { width: '100%', bgcolor: 'background.paper' } } }}
      >
        <Box sx={{ p: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: '#000' }}
            >
              BappaCards
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Navigation Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {navItems.map((item, index) =>
              item.hasDropdown ? (
                <Box key={index}>
                  <Typography
                    sx={{
                      color: isActive(item) ? 'primary.main' : 'text.primary',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Box sx={{ pl: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {solutionsMenuItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        onClick={() => {
                          router.push(subItem.href);
                          setMobileMenuOpen(false);
                        }}
                        sx={{
                          color: isSubmenuActive(subItem.href) ? 'primary.main' : 'text.secondary',
                          textDecoration: 'none',
                          fontSize: '1rem',
                          fontWeight: isSubmenuActive(subItem.href) ? 600 : 400,
                          cursor: 'pointer',
                          pl: isSubmenuActive(subItem.href) ? 2 : 0,
                          borderLeft: isSubmenuActive(subItem.href) ? '3px solid' : 'none',
                          borderColor: 'primary.main',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Link
                  key={index}
                  onClick={() => {
                    router.push(item.href ?? '/');
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    color: isActive(item) ? 'primary.main' : 'text.primary',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: isActive(item) ? 600 : 400,
                    cursor: 'pointer',
                    pl: isActive(item) ? 2 : 0,
                    borderLeft: isActive(item) ? '3px solid' : 'none',
                    borderColor: 'primary.main',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Text action items in mobile */}
            {actionItems
              .filter((item) => item.variant === 'text')
              .map((item, index) => (
                <Link
                  key={`action-${index}`}
                  href={item.href ?? '/'}
                  onClick={(e) => {
                    e.preventDefault();
                    handleActionClick(item);
                    setMobileMenuOpen(false);
                  }}
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </Link>
              ))}
          </Box>

          {/* Button action items in mobile */}
          {actionItems
            .filter((item) => item.variant !== 'text')
            .map((item, index) => (
              <Button
                key={`action-btn-${index}`}
                variant={item.variant as 'contained' | 'outlined' | 'text'}
                fullWidth
                onClick={() => {
                  handleActionClick(item);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  mt: 4,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'rgba(235, 28, 36, 0.04)',
                  },
                  ...(item.mobileSx || {}),
                }}
              >
                {item.label}
              </Button>
            ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
