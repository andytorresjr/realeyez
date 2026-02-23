import test from 'node:test';
import assert from 'node:assert/strict';
import { rankForYouFeed } from '../src/feedRanker.js';

const now = Date.now();

const posts = [
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

const viewer = {
  viewerId: 'viewer-1',
  followedAuthorIds: new Set(['author-b']),
  likedHashtags: new Set(['art']),
  blockedAuthorIds: new Set(),
  nowMs: now
};

test('prioritizes followed and relevant fresh content', () => {
  const ranked = rankForYouFeed(posts, viewer);
  assert.equal(ranked[0].post.id, 'fresh-followed');
});

test('filters blocked authors', () => {
  const ranked = rankForYouFeed(posts, {
    ...viewer,
    blockedAuthorIds: new Set(['author-b'])
  });
  assert.equal(ranked.some((item) => item.post.authorId === 'author-b'), false);
});
