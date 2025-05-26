import { httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { IdParams } from "@/models/General";

export async function GET(req: NextRequest, { params }: IdParams) {
  const { id } = await params;
  try {
    const { data } = await axios.get(`http://localhost:7229/api/boats/${id}`, {
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
