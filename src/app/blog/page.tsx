import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { blogPosts } from '@/data/blogData';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata: Metadata = {
  title: 'Blog — Digital Business Card Tips & NFC Networking Guides',
  description:
    'Expert tips on digital networking, NFC business cards, and growing your professional network with BappaCards.',
  openGraph: {
    title: 'BappaCards Blog',
    description: 'Expert tips on digital networking, NFC business cards, and growing your professional network.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bappacards.com/blog',
  },
};

function getTopTags(posts: typeof blogPosts, limit = 10): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export default function BlogPage() {
  const topTags = getTopTags(blogPosts);

  return (
    <>
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h1"
            sx={{ color: '#fff', mb: 2, fontFamily: "'Poppins', serif" }}>
            The BappaCards Blog
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem' }}>
            Guides, tips, and insights on digital networking, NFC business cards, and modern prospecting.
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <BlogGrid posts={blogPosts} allTags={topTags} />
        </Container>
      </Box>
    </>
  );
}
