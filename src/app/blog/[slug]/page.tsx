import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { blogPosts } from '@/data/blogData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `https://bappacards.com/blog/${slug}`,
    },
  };
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const nodes: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      nodes.push(
        <Typography key={key++} component="h2" variant="h4"
          sx={{ mt: 5, mb: 2, fontFamily: "'Poppins', serif", fontWeight: 600 }}>
          {line.slice(3)}
        </Typography>
      );
    } else if (line.startsWith('### ')) {
      nodes.push(
        <Typography key={key++} component="h3" variant="h5"
          sx={{ mt: 4, mb: 1.5, fontFamily: "'Poppins', serif", fontWeight: 600 }}>
          {line.slice(4)}
        </Typography>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      nodes.push(
        <Typography key={key++} variant="body1" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
          {line.slice(2, -2)}
        </Typography>
      );
    } else if (line.startsWith('- ')) {
      nodes.push(
        <Box key={key++} component="li" sx={{ mb: 0.5, ml: 2, color: 'rgba(0,0,0,0.75)', lineHeight: 1.7 }}>
          {line.slice(2)}
        </Box>
      );
    } else if (line.trim() === '') {
      nodes.push(<Box key={key++} sx={{ mb: 1 }} />);
    } else {
      // Strip markdown links for plain rendering
      const stripped = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      if (stripped.trim()) {
        nodes.push(
          <Typography key={key++} variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: 'rgba(0,0,0,0.8)' }}>
            {stripped}
          </Typography>
        );
      }
    }
  }
  return nodes;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'BappaCards',
      logo: { '@type': 'ImageObject', url: 'https://bappacards.com/logo.png' },
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Post header */}
      <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: '#000', color: '#fff' }}>
        <Container maxWidth="md">
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: 32, fontSize: '0.875rem' }}>
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            All Articles
          </Link>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ backgroundColor: 'rgba(235,28,36,0.2)', color: '#EB1C24' }}
              />
            ))}
          </Box>

          <Typography component="h1" variant="h1" sx={{ color: '#fff', mb: 3, fontFamily: "'Poppins', serif" }}>
            {post.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#EB1C24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                  {post.author[0]}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                  {post.author}
                </Typography>
                {post.authorRole && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                    {post.authorRole}
                  </Typography>
                )}
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              {post.date}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
              {post.readTime}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Article body */}
      <Box component="article" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Box sx={{ typography: 'body1' }}>
            {renderMarkdown(post.content)}
          </Box>

          <Divider sx={{ my: 6 }} />

          {/* CTA at end of article */}
          <Box
            sx={{
              backgroundColor: '#000',
              borderRadius: 3,
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontFamily: "'Poppins', serif", fontWeight: 700 }}>
              Ready to Try BappaCards?
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4 }}>
              Create your digital business card in minutes. Free to start.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="https://bappacards.com/signup"
              sx={{
                backgroundColor: '#EB1C24',
                '&:hover': { backgroundColor: '#D71920' },
                px: 5,
                py: 1.5,
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
