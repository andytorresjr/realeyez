# ADR-0001: Mobile + Backend stack selection

- Status: Accepted
- Date: 2026-02-19

## Context
Need a locally runnable phone MVP in 2–3 weeks, with long-term cross-platform viability and low ops burden.

## Decision
- **Mobile:** React Native + Expo (TypeScript)
- **Backend:** Supabase (Postgres/Auth/Storage/Edge Functions)

## Rationale
### Expo
- Fastest onboarding and debugging for one developer.
- Can ship iOS + Android from one codebase.
- Supports gradual move to native modules when capture/authenticity requirements deepen.

### Supabase
- Built-in auth methods for email and phone OTP.
- SQL + RLS enable clear policy enforcement and secure multi-tenant data access.
- Storage and edge functions reduce infrastructure setup.

## Consequences
### Positive
- MVP speed, less DevOps overhead.
- Strong typed contracts from DB schema to app.
- Easy to iterate ranking logic in SQL + edge functions.

### Tradeoffs
- Some advanced media workflows may require custom native modules.
- Moderation at scale will eventually need dedicated review tooling.

## Alternatives considered
1. Native iOS first (SwiftUI + Firebase)
   - Faster for one platform only; delays Android.
2. Flutter + custom backend
   - Good performance, but larger setup and backend ops overhead for MVP window.
