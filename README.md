# FixMate

FixMate is an Expo/React Native marketplace for finding trusted local service professionals, backed by Firebase Auth and Firestore.

## Included MVP flows

- Browse and search local services and providers
- View provider profiles, ratings, verification and starting prices
- Favourite providers
- Request a booking with a preferred day
- Track booking status and accept jobs in provider mode
- Message preview and account/profile settings
- Persist booking, messaging, provider, service and profile state in Firestore
- Role modes: customer, service provider, administrator, and system administrator
- Provider approval workflow and administrator marketplace console
- Booking moderation, provider suspension, and review activity visibility
- Firebase Authentication sign-in
- Firestore profile-based role loading

## Architecture

The project follows the InvoiceGenPro pattern: a thin `App.tsx` shell, a top-level context for session and domain state, modular types/services under `src/`, and Firebase repositories for production persistence.

```text
App.tsx
src/
  context/AppContext.tsx  # session role, requests, favourites
  services/firebase.ts    # Firebase Auth, Firestore and Storage boundary
  types.ts                # shared domain types
```

## Run

```bash
npm install
npm start
```

The current build expects Firebase config in `.env` and starts from live Firestore collections. There is no bundled mock seed data.

Common commands:

```bash
npm run web
npm run android
npm run typecheck
firebase deploy --only firestore:rules --project promiseedge-fixmate
```

## Development login

Firebase Auth Email/Password and Google sign-in are enabled for the FixMate Firebase project.

Development accounts:

```text
customer@fixmate.app      customer
provider@fixmate.app      provider
admin@fixmate.app         administrator
system@fixmate.app        system-admin
```

Temporary development password for all accounts:

```text
FixMate2026!
```

These accounts are for development/testing only. Change or remove the shared password before production.

Google sign-in is also available. A new Google user signs in as `customer` by default until `profiles/{uid}.role` is updated in Firestore.

Seeded live Firestore records:

- Services: Plumbing, Electrical, Handyman
- Approved online provider: `provider@fixmate.app`

## Firebase setup

Firebase SDK support is wired in `src/services/firebase.ts`. If Firebase config is missing, sign-in is disabled.

Firebase project created for this workspace:

```text
Project ID: promiseedge-fixmate
Android app ID: 1:1052565499724:android:17f14a37ec1eca63f529e9
Web app ID: 1:1052565499724:web:4daf6c87d255cc20f529e9
Firestore database: (default), FIRESTORE_NATIVE, nam5
```

1. Copy the config values into `.env` using `.env.example` as the template.
2. The Android Firebase app uses this package name:

```text
com.promiseedge.fixmate.app
```

3. `google-services.json` should be placed in the project root. It is ignored by git and referenced by `app.json`.
4. Firestore is created and rules have been deployed.
5. Enable Firebase Auth Email/Password and Google sign-in in the console:

```text
https://console.firebase.google.com/project/promiseedge-fixmate/authentication
```

6. Enable Firebase Storage in the console before using real photo uploads:

```text
https://console.firebase.google.com/project/promiseedge-fixmate/storage
```

7. Deploy rules after selecting your project:

```bash
firebase use <project-id>
firebase deploy --only firestore:rules,storage
```

Google OAuth client IDs are configured through:

```text
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
```

The Android debug SHA-1 registered in Firebase is:

```text
5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
```

Configured collections:

- `requests`
- `messages`
- `alerts`
- `complaints`
- `providers`
- `services`
- `reviews`
- `profiles`
- `providerStatuses`
- `availability`

### User accounts and roles

Create users in Firebase Authentication. User role is read from `profiles/{uid}.role`.

If a Firebase user signs in without a profile document, the app creates a customer profile automatically. Change the profile role in Firestore to grant `provider`, `administrator`, or `system-admin` access.

## Project documentation

- [Project overview](docs/PROJECT_OVERVIEW.md)
- [Development guide](docs/DEVELOPMENT.md)
- [Firebase setup](docs/FIREBASE.md)
- [User roles and login](docs/USER_ROLES_AND_LOGIN.md)
- [Booking, quote, tracking and completion flow](docs/BOOKING_FLOW.md)
- [Data model](docs/DATA_MODEL.md)
- [Outstanding production work](docs/PRODUCTION_READINESS.md)
