# User roles and login

## Development login accounts

All current development accounts use this temporary password:

```text
FixMate2026!
```

Accounts:

```text
customer@fixmate.app      customer
provider@fixmate.app      provider
admin@fixmate.app         administrator
system@fixmate.app        system-admin
```

These are development credentials only. Replace them before production.

## Google sign-in

The login screen supports Google sign-in through Firebase Authentication.

Behavior:

- Existing Google-linked users keep their Firestore profile role.
- New Google users are created by Firebase Auth.
- If the app does not find `profiles/{uid}`, it creates a customer profile automatically.
- Admin/system-admin can later update `profiles/{uid}.role`.

Required environment variables:

```text
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID
```

Android currently uses the debug OAuth client generated from the debug keystore SHA-1. Release builds need their own SHA-1/SHA-256 registered in Firebase.

## Role behavior

### Customer

- Browse services and providers
- Request a quote
- Add job notes and optional photo references
- Accept or decline provider quotes
- Track provider status/distance
- Message provider
- Cancel before restricted lifecycle states
- Review completed work
- Raise complaints

### Provider

- Land on jobs by default
- See pending jobs
- Review job details, notes and photo references
- Send quote
- Wait for customer approval
- Run arrival verification
- Start job after arrival
- Submit completion proof
- Message customer

### Administrator

- Moderate marketplace activity
- Review provider statuses
- View complaints and operational activity

### System admin

- Full platform administration
- Configure services
- Onboard providers
- Approve/suspend providers
- Manage system-level controls

## Creating a new user

1. Create the user in Firebase Authentication.
2. Sign in once or manually create `profiles/{uid}`.
3. Set the profile fields:

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "",
  "address": "",
  "notifications": true,
  "role": "customer"
}
```

4. For provider users, also create/update:

```text
providers/{providerId}
providerStatuses/{providerId}
availability/{providerId}
```

The current seeded provider id is the email address:

```text
provider@fixmate.app
```
