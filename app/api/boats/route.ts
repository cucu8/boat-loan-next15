import { httpsAgent } from "@/libs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get(`http://localhost:7229/api/boats`, {
      httpsAgent,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Bir hata oluştu.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
