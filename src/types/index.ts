export type UserRole = "user" | "agent" | "admin" | "fraud";

export interface UserProfile {
  _id?: string;
  name?: string;
  email: string;
  role: UserRole;
  photoURL?: string;
  uid?: string;
}

export interface Property {
  _id: string;
  propertyTitle: string;
  propertyLocation: string;
  houseNumber?: string;
  roadNumber?: string;
  division?: string;
  country?: string;
  continent?: string;
  propertyImage: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  agentName: string;
  agentEmail: string;
  agentImage?: string;
  status: "pending" | "verified" | "rejected" | "fraud";
  description?: string;
  propertyType?: string;
}

export interface WishlistItem {
  _id: string;
  propertyID: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  agentName: string;
  agentEmail: string;
  agentImage?: string;
  priceRange: string;
  minPrice: number;
  maxPrice: number;
  userEmail: string;
  userName?: string;
}

export interface Offer {
  _id: string;
  propertyID: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage?: string;
  agentName?: string;
  agentEmail: string;
  buyerName: string;
  buyerEmail: string;
  offeredAmount: number;
  status: "pending" | "accepted" | "rejected" | "bought";
  buyingDate?: string;
  transactionId?: string;
}

export interface Review {
  _id?: string;
  propertyID?: string;
  propertyTitle?: string;
  agentName?: string;
  agentEmail?: string;
  userEmail?: string;
  userName?: string;
  username?: string;
  userImage?: string;
  userPhoto?: string;
  reviewDescription: string;
  rating?: number;
  reviewTime?: number | string;
}

export interface PaymentRecord {
  _id?: string;
  propertyLocation: string;
  propertyTitle: string;
  propertyImage?: string;
  agentName: string;
  agentEmail: string;
  buyerName: string;
  buyerEmail: string;
  date: number;
  soldPrice: number;
  offersId: string;
  transactionId: string;
}
