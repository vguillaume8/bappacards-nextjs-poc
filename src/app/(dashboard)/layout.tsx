import Sidebar from '@/components/Sidebar';
import Box from '@mui/material/Box';

const DRAWER_WIDTH = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { sm: `${DRAWER_WIDTH}px` },
          mt: { xs: '64px', sm: 0 },
          p: { xs: 2, md: 3 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
