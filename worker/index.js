/**
 * Marks Tracker - Cloudflare Worker API
 * 
 * KV Namespace: MARKS_KV
 * Environment variable: BOT_TOKEN (your Telegram bot token)
 * 
 * Routes:
 *   GET  /api/marks         → load marks for authenticated user
 *   POST /api/marks         → save marks for authenticated user
 *   POST /api/verify        → verify Telegram login data & return user info
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://sasiya453.github.io",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Telegram-Data",
  "Content-Type": "application/json",
};

// ── Telegram auth verification ──────────────────────────────────────────────
async function verifyTelegramAuth(data, botToken) {
  const { hash, ...fields } = data;
  if (!hash) return false;

  // Build the check string: sorted key=value pairs joined by \n
  const checkString = Object.keys(fields)
    .sort()
    .map((k) => `${k}=${fields[k]}`)
    .join("\n");

  // HMAC-SHA256(checkString, SHA256(botToken))
  const encoder = new TextEncoder();
  const keyData = await crypto.subtle.digest("SHA-256", encoder.encode(botToken));
  const key = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(checkString));
  const expectedHash = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (expectedHash !== hash) return false;

  // Check auth_date is not older than 24 hours
  const authDate = parseInt(fields.auth_date, 10);
  const now = Math.floor(Date.now() / 1000);
  if (now - authDate > 86400) return false;

  return true;
}

// Extract & parse Telegram data from request header
function parseTelegramHeader(request) {
  const raw = request.headers.get("X-Telegram-Data");
  if (!raw) return null;
  try {
    return JSON.parse(atob(raw));
  } catch {
    return null;
  }
}

// ── Request handlers ─────────────────────────────────────────────────────────
async function handleVerify(request, env) {
  const body = await request.json();
  const valid = await verifyTelegramAuth(body, env.BOT_TOKEN);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid Telegram auth" }), {
      status: 401, headers: CORS_HEADERS,
    });
  }
  return new Response(JSON.stringify({ ok: true, user: body }), {
    headers: CORS_HEADERS,
  });
}

async function handleGetMarks(request, env) {
  const tgData = parseTelegramHeader(request);
  if (!tgData) {
    return new Response(JSON.stringify({ error: "Missing auth header" }), {
      status: 401, headers: CORS_HEADERS,
    });
  }
  const valid = await verifyTelegramAuth(tgData, env.BOT_TOKEN);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid auth" }), {
      status: 401, headers: CORS_HEADERS,
    });
  }

  const key = `marks:${tgData.id}`;
  const saved = await env.MARKS_KV.get(key);
  return new Response(saved ?? JSON.stringify({ marks: null }), {
    headers: CORS_HEADERS,
  });
}

async function handleSaveMarks(request, env) {
  const tgData = parseTelegramHeader(request);
  if (!tgData) {
    return new Response(JSON.stringify({ error: "Missing auth header" }), {
      status: 401, headers: CORS_HEADERS,
    });
  }
  const valid = await verifyTelegramAuth(tgData, env.BOT_TOKEN);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid auth" }), {
      status: 401, headers: CORS_HEADERS,
    });
  }

  const body = await request.json();
  const key = `marks:${tgData.id}`;
  await env.MARKS_KV.put(key, JSON.stringify(body));
  return new Response(JSON.stringify({ ok: true }), { headers: CORS_HEADERS });
}

// ── Main fetch handler ────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (pathname === "/api/verify" && request.method === "POST") {
      return handleVerify(request, env);
    }
    if (pathname === "/api/marks" && request.method === "GET") {
      return handleGetMarks(request, env);
    }
    if (pathname === "/api/marks" && request.method === "POST") {
      return handleSaveMarks(request, env);
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404, headers: CORS_HEADERS,
    });
  },
};
