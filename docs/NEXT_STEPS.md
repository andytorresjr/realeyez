# Fixing Failed Tests + Next Steps

## Why tests failed in the previous PR
The prior setup depended on `@typescript-eslint/*` packages during `npm install`. In restricted environments, those packages can be blocked, causing install failure before tests run.

## What changed to fix this
- Replaced dependency-heavy lint/test setup with Node built-in checks for core logic.
- Scoped CI to run dependency-free core lint + tests first so failures are actionable even in restricted environments.
- Kept mobile scaffold intact while decoupling core test validation from Expo package installation.

## Commands to run now
```bash
npm run lint
npm run test
```

## If install still fails
1. Verify npm registry:
   ```bash
   npm config get registry
   ```
   Should be `https://registry.npmjs.org/`.
2. Retry without proxy overrides:
   ```bash
   npm config delete proxy
   npm config delete https-proxy
   npm install --workspace @realeyez/core --include-workspace-root
   ```
3. In corporate environments, ask for allowlisting: `expo`, `react`, and `react-native` for mobile setup.

## What next from here (execution order)
1. **Auth integration**
   - Wire Supabase client in mobile app.
   - Implement email and phone OTP login forms.
2. **DB schema + RLS**
   - Add SQL migrations for profiles/posts/follows/likes/comments/blocks/reports/capture sessions.
3. **Capture MVP**
   - Add in-app camera recording and multi-clip pause/resume.
   - Ensure no gallery/file upload entry points exist.
4. **Publish pipeline**
   - Persist capture session metadata and enforce provenance payload checks server-side.
5. **Feed integration**
   - Connect `rankForYouFeed` logic to candidate retrieval and render ranked For You feed.
6. **Moderation**
   - Report + block actions with immediate client filtering and server enforcement.

## Definition of done for next PR
- Can sign in by email or phone OTP.
- Can create/update profile.
- CI lint + tests green.
