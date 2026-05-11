'use client';

import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import type { BlogPost } from '@/data/blogData';

interface BlogGridProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogGrid({ posts, allTags }: BlogGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  return (
    <>
      {/* Category filter */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 5 }}>
        <Button
          size="small"
          variant={activeTag === null ? 'contained' : 'outlined'}
          onClick={() => setActiveTag(null)}
          sx={{
            borderRadius: 5,
            textTransform: 'none',
            ...(activeTag === null
              ? { backgroundColor: '#EB1C24', '&:hover': { backgroundColor: '#D71920' } }
              : { borderColor: 'rgba(0,0,0,0.2)', color: 'text.secondary' }),
          }}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            size="small"
            variant={activeTag === tag ? 'contained' : 'outlined'}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            sx={{
              borderRadius: 5,
              textTransform: 'none',
              ...(activeTag === tag
                ? { backgroundColor: '#EB1C24', '&:hover': { backgroundColor: '#D71920' } }
                : { borderColor: 'rgba(0,0,0,0.2)', color: 'text.secondary' }),
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4}>
        {filtered.map((post) => (
          <Grid key={post.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link href={`/blog/${post.slug}`} style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}>
              <Card elevation={0}
                sx={{ height: '100%', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 3,
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  '&:hover': { boxShadow: '0 8px 32px rgba(0,0,0,0.12)', transform: 'translateY(-2px)' },
                  cursor: 'pointer' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {post.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} size="small"
                        sx={{ fontSize: '0.7rem', backgroundColor: 'rgba(235,28,36,0.08)', color: '#EB1C24' }} />
                    ))}
                  </Box>
                  <Typography variant="h6" component="h2"
                    sx={{ fontFamily: "'Poppins', serif", fontWeight: 600, lineHeight: 1.4 }}>
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

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">No posts found for this category.</Typography>
        </Box>
      )}
    </>
  );
}
