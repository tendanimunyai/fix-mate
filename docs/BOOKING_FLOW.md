# Booking, quote, tracking and completion flow

## Customer quote request

1. Customer selects a service.
2. Customer adds job notes.
3. Customer optionally attaches photo references.
4. App finds an approved and available provider.
5. Request is created in Firestore with status `Pending`.
6. Provider and admin roles receive alerts.

Key request fields:

```text
service
provider
providerId
customer
customerId
notes
jobDescription
attachments
status
price
paymentStatus
createdAt
```

## Provider quote

1. Provider opens the job.
2. Provider reviews customer notes and photos.
3. Provider sends a quote with:
   - call-out fee
   - labour model
   - labour rate/hours or fixed labour
   - materials
   - extras
4. App calculates:
   - total
   - platform fee
   - provider earnings
5. Request moves to `quoteStatus: pending_approval`.

## Customer quote decision

Customer can:

- Accept quote: request moves to accepted/en-route state and payment becomes authorised.
- Decline quote: quote is rejected and provider can revise.

## Arrival and job start

Provider cannot start the job directly from accepted state.

Expected flow:

```text
Pending -> Accepted -> Arrived -> In progress -> Completed
```

The app uses `verifyArrival()` to mark the provider as arrived. Current implementation simulates a verified distance of 65m and sets:

```text
arrivalStatus: arrived
arrivalDistanceMeters: 65
providerDistanceKm: 0.1
estimatedArrivalMinutes: 0
```

Production should replace this with provider GPS updates and server-side geofence validation.

## Tracking

Customer can track the provider for active accepted/arrived/in-progress jobs. Current tracking uses request fields:

```text
providerDistanceKm
estimatedArrivalMinutes
arrivalStatus
```

Production should persist provider location updates and calculate distance/ETA server-side.

## Completion proof

Provider can complete a job only when:

- status is `In progress`
- quote is approved
- completion notes are provided
- at least one proof photo reference is provided

On success:

```text
status: Completed
completionProofStatus: submitted
paymentStatus: paid
completedAt: <timestamp>
```

Production should upload actual photo files to Firebase Storage and save download URLs on the request.

## Cancellation rules

Cancellable statuses:

```text
Searching
Pending
Accepted
```

Customer cancellation after quote acceptance currently applies:

```text
cancellationFee: R50
```

No cancellation is allowed after the job is in progress unless admin/system-admin policy is expanded.

