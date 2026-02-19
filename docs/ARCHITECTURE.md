# Architecture

## 1. High-level
Realeyez uses an Expo mobile client and Supabase backend.

```text
Mobile App (Expo)
  ├─ Auth flows (email + phone)
  ├─ Capture session manager (camera only)
  ├─ Editor (multi-clip timeline)
  ├─ Feed + engagement UI
  └─ Moderation/reporting UI
          |
          v
Supabase
  ├─ Auth (email, phone OTP)
  ├─ Postgres (profiles, posts, edges, interactions, moderation)
  ├─ Storage (captured media)
  ├─ Edge Functions (provenance checks, moderation automation)
  └─ Realtime (comments, counters)
```

## 2. Data model (MVP)
- `profiles`: `id`, `username`, `display_name`, `bio`, `avatar_url`, timestamps
- `posts`: `id`, `author_id`, `type(video|text)`, `caption`, `media_url`, `duration_ms`, `created_at`
- `post_hashtags`: `post_id`, `hashtag`
- `follows`: `follower_id`, `followed_id`, `created_at`
- `likes`: `user_id`, `post_id`, `created_at`
- `comments`: `id`, `user_id`, `post_id`, `body`, `created_at`
- `watch_events`: `user_id`, `post_id`, `watch_ms`, `completed`, `created_at`
- `blocks`: `blocker_id`, `blocked_id`, `created_at`
- `reports`: `id`, `reporter_id`, `target_type`, `target_id`, `reason`, `status`, `created_at`
- `capture_sessions`: `id`, `user_id`, `device_id_hash`, `started_at`, `ended_at`, `signature`
- `media_provenance`: `post_id`, `capture_session_id`, `pipeline_version`, `confidence`

## 3. Capture-only flow
1. User taps record in app camera.
2. App creates `capture_session` token request.
3. Camera output stored to temporary sandbox file.
4. App editor composes clips (pause/resume + delete + reorder).
5. Upload is only accepted when metadata includes capture session token.
6. Backend edge function validates token + metadata shape.
7. Post is published with provenance row.

## 4. For You feed (MVP)
Scoring function per candidate post:

`score = 0.35*interest + 0.20*social + 0.15*engagement + 0.20*recency + 0.10*quality - penalties`

Where:
- `interest`: hashtag overlap + prior interactions with similar posts
- `social`: author followed bonus
- `engagement`: global likes/comments/watch completion normalized
- `recency`: exponential decay by age
- `quality`: provenance confidence + completion ratio
- `penalties`: blocked/report-threshold/de-duplication

Cold start:
- 60% trending (engagement velocity)
- 40% fresh local recency

## 5. Moderation pipeline (MVP)
- Client-side report UI with mandatory reason.
- Immediate local hide on block/report action.
- Server auto-actions:
  - Hide content after report threshold until review.
  - Rate-limit repeat offenders.
- Manual review queue table for admin tooling (future web dashboard).

## 6. Extensibility for stronger authenticity
- Stage 1: metadata + capture-token enforcement.
- Stage 2: media watermark + signed provenance tokens.
- Stage 3: device attestation integration.

No schema rewrites needed; each stage enriches `capture_sessions` and `media_provenance`.
