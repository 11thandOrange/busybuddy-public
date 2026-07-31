/**
 * Shared API contract types used by both the Express backend and the React
 * frontend. Keeping these in one place guarantees the request/response shapes
 * stay in sync across the wire.
 */

/** Payload the frontend posts to create a waitlist / contact lead. */
export interface WaitlistRequest {
  /** Contact name. */
  name: string;
  /** Contact email address. */
  email: string;
  /** Optional store URL the merchant wants to boost. */
  storeUrl?: string;
  /** Optional widget id the lead is most interested in. */
  interestedWidgetId?: string;
  /** Optional free-form message. */
  message?: string;
}

/** A persisted waitlist entry returned by the backend. */
export interface WaitlistEntry extends WaitlistRequest {
  id: string;
  createdAt: string;
}

/** Standard success envelope. */
export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

/** Standard error envelope. */
export interface ApiError {
  ok: false;
  error: string;
  /** Field-level validation messages keyed by field name. */
  fields?: Record<string, string>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** Response body for POST /api/waitlist. */
export type WaitlistResponse = ApiResponse<WaitlistEntry>;

/** Response body for GET /api/health. */
export interface HealthResponse {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
}

/** Response body for GET /api/widgets. */
export type WidgetsResponse = ApiResponse<{ count: number; ids: string[] }>;
