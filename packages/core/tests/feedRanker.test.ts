import { describe, expect, it } from 'vitest';
import { rankForYouFeed } from '../src/feedRanker';
import { CandidatePost, ViewerSignals } from '../src/types';

const now = Date.now();

const posts: CandidatePost[] = [
  {
    id: 'old-unfollowed',
    authorId: 'author-a',
    createdAtMs: now - 1000 * 60 * 60 * 48,
    hashtags: ['news'],
    likeCount: 40,
    commentCount: 12,
    avgWatchRatio: 0.7,
    provenanceConfidence: 0.9
  },
  {
    id: 'fresh-followed',
    authorId: 'author-b',
    createdAtMs: now - 1000 * 60 * 15,
    hashtags: ['art'],
    likeCount: 20,
    commentCount: 5,
    avgWatchRatio: 0.8,
    provenanceConfidence: 0.95
  }
];

const viewer: ViewerSignals = {
  viewerId: 'viewer-1',
  followedAuthorIds: new Set(['author-b']),
  likedHashtags: new Set(['art']),
  blockedAuthorIds: new Set(),
  nowMs: now
};

describe('rankForYouFeed', () => {
  it('prioritizes followed and relevant fresh content', () => {
    const ranked = rankForYouFeed(posts, viewer);
    expect(ranked[0].post.id).toBe('fresh-followed');
  });

  it('filters blocked authors', () => {
    const ranked = rankForYouFeed(posts, {
      ...viewer,
      blockedAuthorIds: new Set(['author-b'])
    });
    expect(ranked.some((item) => item.post.authorId === 'author-b')).toBe(false);
  });
});
