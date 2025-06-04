import { httpsAgent } from "@/libs";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}boats`,
      body,
      {
        httpsAgent,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}
