import type { WaitlistRequest, WaitlistResponse, HealthResponse } from '@busybuddy/shared';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

/** Submit a waitlist / contact lead to the backend. */
export async function submitWaitlist(payload: WaitlistRequest): Promise<WaitlistResponse> {
  try {
    const res = await fetch(`${BASE}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await parseJson<WaitlistResponse>(res);
  } catch {
    return { ok: false, error: 'Network error — is the API running?' };
  }
}

/** Ping the backend health endpoint. */
export async function fetchHealth(): Promise<HealthResponse | null> {
  try {
    const res = await fetch(`${BASE}/api/health`);
    if (!res.ok) return null;
    return await parseJson<HealthResponse>(res);
  } catch {
    return null;
  }
}
