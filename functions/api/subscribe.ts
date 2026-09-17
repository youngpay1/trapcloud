interface Env {
  BREVO_API_KEY: string;
}

// Only the production site may call this endpoint (matches the canonical URL in index.html).
// Browsers send an Origin header on every POST, so a missing or foreign Origin is rejected.
// Next step (not implemented yet): verify a Cloudflare Turnstile token from the form before
// calling Brevo, so bots cannot fill list 9 with junk addresses.
const ALLOWED_ORIGIN = 'https://trapcloud.eu';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': ALLOWED_ORIGIN };

  const origin = request.headers.get('Origin');
  if (origin !== ALLOWED_ORIGIN) {
    return new Response(JSON.stringify({ ok: false, error: 'Forbidden' }), { status: 403, headers });
  }

  try {
    const { email } = await request.json() as { email?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid email' }), { status: 400, headers });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, listIds: [9], updateEnabled: true }),
    });

    if (!res.ok && res.status !== 204) {
      // Brevo's message is logged server-side only; the client gets a generic error.
      console.error('Brevo subscribe failed', res.status, await res.text());
      return new Response(JSON.stringify({ ok: false, error: 'Subscription failed' }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500, headers });
  }
};
