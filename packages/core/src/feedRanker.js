const HOUR_MS = 1000 * 60 * 60;

function recencyScore(createdAtMs, nowMs) {
  const ageHours = Math.max((nowMs - createdAtMs) / HOUR_MS, 0);
  return Math.exp(-ageHours / 24);
}

function interestScore(hashtags, likedHashtags) {
  if (hashtags.length === 0) {
    return 0.2;
  }
  const overlap = hashtags.filter((tag) => likedHashtags.has(tag)).length;
  return overlap / hashtags.length;
}

function engagementScore(likes, comments, watchRatio) {
  const interaction = Math.min((likes * 0.6 + comments * 1.2) / 100, 1);
  return Math.min((interaction + watchRatio) / 2, 1);
}

export function rankForYouFeed(posts, viewer) {
  return posts
    .filter((post) => !viewer.blockedAuthorIds.has(post.authorId))
    .map((post) => {
      const interest = interestScore(post.hashtags, viewer.likedHashtags);
      const social = viewer.followedAuthorIds.has(post.authorId) ? 1 : 0;
      const engagement = engagementScore(post.likeCount, post.commentCount, post.avgWatchRatio);
      const recency = recencyScore(post.createdAtMs, viewer.nowMs);
      const quality = post.provenanceConfidence * 0.5 + post.avgWatchRatio * 0.5;

      const score =
        0.35 * interest +
        0.2 * social +
        0.15 * engagement +
        0.2 * recency +
        0.1 * quality;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);
}
