# Data model

Types are defined in `src/types.ts`.

## `profiles/{uid}`

```text
name
email
phone
address
notifications
role
coordinates?
```

## `notificationTokens/{tokenId}`

```text
id
userId
role
token
enabled
platform
updatedAt
```

## `services/{serviceId}`

```text
id
name
icon
color
description
```

## `providers/{providerId}`

```text
id
name
trade
rating
reviews
distance
price
avatar
verified
bio
coordinates?
companyId?
companyName?
email?
phone?
serviceIds?
documents?
applicationId?
```

## `companies/{companyId}`

```text
id
name
registrationNumber
contactEmail
contactPhone
address
createdAt
updatedAt
```

## `providerApplications/{applicationId}`

```text
id
userId
userEmail
providerName
providerEmail
providerPhone
companyId
companyName
companyRegistrationNumber
companyContactEmail
companyContactPhone
companyAddress
serviceId
serviceName
serviceArea
yearsExperience
notes
documents
status: draft | submitted | approved | rejected
submittedAt
reviewedAt
reviewedBy
rejectionReason
```

## `providerStatuses/{providerId}`

```text
id
status: pending | approved | suspended
```

## `availability/{providerId}`

```text
id
available
```

## `requests/{requestId}`

```text
id
service
provider
providerId
date
time
address
status
price
customer
customerId
notes
jobDescription
attachments
createdAt
updatedAt
cancelledAt
cancellationReason
cancellationFee
estimatedArrivalMinutes
providerDistanceKm
arrivalStatus
arrivedAt
arrivalDistanceMeters
paymentStatus
quoteStatus
pricing
completionNotes
completionPhotos
completionProofStatus
completedAt
```

## `messages/{messageId}`

```text
id
providerId
provider
avatar
text
timestamp
unread
requestId
senderRole
senderName
recipientRoles
unreadFor
```

## `alerts/{alertId}`

```text
id
title
text
createdAt
read
recipientRoles
type
requestId
createdBy
readBy
```

## `reviews/{reviewId}`

```text
id
requestId
provider
rating
comment
createdAt
```

## `complaints/{complaintId}`

```text
id
requestId
customer
subject
details
status
createdAt
```

## Pricing object

```text
currency
callOut
labour
materials
extras
total
platformFee
providerEarnings
billingModel
labourRate
labourHours
minimumHours
billableHours
labourDescription
quoteStatus
submittedAt
approvedAt
```
