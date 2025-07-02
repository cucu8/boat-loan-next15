import { decrypt, httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { LoginSuccessResponse } from "@/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const decryptedPassword = decrypt(body.password);
    body.password = decryptedPassword;

    const { data }: { data: LoginSuccessResponse } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      body,
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Bir hata oluştu.";
    return NextResponse.json(
      { error: errorMessage },
      { status: error?.response?.status || 500 }
    );
  }
}
