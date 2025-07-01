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
      `https://api.teknekiralagez.com/api/users`,
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

    return response; // ✅ EKSİK OLAN SATIR
  } catch (error: any) {
    console.error("API error:", error?.response?.data || error.toString());

    const response = NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
}
