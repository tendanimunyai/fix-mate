# Outstanding production work

This file tracks the main gaps before FixMate should be treated as production-ready.

## Authentication and accounts

- Replace temporary shared development passwords.
- Add password reset and account creation screens.
- Add email verification policy.
- Move role changes to an admin-only backend flow.
- Register release OAuth/SHA credentials for Google sign-in.

## Firestore security

- Replace broad signed-in collection reads with query-scoped rules.
- Query requests/messages/alerts by customerId, providerId, recipientRoles or assigned account.
- Add audit records for admin/system-admin actions.
- Consider custom claims for high-privilege roles.

## Storage and photos

- Initialize Firebase Storage in the Console.
- Wire real image picker/camera uploads.
- Store Firebase Storage download URLs instead of filename placeholders.
- Apply provider/customer ownership checks for upload paths.

## Location and arrival

- Replace simulated arrival checks with provider GPS updates.
- Calculate distance and ETA server-side.
- Add geofence validation before `Arrived`.
- Prevent client-only manipulation of arrival state.

## Payments

- Integrate a real payment processor.
- Authorise payment when customer accepts a quote.
- Capture payment only after completion proof/customer policy.
- Add refunds and cancellation fee settlement.

## Backend enforcement

- Move quote acceptance, payment capture, arrival verification and completion enforcement to trusted server code or Firebase Cloud Functions.
- Add idempotent transaction handling for status changes.

## Notifications

- Add push notifications for quotes, messages, arrival, cancellation and completion.
- Add email/SMS notifications for critical events.

## Observability

- Add crash reporting.
- Add analytics events for quote request, quote approval, cancellation and completion.
- Add admin audit exports.
