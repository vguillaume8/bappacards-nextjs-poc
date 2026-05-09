import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';

export const metadata: Metadata = {
  title: 'Blog — Digital Business Card Tips & NFC Networking Guides',
  description:
    'Expert tips on digital networking, NFC business cards, and growing your professional network with BappaCards.',
  openGraph: {
    title: 'BappaCards Blog',
    description: 'Expert tips on digital networking, NFC business cards, and growing your professional network.',
  },
  twitter: { card: 'summary_large_image' },
};

export default function BlogPage() {
  return (
    <>
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h1" sx={{ color: '#fff', mb: 2, fontFamily: "'Poppins', serif" }}>
            The BappaCards Blog
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem' }}>
            Guides, tips, and insights on digital networking, NFC business cards, and modern prospecting.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid key={post.slug} size={{ xs: 12, sm: 6, md: 4 }}>
                {/* Wrap card with Link so no function is passed as component prop */}
                <Link href={`/blog/${post.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 3,
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.12)', transform: 'translateY(-2px)' },
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {post.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ fontSize: '0.7rem', backgroundColor: 'rgba(235,28,36,0.08)', color: '#EB1C24' }}
                          />
                        ))}
                      </Box>
                      <Typography variant="h6" component="h2" sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, lineHeight: 1.4 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, flex: 1 }}>
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.45)' }}>
                          {post.author}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.45)' }}>
                          {post.readTime}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
