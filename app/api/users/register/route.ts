import { decrypt, httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cors } from "@/libs";

export async function OPTIONS() {
  return cors();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const decryptedPassword = decrypt(body.password);
    const decryptedConfirmPassword = decrypt(body.confirmPassword);
    body.password = decryptedPassword;
    body.confirmPassword = decryptedConfirmPassword;

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      body,
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = NextResponse.json(data, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");

    return response;
  } catch (error: any) {
    console.error("SERVER API error:", error?.response?.data?.message);

    const response = NextResponse.json(
      { error: error?.response?.data?.message },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
}
