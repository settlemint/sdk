import { getIronSession } from "iron-session";
import type { NextRequest, NextResponse } from "next/server.js";
import { z } from "zod";
import { name } from "../../../package.json";
import { AuthSessionSchema } from "./auth.js";

export const SessionSchema = z.object({
  auth: AuthSessionSchema.optional(),
});

export type Session = z.infer<typeof SessionSchema>;

// Define the session options
export const sessionOptions = {
  password: process.env.SETTLEMINT_SESSION_SECRET as string,
  cookieName: name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

export async function getSession(request: NextRequest, response: NextResponse): Promise<Session> {
  const session = await getIronSession<Session>(request, response, sessionOptions);
  return SessionSchema.parse(session);
}

export async function clearSession(request: NextRequest, response: NextResponse) {
  const session = await getIronSession<Session>(request, response, sessionOptions);
  session.destroy();
}

export async function updateSession(request: NextRequest, response: NextResponse, updates: Partial<Session>) {
  const session = await getIronSession<Session>(request, response, sessionOptions);
  Object.assign(session, updates);
  const sessionData = SessionSchema.parse(session);
  await session.save();
  return sessionData;
}
