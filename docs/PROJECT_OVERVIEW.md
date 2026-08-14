# FixMate project overview

FixMate is a Firebase-backed Expo/React Native marketplace for local service jobs. Customers request quotes, providers review the job details and send a quote, customers accept or decline, and the job moves through arrival, start, completion proof, payment status, review, messaging and support flows.

## Current platform

- App framework: Expo / React Native
- Package name: `com.promiseedge.fixmate.app`
- Firebase project: `promiseedge-fixmate`
- Authentication: Firebase Auth Email/Password and Google sign-in
- Database: Cloud Firestore
- Storage: Firebase Storage rules are present; console storage initialization is still required before real uploads are used
- Roles: customer, provider, administrator, system-admin

## Main files

```text
App.tsx                         Main UI and role-based screens
src/context/AppContext.tsx      App state, business flow logic, Firebase persistence calls
src/services/firebase.ts        Firebase app/auth/firestore/storage repository boundary
src/services/location.ts        Location helpers
src/types.ts                    Domain types
firestore.rules                 Firestore access rules
storage.rules                   Storage access rules
firebase.json                   Firebase rule deployment config
app.json                        Expo app config and package identifiers
```

## Main product areas

- Customer home/search
- Provider directory
- Quote request with customer notes and optional photo references
- Provider job board
- Provider quote submission
- Customer quote approval/decline
- Provider arrival verification
- Customer provider tracking
- Completion proof submission
- Messaging and alerts
- Reviews and complaints
- Provider/service administration
