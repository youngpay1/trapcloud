interface Env {
  BREVO_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

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
      const err = await res.json() as { message?: string };
      return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Server error' }), { status: 500, headers });
  }
};
