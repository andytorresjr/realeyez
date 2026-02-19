# Security and Abuse Prevention (MVP)

## Auth
- Supabase Auth with:
  - Email magic link / passwordless flow
  - Phone OTP flow
- Session tokens stored with secure storage on device.

## Authorization
- Postgres Row Level Security on all user-owned tables.
- Block relationships enforced in feed/query layer.
- Reported/hidden content filtered server-side.

## Capture-only enforcement
### Stage 1 (MVP soft enforcement)
- Only in-app camera UI exposes publish path.
- Upload endpoint requires capture-session token metadata.
- Edge function checks token validity and schema.

### Stage 2
- Add watermark and signed provenance per media artifact.
- Verification in ingest pipeline.

### Stage 3
- Device attestation (e.g., Play Integrity / DeviceCheck) where feasible.

## Moderation policy
Disallow:
- Nudity
- Violence
- Harassment

Controls:
- Report user/content endpoint.
- User blocking.
- Temporary auto-hide when report threshold is met.
- Basic strike tracking for repeat violations.

## Abuse prevention
- OTP retry rate limits.
- Interaction rate limits (likes/comments/follows).
- Upload frequency controls for new accounts.
- Audit trails for moderation actions.
