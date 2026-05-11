import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { blogPosts } from '@/data/blogData';
import MarkdownRenderer, { extractHeadings } from '@/components/blog/MarkdownRenderer';
import ShareButtons from '@/components/blog/ShareButtons';

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

function getRelatedPosts(currentSlug: string, tags: string[]) {
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || 0)
    .slice(0, 3)
    .map(({ post }) => post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(post.slug, post.tags);
  const canonicalUrl = `https://bappacards.com/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: { '@type': 'Person', name: post.author, jobTitle: post.authorRole },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'BappaCards',
      logo: { '@type': 'ImageObject', url: 'https://bappacards.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    url: canonicalUrl,
    keywords: post.tags.join(', '),
  };

  const jsonLdString = JSON.stringify(jsonLd).replace(/<\/script>/gi, '<\\/script>');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* Hero / post header */}
      <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: '#fff', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs
            sx={{ mb: 3, '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.5)' } }}
          >
            <MuiLink component={Link} href="/" underline="hover"
              sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              Home
            </MuiLink>
            <MuiLink component={Link} href="/blog" underline="hover"
              sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
              Blog
            </MuiLink>
            <Typography sx={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.875rem' }}>
              {post.title.length > 50 ? post.title.substring(0, 50) + '…' : post.title}
            </Typography>
          </Breadcrumbs>

          <Stack direction="row" spacing={1} sx={{ mb: 2, gap: 1, flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }} />
            ))}
          </Stack>

          <Typography component="h1" variant="h3"
            sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 3, lineHeight: 1.2 }}>
            {post.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#EB1C24',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{post.date}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{post.readTime}</Typography>
          </Box>
        </Container>
      </Box>

      {/* Article body + sidebar */}
      <Box component="article" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: { xs: 0, md: 5 }, alignItems: 'flex-start' }}>
            {/* Table of Contents — desktop sidebar */}
            {headings.length > 0 && (
              <Box
                component="aside"
                sx={{ display: { xs: 'none', md: 'block' }, width: 240, flexShrink: 0, position: 'sticky', top: 96 }}
              >
                <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3, p: 2.5 }}>
                  <Typography variant="caption"
                    sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'text.secondary', display: 'block', mb: 1.5 }}>
                    In this article
                  </Typography>
                  <Stack spacing={0.5}>
                    {headings.map((h) => (
                      <MuiLink key={h.id} href={`#${h.id}`} underline="none"
                        sx={{ fontSize: '0.85rem', color: 'text.secondary', py: 0.5, display: 'block', lineHeight: 1.4,
                          transition: 'color 0.2s', '&:hover': { color: '#EB1C24' } }}>
                        {h.text}
                      </MuiLink>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            )}

            {/* Main content */}
            <Box sx={{ flex: 1, minWidth: 0, maxWidth: 780 }}>
              <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3, p: { xs: 2.5, md: 4.5 } }}>
                <ShareButtons url={canonicalUrl} title={post.title} />
                <MarkdownRenderer content={post.content} />

                {/* Author bio */}
                <Box sx={{ mt: 5, pt: 4, borderTop: '2px solid #f0f0f0' }}>
                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start', p: 3, bgcolor: '#f9f9fb', borderRadius: 3 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#EB1C24', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography sx={{ color: '#fff', fontWeight: 700 }}>{post.author[0]}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{post.author}</Typography>
                      {post.authorRole && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{post.authorRole}</Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <Box sx={{ mt: 5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a2e' }}>
                    Related Articles
                  </Typography>
                  <Grid container spacing={2}>
                    {relatedPosts.map((rp) => (
                      <Grid key={rp.slug} size={{ xs: 12, sm: 4 }}>
                        <Paper elevation={0} component={Link} href={`/blog/${rp.slug}`}
                          sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2.5, display: 'block',
                            textDecoration: 'none', color: 'inherit', transition: 'all 0.2s',
                            '&:hover': { borderColor: '#EB1C24', transform: 'translateY(-2px)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' } }}>
                          <Stack direction="row" sx={{ mb: 1.5, gap: 0.5, flexWrap: 'wrap' }}>
                            {rp.tags.slice(0, 2).map((tag) => (
                              <Chip key={tag} label={tag} size="small"
                                sx={{ fontSize: '0.65rem', fontWeight: 600, bgcolor: '#fef2f2', color: '#EB1C24', height: 20 }} />
                            ))}
                          </Stack>
                          <Typography variant="subtitle2"
                            sx={{ fontWeight: 700, lineHeight: 1.4, mb: 1, color: '#1a1a2e' }}>
                            {rp.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{rp.readTime}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              <Box sx={{ mt: 4 }}>
                <MuiLink component={Link} href="/blog" underline="none"
                  sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color: '#EB1C24', fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' } }}>
                  <ArrowBackIcon fontSize="small" />
                  Back to all articles
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ backgroundColor: '#000', color: '#fff', py: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontFamily: "'Poppins', serif", fontWeight: 700 }}>
            Ready to Try BappaCards?
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4 }}>
            Create your digital business card in minutes. Free to start.
          </Typography>
          <Button variant="contained" size="large" href="https://bappacards.com/sign-up"
            sx={{ backgroundColor: '#EB1C24', '&:hover': { backgroundColor: '#D71920' }, px: 5, py: 1.5 }}>
            Get Started Free
          </Button>
        </Container>
      </Box>
    </>
  );
}
