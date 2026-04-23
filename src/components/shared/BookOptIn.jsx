import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function BookOptIn({ source }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    try {
      if (!supabase) {
        // No Supabase configured, just show success for development
        setStatus('done');
        return;
      }

      // Plain insert for now. Upsert via Netlify Function comes in Stage 6.
      const { error } = await supabase
        .from('book_subscribers')
        .insert({ email: email.trim(), source });

      if (error) {
        // Unique constraint violation = already subscribed, treat as success
        if (error.code === '23505') {
          setStatus('done');
        } else {
          throw error;
        }
      } else {
        setStatus('done');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className="text-sm text-muse-teal font-medium">
        You're on the list. We'll let you know.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <label htmlFor={`book-email-${source}`} className="sr-only">
        Email for book updates
      </label>
      <input
        id={`book-email-${source}`}
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-sm px-3 py-2 border border-warm-gray rounded-md bg-white text-near-black placeholder:text-mid-gray focus:outline-none focus:border-muse-teal flex-1 min-w-0"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="text-sm px-4 py-2 bg-muse-teal text-white rounded-md hover:bg-muse-teal-dark transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === 'submitting' ? 'Saving...' : "Tell me when the book's out"}
      </button>
      {status === 'error' && (
        <p className="text-sm text-storyteller">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
