# FixMate

FixMate is an offline-first Expo/React Native marketplace for finding trusted local service professionals.

## Included MVP flows

- Browse and search local services and providers
- View provider profiles, ratings, verification and starting prices
- Favourite providers
- Request a booking with a preferred day
- Track booking status and accept jobs in provider mode
- Message preview and account/profile settings
- Persist booking requests locally with AsyncStorage
- Three role modes: customer, service provider, and administrator
- Provider approval workflow and administrator marketplace console
- Booking moderation, provider suspension, and review activity visibility
- Persistent profile, messaging, review and provider-status state

## Architecture

The project follows the InvoiceGenPro pattern: a thin `App.tsx` shell, a top-level context for session and domain state, modular data/types/services under `src/`, and a persistence boundary that can be replaced with Firebase/Firestore later.

```text
App.tsx
src/
  context/AppContext.tsx  # session role, requests, favourites
  data/mockData.ts        # local seed data
  services/storage.ts     # persistence boundary
  types.ts                # shared domain types
```

## Run

```bash
npm install
npm start
```

The current build is intentionally local-first. The next production seam is replacing `src/services/storage.ts` with authenticated Firestore repositories and adding provider onboarding, payments, push notifications, and location services.
