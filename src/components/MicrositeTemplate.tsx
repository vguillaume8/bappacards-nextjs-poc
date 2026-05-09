import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

export interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

export interface UseCaseItem {
  scenario: string;
  howBappaHelps: string;
  impact: string;
}

export interface ComparisonData {
  columns: Array<{ key: string; label: string }>;
  rows: Array<Record<string, string>>;
}

export interface MicrositeTemplateProps {
  pageTitle: string;
  pageDescription: string;

  heroId?: string;
  heroTitle: string;
  heroSubtext: string;
  heroBackground: 'black' | 'red';

  challengeId?: string;
  challengeTitle: string;
  challengeContent: string;

  solutionId?: string;
  solutionTitle: string;
  solutionContent: string;

  benefitsId?: string;
  benefitsTitle: string;
  benefits: BenefitItem[];

  useCasesId?: string;
  useCasesTitle: string;
  useCases: UseCaseItem[];

  compareId?: string;
  compareTitle?: string;
  comparisonData?: ComparisonData;

  impactId?: string;
  impactTitle: string;
  impactBullets: string[];

  ctaId?: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref?: string;
}

export default function MicrositeTemplate({
  heroId,
  heroTitle,
  heroSubtext,
  heroBackground,
  challengeId,
  challengeTitle,
  challengeContent,
  solutionId,
  solutionTitle,
  solutionContent,
  benefitsId,
  benefitsTitle,
  benefits,
  useCasesId,
  useCasesTitle,
  useCases,
  compareId,
  compareTitle,
  comparisonData,
  impactId,
  impactTitle,
  impactBullets,
  ctaId,
  ctaText,
  ctaButtonText,
  ctaHref = '/contact',
}: MicrositeTemplateProps) {
  const heroBg =
    heroBackground === 'red'
      ? 'linear-gradient(135deg, #EB1C24 0%, #8B0000 100%)'
      : 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)';

  return (
    <>
      {/* Hero */}
      <Box
        id={heroId}
        sx={{
          background: heroBg,
          color: '#fff',
          py: { xs: 10, md: 16 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            {heroTitle}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 5, opacity: 0.85, fontWeight: 400, lineHeight: 1.7 }}
          >
            {heroSubtext}
          </Typography>
          <Button

            href={ctaHref}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: heroBackground === 'red' ? '#fff' : '#EB1C24',
              color: heroBackground === 'red' ? '#EB1C24' : '#fff',
              fontWeight: 700,
              px: 5,
              py: 1.5,
              '&:hover': {
                backgroundColor: heroBackground === 'red' ? 'rgba(255,255,255,0.9)' : '#D71920',
              },
            }}
          >
            {ctaButtonText}
          </Button>
        </Container>
      </Box>

      {/* Challenge */}
      <Box id={challengeId} sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 4, textAlign: 'center' }}
          >
            {challengeTitle}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
            {challengeContent}
          </Typography>
        </Container>
      </Box>

      {/* Solution */}
      <Box id={solutionId} sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component="h2"
                variant="h4"
                sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
              >
                {solutionTitle}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
                {solutionContent}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: 3,
                  p: 4,
                  borderLeft: '4px solid #EB1C24',
                }}
              >
                <Typography variant="h6" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 2 }}>
                  Why Bappa?
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8, color: 'rgba(0,0,0,0.7)' }}>
                  BappaCards delivers a seamless digital networking experience — from NFC tap to instant
                  profile updates — so your team always makes the right impression with the most
                  current information.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits */}
      <Box id={benefitsId} sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            {benefitsTitle}
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 3,
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,0.1)' },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {benefit.icon && (
                      <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{benefit.icon}</Typography>
                    )}
                    {!benefit.icon && (
                      <Box
                        sx={{
                          width: 40,
                          height: 4,
                          backgroundColor: '#EB1C24',
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                    )}
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, mb: 1.5 }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.65)', lineHeight: 1.7 }}>
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Use Cases */}
      <Box id={useCasesId} sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
          >
            {useCasesTitle}
          </Typography>
          <TableContainer sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#000' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>
                    Scenario
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>
                    How Bappa Helps
                  </TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}>
                    Impact
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {useCases.map((uc, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:nth-of-type(odd)': { backgroundColor: '#F8F8F8' } }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{uc.scenario}</TableCell>
                    <TableCell sx={{ color: 'rgba(0,0,0,0.75)' }}>{uc.howBappaHelps}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: '#EB1C24',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        {uc.impact}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Comparison Table (optional) */}
      {comparisonData && (
        <Box id={compareId} sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#F8F8F8' }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              variant="h4"
              sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 6, textAlign: 'center' }}
            >
              {compareTitle}
            </Typography>
            <TableContainer
              sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#000' }}>
                    {comparisonData.columns.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{ color: '#fff', fontWeight: 700, fontFamily: "'Poppins', serif" }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comparisonData.rows.map((row, i) => (
                    <TableRow key={i} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                      {comparisonData.columns.map((col) => (
                        <TableCell key={col.key}>{row[col.key]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      )}

      {/* Impact */}
      <Box id={impactId} sx={{ py: { xs: 8, md: 12 }, backgroundColor: comparisonData ? '#fff' : '#F8F8F8' }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 5, textAlign: 'center' }}
          >
            {impactTitle}
          </Typography>
          <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
            {impactBullets.map((bullet, i) => (
              <Box
                key={i}
                component="li"
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#EB1C24',
                    mt: '6px',
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'rgba(0,0,0,0.8)' }}>
                  {bullet}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        id={ctaId}
        sx={{
          py: { xs: 10, md: 14 },
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ fontFamily: "'Poppins', serif", fontWeight: 700, mb: 3 }}
          >
            {ctaText}
          </Typography>
          <Button

            href={ctaHref}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#EB1C24',
              color: '#fff',
              fontWeight: 700,
              px: 5,
              py: 1.5,
              '&:hover': { backgroundColor: '#D71920' },
            }}
          >
            {ctaButtonText}
          </Button>
        </Container>
      </Box>
    </>
  );
}
