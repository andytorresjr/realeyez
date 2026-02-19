# Engineering Plan

## Milestone 1: Project foundation
### Tasks
- Setup workspace, linting, formatting, tests.
- Scaffold Expo mobile app structure.
- Implement shared core package for ranking + provenance validation.

### Acceptance tests
- `npm run lint`
- `npm run test`
- `npm run mobile` opens starter shell.

### Definition of done
- CI validates lint + tests.
- Docs for setup and architecture are complete.

## Milestone 2: Auth + profile
### Tasks
- Supabase client wiring.
- Email and phone auth screens.
- Profile fetch/update flow.

### Acceptance tests
- Sign in/out works for email + phone.
- Profile updates persist.

### Definition of done
- No unauthenticated access to post/create routes.

## Milestone 3: Capture + editor MVP
### Tasks
- Camera recording session manager.
- Pause/resume multi-clip capture.
- Clip delete and reorder.

### Acceptance tests
- User can create a draft of multiple clips and publish.
- Upload rejects requests with missing capture metadata.

### Definition of done
- Published post references capture session token.

## Milestone 4: Feed + social
### Tasks
- Candidate retrieval query.
- Ranking formula integration.
- Like/comment/follow APIs.

### Acceptance tests
- Ranked feed differs from reverse chronology for mixed data.
- Followed creators receive score boost.

### Definition of done
- Core ranking logic covered by unit tests.

## Milestone 5: Moderation and blocking
### Tasks
- Report and block endpoints.
- Client hide logic + backend filtering.
- Basic moderation queue records.

### Acceptance tests
- Blocked user posts never appear.
- Reports create enforceable moderation records.

### Definition of done
- Policy categories mapped to report reasons.

## Risks and mitigations
- **Video editing complexity:** start with pause/resume and clip delete before trim; defer advanced effects.
- **Storage cost growth:** cap max upload length and transcode aggressively.
- **Abuse/moderation load:** auto-hide thresholds + admin queue from day one.
- **Feed quality cold start:** blend trending + recency and add explicit interests onboarding later.
