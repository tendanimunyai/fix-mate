# Development guide

## Prerequisites

- Node.js compatible with Expo 54
- npm
- Firebase CLI authenticated to the project owner account
- Expo development environment
- Android emulator or physical device for Android testing

## Install

```bash
npm install
```

## Environment

Create `.env` from `.env.example` and provide the Firebase web app config.

Required variables:

```text
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
```

Android also requires `google-services.json` in the project root. It is intentionally ignored by git.

Google sign-in also requires the platform OAuth client ID for the target platform. Android debug builds use the debug SHA-1 registered in Firebase. Production/release builds need the release keystore SHA registered and a matching OAuth client ID in the environment.

## Commands

```bash
npm start
npm run web
npm run android
npm run ios
npm run typecheck
```

## Firebase rule deployment

```bash
firebase use promiseedge-fixmate
firebase deploy --only firestore:rules --project promiseedge-fixmate
firebase deploy --only storage --project promiseedge-fixmate
```

Storage deployment requires Firebase Storage to be initialized in the Firebase Console first.

## Validation checklist

Before handing off a change:

```bash
npm run typecheck
```

For Firebase-affecting changes:

```bash
firebase deploy --only firestore:rules --project promiseedge-fixmate
```

For Android package changes:

```bash
npm run android
```

For Google login changes:

```bash
npm run typecheck
npm run android
```
