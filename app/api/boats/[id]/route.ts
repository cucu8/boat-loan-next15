import { httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { IdParams } from "@/models";

export async function GET(req: NextRequest, { params }: IdParams) {
  const { id } = await params;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}boats/${id}`,
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
