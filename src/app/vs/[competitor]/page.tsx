import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COMPARISONS, COMPARISON_SLUGS } from '@/data/comparisons';

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export function generateStaticParams() {
  return COMPARISON_SLUGS.map((slug) => ({ competitor: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor } = await params;
  const data = COMPARISONS[competitor];
  if (!data) return { title: 'Not Found' };
  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
    alternates: { canonical: data.meta.canonical },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: 'website',
      url: data.meta.canonical,
      images: data.meta.ogImage ? [{ url: data.meta.ogImage }] : [],
    },
  };
}

export default async function CompetitorPage({ params }: PageProps) {
  const { competitor } = await params;
  const data = COMPARISONS[competitor];
  if (!data) notFound();

  const checkmark = '✓';
  const cross = '✗';

  return (
    <Box sx={{ bgcolor: '#f5f5f5' }}>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 60%, #EB1C24 100%)',
          color: 'white',
          py: { xs: 8, md: 14 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(235,28,36,0.3) 0%, rgba(235,28,36,0) 70%)',
            filter: 'blur(80px)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#EB1C24',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              mb: 2,
            }}
          >
            BappaCards vs {data.competitorName}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 900,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {data.hero.h1}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.85,
              maxWidth: '700px',
              mx: 'auto',
              mb: 5,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            {data.hero.subhead}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              href="/sign-up"
              sx={{
                background: 'linear-gradient(45deg, #EB1C24 30%, #ff3378 90%)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': { opacity: 0.9 },
              }}
            >
              {data.hero.primaryCtaLabel}
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="/pricing"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {data.hero.secondaryCtaLabel}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Problem Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '1.75rem', md: '2.5rem' } }}
          >
            {data.problemSection.h2}
          </Typography>
          <Typography sx={{ color: '#444', lineHeight: 1.8, mb: 3, fontSize: '1.05rem' }}>
            {data.problemSection.body}
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            {data.problemSection.bullets.map((bullet, i) => (
              <Typography
                key={i}
                component="li"
                sx={{ color: '#333', lineHeight: 1.8, mb: 1, fontSize: '1rem' }}
              >
                {bullet}
              </Typography>
            ))}
          </Box>
          <Typography
            sx={{
              color: '#EB1C24',
              fontWeight: 600,
              fontSize: '1.1rem',
              fontStyle: 'italic',
            }}
          >
            {data.problemSection.closer}
          </Typography>
        </Container>
      </Box>

      {/* Arc Table */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.arcTable.h2}
          </Typography>
          <Typography
            sx={{ color: '#666', mb: 4, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}
          >
            {data.arcTable.intro}
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#0f0f23' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '1rem', py: 2 }}>
                    Stage
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, py: 2 }}>
                    {data.competitorName}
                  </TableCell>
                  <TableCell sx={{ color: '#EB1C24', fontWeight: 700, py: 2 }}>
                    BappaCards
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.arcTable.rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:nth-of-type(even)': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                  >
                    <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{row.stage}</TableCell>
                    <TableCell sx={{ color: '#666', py: 1.5 }}>{row.competitor}</TableCell>
                    <TableCell sx={{ color: '#1a6b4a', fontWeight: 500, py: 1.5 }}>
                      {row.bappa}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data.arcTable.closer && (
            <Typography
              sx={{
                textAlign: 'center',
                mt: 3,
                color: '#555',
                fontStyle: 'italic',
                fontSize: '1rem',
              }}
            >
              {data.arcTable.closer}
            </Typography>
          )}
        </Container>
      </Box>

      {/* Feature Matrix */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.featureMatrix.h2}
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1rem', py: 2 }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#666', py: 2 }}>
                    {data.competitorName}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#EB1C24', py: 2 }}>
                    BappaCards
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.featureMatrix.rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:nth-of-type(even)': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                  >
                    <TableCell sx={{ py: 1.5, fontWeight: 500 }}>{row.feature}</TableCell>
                    <TableCell
                      sx={{
                        py: 1.5,
                        color: row.competitor === checkmark ? '#1a6b4a' : row.competitor === cross ? '#EB1C24' : '#555',
                        fontWeight: row.competitor === checkmark || row.competitor === cross ? 700 : 400,
                        fontSize: row.competitor === checkmark || row.competitor === cross ? '1.1rem' : '0.9rem',
                      }}
                    >
                      {row.competitor}
                    </TableCell>
                    <TableCell
                      sx={{
                        py: 1.5,
                        color: row.bappa === checkmark ? '#1a6b4a' : row.bappa === cross ? '#EB1C24' : '#1a6b4a',
                        fontWeight: row.bappa === checkmark || row.bappa === cross ? 700 : 500,
                        fontSize: row.bappa === checkmark || row.bappa === cross ? '1.1rem' : '0.9rem',
                      }}
                    >
                      {row.bappa}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* What You Lose */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: '#0f0f23',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.whatYouLose.h2}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {data.whatYouLose.items.map((item, i) => (
              <Box
                key={i}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1.5, color: '#EB1C24', fontSize: '1rem' }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Why Switch */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.whySwitch.h2}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            {data.whySwitch.items.map((item, i) => (
              <Box
                key={i}
                sx={{
                  p: 3,
                  borderRadius: '16px',
                  bgcolor: 'white',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'rgba(235,28,36,0.1)',
                    color: '#EB1C24',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0,
                    mt: 0.25,
                  }}
                >
                  {checkmark}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: '1rem' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      {data.testimonials.items.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 6,
                textAlign: 'center',
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              {data.testimonials.h2}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              {data.testimonials.items.map((t, i) => (
                <Box
                  key={i}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    bgcolor: '#f8f9fa',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '2rem',
                      color: '#EB1C24',
                      lineHeight: 1,
                      mb: 1,
                    }}
                  >
                    &ldquo;
                  </Typography>
                  <Typography
                    sx={{ color: '#333', lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                  >
                    {t.quote}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.author}</Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.85rem' }}>{t.title}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Migration Steps */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.migration.h2}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {data.migration.steps.map((step, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  p: 2.5,
                  bgcolor: 'white',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #EB1C24 0%, #ff3378 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Box>
                <Typography sx={{ lineHeight: 1.6, pt: 0.5, color: '#333' }}>{step}</Typography>
              </Box>
            ))}
          </Box>
          {data.migration.footer && (
            <Typography
              sx={{ textAlign: 'center', mt: 3, color: '#666', fontStyle: 'italic' }}
            >
              {data.migration.footer}
            </Typography>
          )}
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 4,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {data.faq.h2}
          </Typography>
          {data.faq.items.map((item, i) => (
            <Accordion
              key={i}
              sx={{
                mb: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '8px !important',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ bgcolor: '#f8f9fa', borderRadius: '8px' }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>{item.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: '#444', lineHeight: 1.7 }}>{item.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          background: 'linear-gradient(135deg, #EB1C24 0%, #ff3378 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            {data.finalCta.h2}
          </Typography>
          <Typography
            sx={{ opacity: 0.9, mb: 5, fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6 }}
          >
            {data.finalCta.body}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              href="/sign-up"
              sx={{
                bgcolor: 'white',
                color: '#EB1C24',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              {data.finalCta.primaryLabel}
            </Button>
            <Button
              variant="outlined"
              component={Link}
              href="/pricing"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.6)',
                px: 4,
                py: 1.5,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              {data.finalCta.secondaryLabel}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Cross-links to other comparisons */}
      <Box sx={{ py: 6, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 600, mb: 3, color: '#555' }}
          >
            Also compare BappaCards vs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {COMPARISON_SLUGS.filter((s) => s !== competitor).map((slug) => (
              <Button
                key={slug}
                component={Link}
                href={`/vs/${slug}`}
                variant="outlined"
                sx={{
                  borderColor: '#ddd',
                  color: '#555',
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': { borderColor: '#EB1C24', color: '#EB1C24' },
                }}
              >
                vs {COMPARISONS[slug].competitorName}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
