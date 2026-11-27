import { NextRequest, NextResponse } from "next/server";
import {
  addIgnoredIp,
  extractRawIp,
  getAnalyticsPayload,
  removeIgnoredIp,
  resetAnalyticsData,
} from "@/lib/first-party-analytics";
import {
  ANALYTICS_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/analytics-auth";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ANALYTICS_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await getAnalyticsPayload(extractRawIp(req));
  return NextResponse.json(payload);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    action?: string;
    ip?: string;
  };

  if (body.action === "exclude_ip" && typeof body.ip === "string") {
    await addIgnoredIp(body.ip);
  } else if (body.action === "remove_ip" && typeof body.ip === "string") {
    await removeIgnoredIp(body.ip);
  } else if (body.action === "reset") {
    await resetAnalyticsData();
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const payload = await getAnalyticsPayload(extractRawIp(req));
  return NextResponse.json(payload);
}
