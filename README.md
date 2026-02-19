# Realeyez

Realeyez is a social media app focused on authenticity and creativity.

## Product principle (non-negotiable)
**All media must be created in-app.**
No uploads from camera roll or files are allowed.

## Recommended stack (2–3 week MVP + future scale)
- **Client:** React Native with Expo
  - Fastest debug loop for local phone testing.
  - Single codebase for iOS + Android.
  - Path to custom native modules later (Expo prebuild / config plugins).
- **Backend:** Supabase
  - PostgreSQL + Row Level Security (RLS).
  - Auth supports phone OTP and email.
  - Storage + edge functions for moderation/provenance checks.
  - Lower ops overhead than custom backend.

## Repository structure
```text
.
├── apps/
│   └── mobile/                 # Expo mobile app scaffold
├── docs/
│   ├── ADR-0001-stack.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── SECURITY.md
│   └── ENGINEERING_PLAN.md
├── packages/
│   └── core/                   # Shared domain logic + tests (dependency-light Node tests)
├── .github/
│   ├── workflows/ci.yml
│   ├── pull_request_template.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   └── feature_request.yml
│   └── CODEOWNERS
├── package.json
└── .github/workflows/ci.yml
```

## Getting started

### Prerequisites
- Node.js 20+
- npm 10+
- Expo Go (or Expo dev client) on your phone

### Install
```bash
# Optional for mobile app dependencies (Expo)
npm install
```

### Run tests + lint
```bash
npm run lint
npm run test
```

### Run mobile app
```bash
npm run mobile
```
Then scan the QR code in Expo Go.

## MVP features in this scaffold
- Auth shell (email + phone UX placeholders tied to Supabase service abstraction)
- Profile model scaffold
- Capture-only pipeline interfaces
- For You ranking engine (MVP heuristic) with tests runnable via Node's built-in test runner
- Moderation service contracts (report/block)
- CI for lint + tests (core package path)

## Local environment
Create `.env` files from examples:
- `apps/mobile/.env.example`

Key vars:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## How to test core ranking logic
```bash
npm run test
```

## Next implementation priorities
See:
- `docs/ROADMAP.md`
- `docs/ENGINEERING_PLAN.md`
- `docs/NEXT_STEPS.md`
