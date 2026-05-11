'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  Tooltip,
  LinearProgress,
  Button,
  Alert,
  Skeleton,
  styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  LocationOn,
  Today,
  DateRange,
  CalendarMonth,
  History,
  TapAndPlay,
  BarChart as BarChartIcon,
  DonutLarge,
  MoreHoriz,
  Lock as LockIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  InfoOutlined,
  Link as LinkIcon,
  TouchApp,
  Phone,
  PersonAdd,
  Instagram,
  Language,
  Facebook,
  YouTube,
  LinkedIn,
  Email,
  AttachMoney,
  Paid,
  Payment,
  Contacts,
  X,
  Timeline,
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthProvider';
import { getUserAnalytics } from '@/lib/api';
import type { LocationMapProps } from './LocationMap';

// ──────────────────────────────────────────────
// Dynamic map import (SSR disabled — Leaflet requires window)
// ──────────────────────────────────────────────
const LocationMap = dynamic<LocationMapProps>(
  () => import('@/components/analytics/LocationMap'),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Loading map…</Typography>
      </Box>
    ),
  },
);

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface CityEntry {
  count: number;
  lat?: number;
  lng?: number;
  coordinates?: { latitude: number; longitude: number };
}

interface AnalyticsData {
  totalScans?: number;
  totalScansThisMonth?: number;
  totalScansThisWeek?: number;
  totalScansToday?: number;
  scansByCity?: Record<string, CityEntry>;
  scansByCityThisMonth?: Record<string, CityEntry>;
  scansByCityThisWeek?: Record<string, CityEntry>;
  scansByCityToday?: Record<string, CityEntry>;
}

interface IdentifierEntry {
  count: number;
  friendly_name?: string;
}

interface LinkClicksData {
  totalClicks?: number;
  clicksThisMonth?: number;
  clicksThisWeek?: number;
  clicksToday?: number;
  clicksByType?: Record<string, number>;
  clicksByTypeAndIdentifier?: Record<string, Record<string, IdentifierEntry>>;
}

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────
const CHART_COLORS = [
  '#1976d2',
  '#9c27b0',
  '#2e7d32',
  '#ed6c02',
  '#0288d1',
  '#d32f2f',
  '#7b1fa2',
  '#795548',
  '#607d8b',
  '#00796b',
];

const TIME_RANGES = [0, 25, 50, 100] as const;
type TimeRange = (typeof TIME_RANGES)[number];

// ──────────────────────────────────────────────
// Styled components
// ──────────────────────────────────────────────
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  maxHeight: 400,
  padding: theme.spacing(2),
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: '8px' },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: alpha(theme.palette.primary.main, 0.3),
    borderRadius: '4px',
  },
}));

const BarChartItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  transition: 'transform 0.2s ease',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    transform: 'translateX(4px)',
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
}));

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function getTimeRangeTitle(tr: TimeRange): string {
  switch (tr) {
    case 0: return 'All Time';
    case 25: return 'This Month';
    case 50: return 'This Week';
    case 100: return 'Today';
  }
}

function getTimeRangeIcon(tr: TimeRange) {
  switch (tr) {
    case 0: return <History />;
    case 25: return <CalendarMonth />;
    case 50: return <DateRange />;
    case 100: return <Today />;
  }
}

function getLinkIcon(type: string) {
  switch (type) {
    case 'instagram': return <Instagram fontSize="small" />;
    case 'facebook': return <Facebook fontSize="small" />;
    case 'twitter': return <X fontSize="small" />;
    case 'linkedin': return <LinkedIn fontSize="small" />;
    case 'youtube': return <YouTube fontSize="small" />;
    case 'website': return <Language fontSize="small" />;
    case 'whatsapp': return <Phone fontSize="small" />;
    case 'phone': return <Phone fontSize="small" />;
    case 'email': return <Email fontSize="small" />;
    case 'cashapp': return <AttachMoney fontSize="small" />;
    case 'venmo': return <Paid fontSize="small" />;
    case 'paypal': return <Payment fontSize="small" />;
    case 'save_contact': return <PersonAdd fontSize="small" />;
    case 'exchange_contact': return <Contacts fontSize="small" />;
    case 'snapchat': return <Timeline fontSize="small" />;
    case 'tiktok': return <BarChartIcon fontSize="small" />;
    default: return <TouchApp fontSize="small" />;
  }
}

function getLinkTypeFriendlyName(type: string): string {
  const map: Record<string, string> = {
    instagram: 'Instagram',
    twitter: 'X (Twitter)',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    snapchat: 'Snapchat',
    whatsapp: 'WhatsApp',
    website: 'Website',
    email: 'Email',
    phone: 'Phone',
    resume: 'Resume',
    calendly: 'Calendly',
    custom: 'Custom Link',
    save_contact: 'Save Contact',
    exchange_contact: 'Exchange Contact',
    cashapp: 'Cash App',
    venmo: 'Venmo',
    paypal: 'PayPal',
  };
  return map[type.toLowerCase()] ?? type;
}

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser, userData } = useAuth();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [linkClicksData, setLinkClicksData] = useState<LinkClicksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const timeRange = TIME_RANGES[tabValue];

  const hasPremium =
    (userData?.subscription as any)?.status === 'active' ||
    (userData?.subscription as any)?.status === 'trialing';

  // ── Fetch analytics ──
  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const token = await currentUser.getIdToken();
        const res = await getUserAnalytics(token);
        if (cancelled) return;
        if ('data' in res) {
          const d = res.data as any;
          setAnalyticsData(d?.analytics ?? d ?? null);
          setLinkClicksData(d?.linkClicks ?? null);
        } else {
          setError('Failed to load analytics data. Please try again later.');
        }
      } catch {
        if (!cancelled) setError('Failed to load analytics data. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [currentUser]);

  // ── Derived data ──
  const getCityData = useCallback(
    (tr: TimeRange): Array<[string, CityEntry]> => {
      if (!analyticsData) return [];
      const map =
        tr === 0
          ? analyticsData.scansByCity
          : tr === 25
          ? analyticsData.scansByCityThisMonth
          : tr === 50
          ? analyticsData.scansByCityThisWeek
          : analyticsData.scansByCityToday;
      return Object.entries(map ?? {}).sort((a, b) => b[1].count - a[1].count);
    },
    [analyticsData],
  );

  const getTotalTaps = (tr: TimeRange): number => {
    if (!analyticsData) return 0;
    switch (tr) {
      case 0: return analyticsData.totalScans ?? 0;
      case 25: return analyticsData.totalScansThisMonth ?? 0;
      case 50: return analyticsData.totalScansThisWeek ?? 0;
      case 100: return analyticsData.totalScansToday ?? 0;
    }
  };

  const getTotalLinkClicks = (tr: TimeRange): number => {
    if (!linkClicksData) return 0;
    switch (tr) {
      case 0: return linkClicksData.totalClicks ?? 0;
      case 25: return linkClicksData.clicksThisMonth ?? 0;
      case 50: return linkClicksData.clicksThisWeek ?? 0;
      case 100: return linkClicksData.clicksToday ?? 0;
    }
  };

  // Bar chart data for city taps
  const barChartData = useMemo(() => {
    const cityData = getCityData(timeRange);
    return cityData.slice(0, 10).map(([city, data], index) => ({
      city,
      taps: data.count,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }));
  }, [timeRange, getCityData]);

  const maxBarValue = useMemo(
    () => (barChartData.length === 0 ? 0 : Math.max(...barChartData.map((d) => d.taps))),
    [barChartData],
  );

  const pieChartData = useMemo(() => {
    const cityData = getCityData(timeRange);
    const top5 = cityData.slice(0, 5);
    const total = cityData.reduce((s, [, d]) => s + d.count, 0);
    if (total === 0) return [];
    const colorMap: Record<string, string> = {};
    barChartData.forEach((item) => { colorMap[item.city] = item.color; });
    const result = top5.map(([city, data]) => ({
      id: city,
      label: city,
      value: data.count,
      percentage: Math.round((data.count / total) * 100),
      color: colorMap[city] ?? CHART_COLORS[0],
    }));
    if (cityData.length > 5) {
      const otherTotal = cityData.slice(5).reduce((s, [, d]) => s + d.count, 0);
      if (otherTotal > 0) {
        result.push({
          id: 'Other',
          label: 'Other',
          value: otherTotal,
          percentage: Math.round((otherTotal / total) * 100),
          color: theme.palette.grey[500],
        });
      }
    }
    return result;
  }, [timeRange, getCityData, barChartData, theme]);

  // Link clicks chart data
  const linkClicksChartData = useMemo(() => {
    if (!linkClicksData?.clicksByType) return [];
    return Object.entries(linkClicksData.clicksByType)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        type: item.type,
        displayName: getLinkTypeFriendlyName(item.type),
        clicks: item.count,
        color: CHART_COLORS[index % CHART_COLORS.length],
      }));
  }, [linkClicksData]);

  const maxLinkClicksValue = useMemo(
    () =>
      linkClicksChartData.length === 0
        ? 0
        : Math.max(...linkClicksChartData.map((d) => d.clicks)),
    [linkClicksChartData],
  );

  const linkClicksPieData = useMemo(() => {
    if (!linkClicksData?.clicksByType) return [];
    const total = Object.values(linkClicksData.clicksByType).reduce((s, n) => s + n, 0);
    if (total === 0) return [];
    const colorMap: Record<string, string> = {};
    linkClicksChartData.forEach((item) => { colorMap[item.type] = item.color; });
    return linkClicksChartData.map((item) => ({
      id: item.type,
      label: item.displayName,
      value: item.clicks,
      percentage: Math.round((item.clicks / total) * 100),
      color: colorMap[item.type] ?? CHART_COLORS[0],
    }));
  }, [linkClicksData, linkClicksChartData]);

  // City markers for map (only entries with coordinates)
  const mapCities = useMemo(() => {
    const cityData = getCityData(timeRange);
    return cityData
      .map(([name, data]) => {
        const lat =
          data.lat ??
          (data.coordinates ? data.coordinates.latitude : undefined);
        const lng =
          data.lng ??
          (data.coordinates ? data.coordinates.longitude : undefined);
        if (lat == null || lng == null) return null;
        return { name, count: data.count, lat, lng };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
  }, [timeRange, getCityData]);

  const cityData = getCityData(timeRange);
  const topCity = cityData.length > 0 ? cityData[0][0] : '—';

  const getFriendlyLinkName = (type: string, identifier: string): string => {
    const typeData = linkClicksData?.clicksByTypeAndIdentifier?.[type];
    if (!typeData) return identifier;
    const entry = typeData[identifier];
    if (!entry) return identifier;
    if (type === 'linkedin' && identifier.includes('linkedin.com/')) {
      try {
        const url = new URL(identifier.startsWith('http') ? identifier : `https://${identifier}`);
        return url.origin + url.pathname;
      } catch {
        return identifier;
      }
    }
    return entry.friendly_name ?? identifier;
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // ── Render helpers ──
  const renderTabs = () => (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant={isMobile ? 'scrollable' : 'fullWidth'}
        scrollButtons={isMobile ? 'auto' : false}
        indicatorColor="primary"
        textColor="primary"
        sx={{ '& .MuiTab-root': { minHeight: 48, fontWeight: 500 } }}
      >
        <Tab icon={<History />} label={isMobile ? '' : 'All Time'} iconPosition="start" />
        <Tab icon={<CalendarMonth />} label={isMobile ? '' : 'This Month'} iconPosition="start" />
        <Tab icon={<DateRange />} label={isMobile ? '' : 'This Week'} iconPosition="start" />
        <Tab icon={<Today />} label={isMobile ? '' : 'Today'} iconPosition="start" />
      </Tabs>
    </Paper>
  );

  const renderSkeletonCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[0, 1, 2, 3].map((i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Skeleton variant="circular" width={56} height={56} sx={{ mx: 'auto', mb: 2 }} />
              <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
              <Skeleton variant="text" width="40%" sx={{ mx: 'auto', height: 40 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderSummaryCards = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
              <TapAndPlay fontSize="large" />
            </Avatar>
            <StatLabel>Total Card Taps</StatLabel>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600, color: theme.palette.primary.main }}>
              {getTotalTaps(timeRange)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {getTimeRangeTitle(timeRange)}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.info.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
              <LinkIcon fontSize="large" />
            </Avatar>
            <StatLabel>Total Link Clicks</StatLabel>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600, color: theme.palette.primary.main }}>
              {getTotalLinkClicks(timeRange)}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {getTimeRangeTitle(timeRange)}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
              <LocationOn fontSize="large" />
            </Avatar>
            <StatLabel>Top City</StatLabel>
            <Typography
              sx={{
                fontSize: topCity.length > 12 ? '1.2rem' : '2rem',
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              {topCity}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Most taps {getTimeRangeTitle(timeRange).toLowerCase()}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Avatar sx={{ bgcolor: theme.palette.success.main, width: 56, height: 56, mx: 'auto', mb: 2 }}>
              {getTimeRangeIcon(timeRange)}
            </Avatar>
            <StatLabel>Total Cities Reached</StatLabel>
            <Typography sx={{ fontSize: '2rem', fontWeight: 600, color: theme.palette.primary.main }}>
              {cityData.length}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Unique locations
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  const renderBarChart = (
    data: Array<{ label: string; value: number; color: string }>,
    maxValue: number,
    emptyMsg: string,
  ) => (
    <ChartContainer>
      {data.length > 0 ? (
        data.map((item, index) => (
          <BarChartItem key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  maxWidth: '70%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: item.color,
                  backgroundColor: alpha(item.color, 0.1),
                  padding: '2px 8px',
                  borderRadius: '12px',
                  minWidth: '36px',
                  textAlign: 'center',
                }}
              >
                {item.value}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={maxValue > 0 ? (item.value / maxValue) * 100 : 0}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: alpha(item.color, 0.15),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  backgroundColor: item.color,
                  backgroundImage: `linear-gradient(90deg, ${alpha(item.color, 0.8)} 0%, ${item.color} 100%)`,
                  boxShadow: `0 2px 5px ${alpha(item.color, 0.3)}`,
                },
              }}
            />
          </BarChartItem>
        ))
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
          <Typography variant="body1" color="textSecondary">
            {emptyMsg}
          </Typography>
        </Box>
      )}
    </ChartContainer>
  );

  const renderPieCards = (
    data: Array<{ id: string; label: string; value: number; percentage: number; color: string }>,
    unit: string,
    emptyMsg: string,
  ) => (
    <>
      {data.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {data.map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 1.5,
                  flex: '1 0 calc(33% - 16px)',
                  minWidth: '120px',
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  borderRadius: 2,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    backgroundColor: item.color,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: item.color }}>
                  {item.percentage}%
                </Typography>
                <Typography variant="body2" noWrap title={item.label}>
                  {item.label.length > 12 ? `${item.label.substring(0, 12)}…` : item.label}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.value} {unit}
                </Typography>
              </Paper>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.map((item, index) => (
              <Chip
                key={index}
                icon={
                  <Box
                    component="span"
                    sx={{ width: 14, height: 14, backgroundColor: item.color, borderRadius: '50%' }}
                  />
                }
                label={`${item.label}: ${item.percentage}%`}
                variant="outlined"
                size="small"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
          <Typography variant="body1" color="textSecondary">
            {emptyMsg}
          </Typography>
        </Box>
      )}
    </>
  );

  const renderPremiumGate = (feature: string) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        gap: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        borderRadius: 2,
        border: `1px dashed ${theme.palette.divider}`,
      }}
    >
      <LockIcon sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
      <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        {feature} is a <strong>Premium</strong> feature.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="small"
        component={NextLink}
        href="/get-premium"
        startIcon={<StarIcon />}
      >
        Upgrade to Premium
      </Button>
    </Box>
  );

  // ── Guards ──
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
          Your Card Analytics
        </Typography>
        {renderSkeletonCards()}
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // ── Full render ──
  return (
    <Container maxWidth="xl" sx={{ py: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}
          >
            Your Card Analytics
          </Typography>

          {/* Time range tabs */}
          {renderTabs()}

          {/* Summary cards */}
          {renderSummaryCards()}

          {/* Location map */}
          {hasPremium ? (
            mapCities.length > 0 && (
              <>
                <Box
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <Suspense
                    fallback={
                      <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">Loading map…</Typography>
                      </Box>
                    }
                  >
                    <LocationMap cities={mapCities} />
                  </Suspense>
                </Box>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    <InfoOutlined sx={{ fontSize: 14, verticalAlign: 'text-bottom', mr: 0.5 }} />
                    Location data is approximate and may not always be accurate.
                  </Typography>
                </Box>
              </>
            )
          ) : (
            <Box sx={{ mb: 3 }}>{renderPremiumGate('Location Map')}</Box>
          )}

          {/* Card tap analysis */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, mt: 2, display: 'flex', alignItems: 'center' }}>
            <TapAndPlay sx={{ mr: 1 }} />
            Card Tap Analysis
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Top Cities bar chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BarChartIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Top Cities by Taps
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent>
                  {renderBarChart(
                    barChartData.map((d) => ({ label: d.city, value: d.taps, color: d.color })),
                    maxBarValue,
                    'No city data available for this time period',
                  )}
                </CardContent>
              </StyledCard>
            </Grid>

            {/* City distribution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DonutLarge color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Tap Distribution by City
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent>
                  {hasPremium ? (
                    renderPieCards(pieChartData, 'taps', 'No data available for this time period')
                  ) : (
                    renderPremiumGate('City distribution chart')
                  )}
                </CardContent>
              </StyledCard>
            </Grid>

            {/* City chips */}
            <Grid size={{ xs: 12 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {`Taps by City (${getTimeRangeTitle(timeRange)})`}
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {cityData.length > 0 ? (
                      <>
                        {cityData.slice(0, 20).map(([city, data], index) => {
                          const chartItem = barChartData.find((b) => b.city === city);
                          const color = chartItem?.color ?? CHART_COLORS[index % CHART_COLORS.length];
                          return (
                            <Chip
                              key={city}
                              icon={<LocationOn />}
                              label={`${city}: ${data.count}`}
                              variant="filled"
                              sx={{
                                fontWeight: 500,
                                bgcolor: color,
                                color: theme.palette.getContrastText(color),
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                },
                              }}
                            />
                          );
                        })}
                        {cityData.length > 20 && (
                          <Chip
                            icon={<MoreHoriz />}
                            label={`+${cityData.length - 20} more`}
                            color="secondary"
                          />
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" color="textSecondary">
                        No city data available for this time period
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Link click analysis */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center' }}>
            <LinkIcon sx={{ mr: 1 }} />
            Link Click Analysis
          </Typography>

          <Grid container spacing={3}>
            {/* Link clicks bar chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BarChartIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Link Clicks by Type
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent>
                  {hasPremium ? (
                    renderBarChart(
                      linkClicksChartData.map((d) => ({
                        label: d.displayName,
                        value: d.clicks,
                        color: d.color,
                      })),
                      maxLinkClicksValue,
                      'No link click data available',
                    )
                  ) : (
                    renderPremiumGate('Link click breakdown')
                  )}
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Link clicks distribution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StyledCard>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DonutLarge color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Link Click Distribution
                      </Typography>
                    </Box>
                  }
                />
                <Divider />
                <CardContent>
                  {hasPremium ? (
                    renderPieCards(linkClicksPieData, 'clicks', 'No link click data available')
                  ) : (
                    renderPremiumGate('Link click distribution')
                  )}
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Detailed link clicks (premium only) */}
            {hasPremium &&
              linkClicksData?.clicksByTypeAndIdentifier &&
              Object.keys(linkClicksData.clicksByTypeAndIdentifier).length > 0 && (
                <Grid size={{ xs: 12 }}>
                  <StyledCard>
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinkIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Detailed Link Clicks
                          </Typography>
                        </Box>
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.entries(linkClicksData.clicksByTypeAndIdentifier).map(
                          ([type, identifiers], typeIndex) => {
                            const typeColor =
                              linkClicksChartData.find((item) => item.type === type)?.color ??
                              theme.palette.primary.main;
                            const totalTypeClicks = Object.values(identifiers).reduce(
                              (s, e) => s + (e.count ?? 0),
                              0,
                            );
                            return (
                              <Box
                                key={typeIndex}
                                sx={{
                                  mb: 4,
                                  width: { xs: '100%', md: '50%', lg: '33.33%' },
                                  pr: { xs: 0, md: 2, lg: 3 },
                                  pb: { xs: 3, md: 0 },
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1.5,
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                      component="span"
                                      sx={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: typeColor,
                                        borderRadius: '50%',
                                        mr: 1.5,
                                      }}
                                    />
                                    <Typography
                                      variant="subtitle1"
                                      sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                    >
                                      {getLinkTypeFriendlyName(type)}
                                    </Typography>
                                  </Box>
                                  <Chip
                                    label={`${totalTypeClicks} ${totalTypeClicks === 1 ? 'click' : 'clicks'}`}
                                    size="small"
                                    sx={{
                                      backgroundColor: alpha(typeColor, 0.1),
                                      color: typeColor,
                                      fontWeight: 500,
                                      borderRadius: '4px',
                                    }}
                                  />
                                </Box>

                                <Box
                                  sx={{
                                    pl: 3,
                                    borderLeft: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                                    ml: 0.5,
                                  }}
                                >
                                  {Object.entries(identifiers).map(
                                    ([identifier, data], identifierIndex) => {
                                      const displayName = getFriendlyLinkName(type, identifier);
                                      const showTooltip =
                                        !!data.friendly_name &&
                                        data.friendly_name !== identifier;
                                      return (
                                        <Box
                                          key={identifierIndex}
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            py: 1.5,
                                            ...(identifierIndex !==
                                              Object.entries(identifiers).length - 1 && {
                                              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            }),
                                          }}
                                        >
                                          <Avatar
                                            sx={{
                                              width: 36,
                                              height: 36,
                                              backgroundColor: alpha(typeColor, 0.1),
                                              color: typeColor,
                                              fontSize: '0.875rem',
                                              mr: 2,
                                            }}
                                          >
                                            {getLinkIcon(type)}
                                          </Avatar>
                                          <Box
                                            sx={{
                                              flex: 1,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <Box>
                                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                  {displayName}
                                                </Typography>
                                                {showTooltip && (
                                                  <Tooltip title={identifier} arrow>
                                                    <InfoOutlined
                                                      sx={{
                                                        ml: 1,
                                                        color: theme.palette.text.secondary,
                                                        cursor: 'help',
                                                        fontSize: '0.875rem',
                                                      }}
                                                    />
                                                  </Tooltip>
                                                )}
                                              </Box>
                                              <Typography variant="caption" color="textSecondary">
                                                {data.count} {data.count === 1 ? 'click' : 'clicks'}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </Box>
                                      );
                                    },
                                  )}
                                </Box>
                              </Box>
                            );
                          },
                        )}
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              )}

            {/* Non-premium paywall overlay */}
            {!hasPremium && (
              <Grid size={{ xs: 12 }}>
                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                  {/* Blurred preview skeleton */}
                  <Box sx={{ filter: 'blur(6px)', pointerEvents: 'none', opacity: 0.6 }}>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <StyledCard>
                          <CardHeader title={<Skeleton width={180} />} />
                          <Divider />
                          <CardContent sx={{ height: 200 }} />
                        </StyledCard>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <StyledCard>
                          <CardHeader title={<Skeleton width={180} />} />
                          <Divider />
                          <CardContent sx={{ height: 200 }} />
                        </StyledCard>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* Upgrade overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      zIndex: 10,
                      p: 3,
                      borderRadius: 2,
                    }}
                  >
                    <LockIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 2, textAlign: 'center' }}>
                      Unlock Full Analytics with Premium
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'white', mb: 3, textAlign: 'center', maxWidth: 600 }}
                    >
                      Get detailed insights about your card&apos;s performance. See where your card is
                      being tapped, track engagement over time, and make data-driven decisions.
                    </Typography>
                    {[
                      'View detailed tap statistics across all time periods',
                      'Track link click activity for all your profile links',
                      'See interactive maps showing where your card is being used',
                      'Track engagement trends with beautiful charts',
                    ].map((text) => (
                      <Box
                        key={text}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          width: '100%',
                          maxWidth: 500,
                        }}
                      >
                        <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 2 }} />
                        <Typography variant="body1" sx={{ color: 'white' }}>
                          {text}
                        </Typography>
                      </Box>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={NextLink}
                      href="/get-premium"
                      startIcon={<StarIcon />}
                      sx={{ fontWeight: 600, px: 4, py: 1.5 }}
                    >
                      Upgrade to Bappa Premium
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
}
