import { decrypt, httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const decryptedPassword = decrypt(body.password);
    const decryptedConfirmPassword = decrypt(body.confirmPassword);
    body.password = decryptedPassword;
    body.confirmPassword = decryptedConfirmPassword;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const { data } = await axios.post(`${apiUrl}/users`, body, {
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
