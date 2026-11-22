export type Role = 'customer' | 'owner' | 'admin';
export interface User { id: string; _id?: string; name: string; email: string; image?: string; role: Role; phone?: string; address?: string; createdAt?: string; banned?: boolean }
export interface Equipment { _id: string; name: string; description: string; category: string; image: string; price: number; rentalType: 'Daily'|'Weekly'|'Monthly'; quantity: number; condition: string; brand: string; model: string; specifications: string; terms: string; location: {city: string}; ownerId: string; ownerName: string; ownerEmail?: string; approvalStatus: 'pending'|'approved'|'rejected'; createdAt: string }
export interface Booking { _id: string; equipmentId: string; equipmentName: string; image: string; customerId: string; customerName: string; customerEmail: string; ownerId: string; ownerName: string; ownerEmail: string; startDate: string; endDate: string; days: number; units: number; quantity: number; rentalType: string; unitPrice: number; total: number; contactNumber: string; deliveryAddress: string; notes: string; status: string; paymentStatus: string; createdAt: string; stripeSessionId?: string }
export interface CatalogData { items: Equipment[]; total: number; page: number; pages: number }
export interface AnalyticsData { users: number; equipment: number; pending: number; bookings: number; completed: number; revenue: number; monthlyBookings: { _id: string; value: number }[]; monthlyEarnings: { _id: string; value: number }[] }
export interface OverviewData { users: (User & {_id:string})[]; equipment: Equipment[]; bookings: Booking[] }
export type SearchParams = Promise<Record<string,string|undefined>>;
export interface ApiResult<T> { success: boolean; message: string; data: T }
export interface ApiOptions extends Omit<RequestInit,'body'> { body?: unknown }
