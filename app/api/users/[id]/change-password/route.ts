import { decrypt, httpsAgent } from "@/libs";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await req.json();

    const authorizationHeader = req.headers.get("Authorization");
    console.log("Authorization Header:", authorizationHeader);

    const token = authorizationHeader?.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1]
      : null;

    const decryptedCurrentPassword = decrypt(body.currentPassword);
    const decryptedNewPassword = decrypt(body.newPassword);
    const decryptedNewPasswordConfirm = decrypt(body.newPasswordConfirm);

    body.currentPassword = decryptedCurrentPassword;
    body.newPassword = decryptedNewPassword;
    body.newPasswordConfirm = decryptedNewPasswordConfirm;

    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/change-password`,
      body,
      {
        httpsAgent,
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
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
