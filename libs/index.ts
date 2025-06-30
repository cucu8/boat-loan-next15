import CryptoJS from "crypto-js";
import https from "https";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_SECRET;

// Self-signed sertifikaları kabul eden HTTPS agent
export const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // DİKKAT: sadece development için uygundur
});

// Fallback encryption function
const simpleEncrypt = (text: string, key: string) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(result);
};

export const encrypt = (text: string) => {
  if (!SECRET_KEY) {
    console.error(
      "NEXT_PUBLIC_ENCRYPT_SECRET environment variable is not defined"
    );
    throw new Error("Encryption secret key is not configured");
  }

  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    console.error("CryptoJS encryption failed, using fallback:", error);
    try {
      return simpleEncrypt(text, SECRET_KEY);
    } catch (fallbackError) {
      console.error("Fallback encryption also failed:", fallbackError);
      throw new Error("Failed to encrypt data");
    }
  }
};

export const decrypt = (cipherText: string) => {
  if (!SECRET_KEY) {
    console.error(
      "NEXT_PUBLIC_ENCRYPT_SECRET environment variable is not defined"
    );
    throw new Error("Encryption secret key is not configured");
  }

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("CryptoJS decryption failed, using fallback:", error);
    try {
      const decoded = atob(cipherText);
      let result = "";
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(
          decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
        );
      }
      return result;
    } catch (fallbackError) {
      console.error("Fallback decryption also failed:", fallbackError);
      throw new Error("Failed to decrypt data");
    }
  }
};

export function buildUrlWithQueryParams(baseUrl: string, params: any) {
  const url = new URL(baseUrl);

  for (const key in params) {
    if (
      params[key] !== null &&
      params[key] !== undefined &&
      params[key] !== ""
    ) {
      url.searchParams.append(key, params[key]);
    }
  }
  return url.toString();
}

export async function withFetch<T>(
  url: string,
  fallback: T,
  token?: string
): Promise<{ data: T; error: string | null }> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: fallback, error: (error as Error).message };
  }
}

import { NextResponse } from "next/server";

export function cors() {
  const response = new NextResponse(null, {
    status: 204,
  });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
