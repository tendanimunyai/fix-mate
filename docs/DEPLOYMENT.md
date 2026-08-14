# Expo deployment

The app is linked to Expo/EAS as:

```text
Expo account: invoice-gen-account
Expo project: @invoice-gen-account/one-day-local-services
EAS project ID: df08aff9-2123-4c57-87fc-43cc7af628b0
Android package: com.promiseedge.fixmate.app
iOS bundle ID: com.promiseedge.fixmate.app
```

## Build profiles

Profiles are configured in `eas.json`.

```bash
npm run build:android:preview
npm run build:android:production
```

- `preview` creates an internal Android APK for device testing.
- `production` creates an Android App Bundle (`.aab`) for Google Play.

## Submit

```bash
npm run submit:android:production
```

Submission requires Google Play Console service account setup in EAS.

## Required secrets and files

Local development uses `.env`, but CI/EAS builds should use EAS environment variables for:

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

Non-empty values from the local `.env` were uploaded to EAS `development`, `preview`, and `production` environments on 2026-08-15.

The Android Firebase config file is expected at:

```text
google-services.json
```

This file is intentionally ignored by git, but `.easignore` does not exclude it so EAS can include the local file in the build upload archive. Confirm the file exists before starting Android builds.

## Pre-build checks

Run these before starting a release build:

```bash
npm run typecheck
npm run doctor
npx expo config --type public
```

Current Expo Doctor notes:

- The repo contains a checked-in native Android folder. EAS Build will use native Android files and will not automatically sync every `app.json` field. Keep native Android files aligned with `app.json`, or remove/regenerate native folders with Expo Prebuild before committing to a fully managed workflow.
- Local `node_modules` currently reports duplicate `expo-constants` copies with the same version under transitive Expo packages. If this blocks a native build, do a clean dependency reinstall from a fresh checkout before changing package versions.

## Native Android status

The native Android project has already been aligned with the current brand/package:

```text
App label: One-day local services
Gradle project name: OneDayLocalServices
Application ID: com.promiseedge.fixmate.app
Location permissions: coarse/fine location
```

## Production release checklist

- Replace temporary shared development passwords.
- Configure EAS environment variables.
- Configure Android signing credentials in EAS.
- Confirm Google Play package name before first release.
- Complete formal trademark/domain/app-store clearance for `One-day local services`.
- Initialize Firebase Storage before real photo uploads.
- Register release SHA fingerprints for Firebase Google sign-in after EAS creates signing credentials.
