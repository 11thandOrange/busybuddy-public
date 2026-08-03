import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { WIDGETS } from '@busybuddy/shared';
import type { WaitlistRequest } from '@busybuddy/shared';
import { Layout } from '../components/Layout';
import { submitWaitlist } from '../lib/api';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function GetStarted() {
  const [searchParams] = useSearchParams();
  const presetWidget = searchParams.get('widget') ?? '';

  const [form, setForm] = useState<WaitlistRequest>({
    name: '',
    email: '',
    storeUrl: '',
    interestedWidgetId: WIDGETS.some((w) => w.id === presetWidget) ? presetWidget : '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const update = (key: keyof WaitlistRequest, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setFieldErrors({});
    setServerError('');

    const payload: WaitlistRequest = {
      name: form.name,
      email: form.email,
      storeUrl: form.storeUrl || undefined,
      interestedWidgetId: form.interestedWidgetId || undefined,
      message: form.message || undefined,
    };

    const res = await submitWaitlist(payload);
    if (res.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setFieldErrors(res.fields ?? {});
      setServerError(res.error);
    }
  };

  if (status === 'success') {
    return (
      <Layout>
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f8ee] text-3xl">
            ✓
          </div>
          <h1 className="font-display text-4xl">You're on the list!</h1>
          <p className="mt-4 text-muted">
            Thanks, {form.name.split(' ')[0] || 'friend'} — we'll be in touch at{' '}
            <span className="font-semibold text-ink">{form.email}</span> shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
              setForm({
                name: '',
                email: '',
                storeUrl: '',
                interestedWidgetId: '',
                message: '',
              });
            }}
            className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Submit another
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-xl">
        <h1 className="huge !text-[clamp(44px,8vw,96px)]">
          GET<span className="slash">/</span>STARTED
        </h1>
        <p className="mt-4 text-lg text-muted">
          Tell us about your store and we'll get you set up with the right widgets.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5" noValidate>
          <Field label="Name" error={fieldErrors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="input"
              placeholder="Ada Merchant"
              required
            />
          </Field>

          <Field label="Email" error={fieldErrors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="input"
              placeholder="ada@store.com"
              required
            />
          </Field>

          <Field label="Store URL (optional)" error={fieldErrors.storeUrl}>
            <input
              type="url"
              value={form.storeUrl}
              onChange={(e) => update('storeUrl', e.target.value)}
              className="input"
              placeholder="https://yourstore.com"
            />
          </Field>

          <Field label="Which widget interests you most?" error={fieldErrors.interestedWidgetId}>
            <select
              value={form.interestedWidgetId}
              onChange={(e) => update('interestedWidgetId', e.target.value)}
              className="input"
            >
              <option value="">No preference</option>
              {WIDGETS.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message (optional)" error={fieldErrors.message}>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="input min-h-[100px] resize-y"
              placeholder="Anything we should know?"
            />
          </Field>

          {serverError && !Object.keys(fieldErrors).length && (
            <p className="rounded-lg bg-[#fde8ef] px-4 py-3 text-sm text-[#ef2f6a]">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-full bg-ink px-6 py-4 text-base font-semibold text-white disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting…' : 'Join the waitlist'}
          </button>
        </form>
      </div>
    </Layout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{label}</span>
      {children}
      {error && <span className="text-xs text-[#ef2f6a]">{error}</span>}
    </label>
  );
}
