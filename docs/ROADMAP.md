# 2–3 Week Roadmap

## Week 1 — Foundations
### Milestones
- Expo app shell running on physical phone
- Supabase project wired (auth + schema)
- Profile + auth screens

### Acceptance criteria
- Can sign in using email and phone OTP.
- Profile row auto-created on first sign-in.
- CI lint/tests pass on PR.

## Week 2 — Core creation + social graph
### Milestones
- In-app camera record flow (pause/resume)
- Multi-clip draft handling (delete + reorder)
- Post publishing for video + text
- Follow/like/comment basic interactions

### Acceptance criteria
- User can record clips in-app and publish.
- No upload-from-gallery path exists.
- Likes/comments/follows persist and appear in UI.

## Week 3 — Feed quality + trust/safety
### Milestones
- For You ranking service integrated
- Report + block UX and backend actions
- Provenance metadata persisted and validated

### Acceptance criteria
- Feed ranks beyond strict chronology.
- Blocked users no longer appear in feed.
- Report action creates moderation event.
- Each video post has provenance metadata row.
