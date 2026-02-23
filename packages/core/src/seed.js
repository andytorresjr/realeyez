export const sampleCandidatePosts = [
  {
    id: 'p1',
    authorId: 'u1',
    createdAtMs: Date.now() - 1000 * 60 * 30,
    hashtags: ['art', 'daily'],
    likeCount: 55,
    commentCount: 12,
    avgWatchRatio: 0.72,
    provenanceConfidence: 0.9
  },
  {
    id: 'p2',
    authorId: 'u2',
    createdAtMs: Date.now() - 1000 * 60 * 10,
    hashtags: ['music', 'jam'],
    likeCount: 12,
    commentCount: 1,
    avgWatchRatio: 0.43,
    provenanceConfidence: 0.86
  }
];
