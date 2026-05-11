import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

const BRAND_RED = '#EB1C24';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/);

    let firstIndex = remaining.length;
    let matchType: string | null = null;
    let firstMatch: RegExpMatchArray | null = null;

    if (linkMatch && linkMatch.index! < firstIndex) {
      firstMatch = linkMatch;
      firstIndex = linkMatch.index!;
      matchType = 'link';
    }
    if (boldMatch && boldMatch.index! < firstIndex) {
      firstMatch = boldMatch;
      firstIndex = boldMatch.index!;
      matchType = 'bold';
    }
    if (italicMatch && italicMatch.index! < firstIndex) {
      firstMatch = italicMatch;
      firstIndex = italicMatch.index!;
      matchType = 'italic';
    }

    if (!firstMatch) {
      if (remaining) elements.push(remaining);
      break;
    }

    if (firstIndex > 0) elements.push(remaining.substring(0, firstIndex));

    if (matchType === 'link') {
      const url = firstMatch[2];
      const isInternal = url.startsWith('/') || url.includes('bappacards.com');
      const href = isInternal
        ? url.replace('https://bappacards.com', '').replace('http://bappacards.com', '')
        : url;
      elements.push(
        <MuiLink
          key={`${keyPrefix}-link-${idx}`}
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          sx={{ color: BRAND_RED, fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          {firstMatch[1]}
        </MuiLink>
      );
    } else if (matchType === 'bold') {
      elements.push(<strong key={`${keyPrefix}-bold-${idx}`}>{firstMatch[1]}</strong>);
    } else if (matchType === 'italic') {
      elements.push(<em key={`${keyPrefix}-italic-${idx}`}>{firstMatch[1]}</em>);
    }

    idx++;
    remaining = remaining.substring(firstIndex + firstMatch[0].length);
  }

  return elements;
}

export function extractHeadings(markdown: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  for (const line of markdown.split('\n')) {
    const m = line.match(/^## (.+)$/);
    if (m) headings.push({ text: m[1], id: slugify(m[1]) });
  }
  return headings;
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      elements.push(
        <Typography key={key++} variant="h5" component="h3"
          sx={{ fontWeight: 700, mt: 3, mb: 1.5, color: '#1a1a2e', fontSize: { xs: '1.15rem', md: '1.35rem' } }}>
          {parseInline(h3[1], `h3-${key}`)}
        </Typography>
      );
      i++; continue;
    }

    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      const id = slugify(h2[1]);
      elements.push(
        <Typography key={key++} variant="h4" component="h2" id={id}
          sx={{ fontWeight: 800, mt: 5, mb: 2, color: '#1a1a2e', fontSize: { xs: '1.35rem', md: '1.65rem' }, scrollMarginTop: '100px' }}>
          {parseInline(h2[1], `h2-${key}`)}
        </Typography>
      );
      i++; continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <Box key={key++} component="ol" sx={{ pl: 3, my: 2, '& li': { mb: 1, lineHeight: 1.8, fontSize: '1.05rem', color: '#333' } }}>
          {items.map((item, j) => <li key={j}>{parseInline(item, `ol-${key}-${j}`)}</li>)}
        </Box>
      );
      continue;
    }

    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s/, ''));
        i++;
      }
      elements.push(
        <Box key={key++} component="ul" sx={{ pl: 3, my: 2, '& li': { mb: 1, lineHeight: 1.8, fontSize: '1.05rem', color: '#333' } }}>
          {items.map((item, j) => <li key={j}>{parseInline(item, `ul-${key}-${j}`)}</li>)}
        </Box>
      );
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].match(/^#{1,3}\s/) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <Typography key={key++} variant="body1"
          sx={{ mb: 2, lineHeight: 1.85, fontSize: '1.05rem', color: '#333' }}>
          {parseInline(paragraphLines.join(' '), `p-${key}`)}
        </Typography>
      );
    }
  }

  return <>{elements}</>;
}
