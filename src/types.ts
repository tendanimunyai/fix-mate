export type Role = 'customer' | 'provider' | 'administrator' | 'system-admin';
export type RequestStatus = 'Searching' | 'Pending' | 'Accepted' | 'Arrived' | 'In progress' | 'Completed' | 'Cancelled';
export type Service = { id:string; name:string; icon:string; color:string; description:string };
export type Provider = { id:string; name:string; trade:string; rating:number; reviews:number; distance:string; price:string; avatar:string; verified:boolean; bio:string; coordinates?:Coordinates };
export type Coordinates = { latitude:number; longitude:number };
export type Request = {
 id:string; service:string; provider:string; providerId?:string; date:string; time:string; address:string;
 status:RequestStatus; price:string; customer?:string; customerId?:string; notes?:string;
 createdAt?:string; updatedAt?:string; cancelledAt?:string; cancellationReason?:string; cancellationFee?:string;
 estimatedArrivalMinutes?:number; providerDistanceKm?:number; arrivalStatus?:'not_started'|'en_route'|'arrived'|'manual_review'; arrivedAt?:string; arrivalDistanceMeters?:number; paymentStatus?:'unpaid'|'authorised'|'paid'|'refunded';
 quoteStatus?:'estimated'|'pending_approval'|'approved'|'rejected'; pricing?:ServicePricing;
 jobDescription?:string; attachments?:string[];
 completionNotes?:string; completionPhotos?:string[]; completionProofStatus?:'missing'|'submitted'|'accepted'|'disputed'; completedAt?:string;
};
export type LabourBillingModel = 'hourly' | 'fixed';
export type ServicePricing = {
 currency:'ZAR'; callOut:number; labour:number; materials:number; extras:number; total:number; platformFee:number; providerEarnings:number;
 billingModel?:LabourBillingModel; labourRate?:number; labourHours?:number; minimumHours?:number; billableHours?:number; labourDescription?:string;
 quoteStatus?:'estimated'|'pending_approval'|'approved'|'rejected'; submittedAt?:string; approvedAt?:string
};
export type CancellationReason = 'Changed my mind'|'Found another provider'|'Provider is delayed'|'Provider requested cancellation'|'Emergency'|'Other';
export type Message = { id:string; providerId:string; provider:string; avatar:string; text:string; timestamp:string; unread:boolean; requestId?:string; senderRole?:Role; senderName?:string; recipientRoles?:Role[]; unreadFor?:Role[] };
export type AppAlert = { id:string; title:string; text:string; createdAt:string; read:boolean; recipientRoles:Role[]; type?:'message'|'booking'|'quote'|'arrival'|'payment'|'complaint'|'system'; requestId?:string };
export type Review = { id:string; requestId:string; provider:string; rating:number; comment:string; createdAt:string };
export type UserProfile = { name:string; email:string; phone:string; address:string; notifications:boolean; role:Role; coordinates?:Coordinates };
export type ProviderAccountStatus = 'pending' | 'approved' | 'suspended';
export type ProviderAvailability = Record<string,boolean>;
export type AuthSession = { email:string; role:Role };
export type Complaint = { id:string; requestId:string; customer:string; subject:string; details:string; status:'Open'|'Resolved'; createdAt:string };
export type RequestInput = Omit<Request,'id'|'status'|'createdAt'|'updatedAt'> & { status?:RequestStatus };
