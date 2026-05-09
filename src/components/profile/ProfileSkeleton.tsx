'use client';

import { Box, Skeleton, Stack, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function ProfileSkeleton() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth="sm"
      disableGutters={isSmall}
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', py: isSmall ? 0 : 3 }}
    >
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '2/1' }} />
        <Box sx={{ px: 3, pb: 3 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mt: -4 }}>
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton variant="rounded" width={48} height={48} />
          </Stack>
          <Skeleton width="60%" height={32} sx={{ mt: 2 }} />
          <Skeleton width="40%" />
          <Skeleton width="35%" />
          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
            <Skeleton variant="rounded" height={36} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={36} sx={{ flex: 1 }} />
          </Stack>
          <Stack spacing={1} sx={{ mt: 3 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" height={40} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
