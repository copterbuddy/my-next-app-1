"use server";

import State from "./state";
import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import {redirect} from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const result: State = {
    message: "Login Success",
  };
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "admin" && password !== "admin") {
    result.message = "Invalid email or password";
    return result;
  }
  const secretJWK = {
    kty: "oct",
    k: process.env.JOSE_SECRET,
  };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email: email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

  cookies().set("token", token);

  redirect("/manage/blog");
//   return result;
}
