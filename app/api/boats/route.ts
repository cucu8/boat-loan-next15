import { httpsAgent } from "@/libs";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get("http://localhost:7229/api/boats", {
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
