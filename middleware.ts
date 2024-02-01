import { middleware as importedMiddleware } from "./middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, importJWK } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value ?? "";

    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    };

    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token, secretKey);
    console.log(payload);
    if (payload.email !== "admin") {
      throw new Error("Invalid email or password");
    }

    const requestHeader = new Headers(request.headers);
    requestHeader.set("user", JSON.stringify({ email: payload.email }));
    const response = NextResponse.next({
      request: {
        headers: requestHeader,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/manage/blog/:path*",
};
