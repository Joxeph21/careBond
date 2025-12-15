import { CONFIG } from "@/utils/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get(
      CONFIG.REFRESH_TOKEN_IDENTIFIER
    )?.value;

    if (!refreshToken) {
      return NextResponse.json({ token: null }, { status: 404 });
    }

    return new NextResponse(JSON.stringify({ token: refreshToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error retrieving token." },
      { status: 500 }
    );
  }
}
