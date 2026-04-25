'use client';

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { label: 'Products', href: 'https://bappacards.com/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: 'https://bappacards.com/products#pricing' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#000',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              Bappa<Box component="span" sx={{ color: '#EB1C24' }}>Cards</Box>
            </Box>
          </Link>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                component={link.href.startsWith('http') ? 'a' : Link}
                sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff' } }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="contained"
              href="https://bappacards.com/signup"
              sx={{ ml: 2, backgroundColor: '#EB1C24', '&:hover': { backgroundColor: '#D71920' } }}
            >
              Get Started Free
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { md: 'none' }, color: '#fff' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2, px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  component={link.href.startsWith('http') ? 'a' : Link}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                href="https://bappacards.com/signup"
                sx={{ backgroundColor: '#EB1C24' }}
              >
                Get Started Free
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
