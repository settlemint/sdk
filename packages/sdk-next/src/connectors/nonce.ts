import { getIronSession } from "iron-session";
import { nanoid } from "nanoid";
import { cookies } from "next/headers.js";

const CSRF_TOKEN_LENGTH = 32;

const sessionOptions = {
  cookieName: "settlemint_nonce",
  password: process.env.SETTLEMINT_SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export type NonceSession = {
  nonce: string;
};

export async function storeNonce(token: string): Promise<void> {
  const session = await getIronSession<NonceSession>(cookies(), sessionOptions);
  session.nonce = token;
  await session.save();
}

export function resetNonce(): string {
  const nonce = nanoid(CSRF_TOKEN_LENGTH);
  storeNonce(nonce);
  return nonce;
}

export async function retrieveNonce(): Promise<string> {
  const session = await getIronSession<NonceSession>(cookies(), sessionOptions);
  return session.nonce || resetNonce();
}
