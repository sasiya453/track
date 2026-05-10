import { WeeklyMark } from "../marks-tracker/data/marksData";
import { TelegramUser } from "../marks-tracker/components/LoginScreen";

// ← Replace this after you deploy your Cloudflare Worker
export const WORKER_URL = "https://marks-tracker-api.REPLACE_YOUR_SUBDOMAIN.workers.dev";

function makeAuthHeader(user: TelegramUser): string {
  return btoa(JSON.stringify(user));
}

export async function verifyUser(user: TelegramUser): Promise<boolean> {
  try {
    const res = await fetch(`${WORKER_URL}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

export async function loadMarks(user: TelegramUser): Promise<WeeklyMark[] | null> {
  try {
    const res = await fetch(`${WORKER_URL}/api/marks`, {
      headers: { "X-Telegram-Data": makeAuthHeader(user) },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.marks ?? null;
  } catch {
    return null;
  }
}

export async function saveMarks(user: TelegramUser, marks: WeeklyMark[]): Promise<void> {
  try {
    await fetch(`${WORKER_URL}/api/marks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Telegram-Data": makeAuthHeader(user),
      },
      body: JSON.stringify({ marks }),
    });
  } catch {
    // silent fail — data still saved in localStorage as backup
  }
}
