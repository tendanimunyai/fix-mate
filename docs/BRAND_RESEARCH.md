# Brand research and rebrand note

Date checked: 2026-08-15

## Finding

The previous working names `FixMate` and `FixMe` both have collision risk.

Observed live uses:

- `FixMate` exists on Google Play as a home and business services app by Workapede: https://play.google.com/store/apps/details?id=com.fixmate.fixmate
- `fixmate.com` is a home-service-pro matching site: https://fixmate.com/
- `FixMate` / `Fixmate` is used by multiple home-repair/service businesses and documentation sites.
- `FixME Service` exists on the Apple App Store for housework and electrical repair services: https://apps.apple.com/us/app/fixme-service/id6444836525
- `Fixme: Nearby Shops & Services` exists on the Apple App Store as a local marketplace/service app: https://apps.apple.com/us/app/fixme-nearby-shops-services/id1564736924

## Recommendation

Do not launch publicly as `FixMate`, `Fixmate`, `FixMe`, or `FixME`.

The user selected `One-day local services` as the new working brand on 2026-08-15.

## Additional candidate search

Date checked: 2026-08-15

The following coined names had no exact-match results in web/app/trademark-style searches run during this review:

```text
Serynza
Dovynza
Qavrya
```

Current preference:

1. `Dovynza` — most balanced: distinctive, pronounceable, short enough, and not tied to “fix/home/repair”.
2. `Serynza` — clean search result and memorable, but slightly softer/beauty/pharma sounding.
3. `Qavrya` — distinctive, but harder to spell and say.

Names searched and rejected because of direct or nearby conflicts:

```text
FixMate
FixMe
Zelqora
Qavello
Nolqen
Kivaroa
Nuvella
Orvanta
Velaroa
Rovanta
Taveloa
Qorvello
Mendara
Kaventra
Velqen
Sorvexa
Karyvo
Pryvona
Zervuno
Noryvex
Vorynza
Novyra
Veymora
```

This is not legal clearance. Before committing to the selected name, run formal trademark searches in launch markets and check domain/app-store availability.

## User-proposed candidate: One Day Local Services

Date checked: 2026-08-15

Assessment: usable as a descriptive product tagline or SEO phrase, but weak as the primary app brand.

Search notes:

- No exact-match web/app-store result was found for `One Day Local Services` during this screen.
- The phrase is made of common descriptive terms: `one day`, `local`, and `services`.
- Similar wording is widely used around same-day, one-day, and local service businesses.
- Because it is descriptive, it is harder to own, defend, remember, and rank uniquely than a coined brand such as `Dovynza`.

Decision:

```text
Brand: One-day local services
```

The brand is intentionally descriptive. Before public launch, treat this as a working product name and run formal trademark/domain/app-store clearance.

## Rebrand requirements

When a new name is chosen, update:

```text
app.json                  Expo display name and slug
android/app/src/main/res/values/strings.xml
README.md
docs/*
Firebase project display names, if desired
Email sender templates
Support email/domain
App store listing assets
Privacy policy and terms
```

Keep the package identifier unless there is a strong reason to change it:

```text
com.promiseedge.fixmate.app
```

Changing the package identifier after release creates store/update complications, so it should be decided before first production release.

## Candidate direction

Prefer names that are not generic combinations of `fix`, `mate`, `me`, `repair`, `home`, or `service`.

Potential naming angles:

- Trust and verification
- Local skilled help
- Job completion/proof
- PromiseEdge parent brand
- Service marketplace without “fix” as the primary term
