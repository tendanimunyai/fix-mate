# Firebase setup

## Project

```text
Project ID: promiseedge-fixmate
Android app ID: 1:1052565499724:android:17f14a37ec1eca63f529e9
Web app ID: 1:1052565499724:web:4daf6c87d255cc20f529e9
Android package: com.promiseedge.fixmate.app
Firestore database: (default), FIRESTORE_NATIVE, nam5
```

## Enabled services

- Firebase Auth Email/Password: enabled
- Firebase Auth Google provider: enabled
- Cloud Firestore: enabled
- Firebase Storage: rules exist locally; initialize Storage in the Console before deploying or using real uploads

## Firebase files

```text
.firebaserc       Active Firebase project alias
firebase.json     Firestore and Storage rule deployment config
firestore.rules   Firestore access rules
storage.rules     Storage access rules
.env              Local Firebase web config, ignored by git
.env.example      Environment variable template
google-services.json  Android Firebase config, ignored by git
```

## Google sign-in

Google sign-in is enabled in Firebase Authentication.

Local OAuth environment variables:

```text
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
```

Current Android debug SHA-1 registered against the Firebase Android app:

```text
5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
```

Current Android OAuth client ID:

```text
1052565499724-70027nmjm0vq3odikbfaubcq1gmjafh7.apps.googleusercontent.com
```

Current web OAuth client ID:

```text
1052565499724-8oajpims8cq6g05qa9rs62l1qva62dac.apps.googleusercontent.com
```

For release builds, register the release keystore SHA-1/SHA-256 in Firebase and add the release Android OAuth client ID to the production environment.

## Collections

```text
profiles
providers
services
requests
messages
alerts
reviews
complaints
providerStatuses
availability
```

## Role source

The app reads the role from:

```text
profiles/{firebaseAuthUid}.role
```

Valid values:

```text
customer
provider
administrator
system-admin
```

If a signed-in Firebase user has no profile document, including Google users, the app creates a customer profile automatically.

## Deployed starter data

Development users exist in Firebase Authentication and corresponding Firestore profiles.

Seeded Firestore records:

- `services/plumbing`
- `services/electrical`
- `services/handyman`
- `providers/provider@fixmate.app`
- `providerStatuses/provider@fixmate.app`
- `availability/provider@fixmate.app`

## Rule notes

Current Firestore rules allow signed-in users to read shared operational collections because the app currently loads full collections client-side. Before production, tighten reads with query-scoped ownership rules and update the app to query only relevant documents per user.
