"use server"

import { buildApiUrl } from "@/API/config";
import { RegisterObjectType } from "./Register.schemas";

export async function RegisterAvtion(valuefromRegister: RegisterObjectType) {
  try {
    const RequestRegister = await fetch(buildApiUrl("auth/register"), {
      method: "POST",
      body: JSON.stringify({
        firstName: valuefromRegister.firstName,
        lastName: valuefromRegister.lastName,
        username: valuefromRegister.username,
        email: valuefromRegister.email,
        password: valuefromRegister.password,
      }),
      headers: { "content-type": "application/json" },
    });
    return await RequestRegister.json();
  } catch (error) {
    console.error("error register", error);
    return { success: false, message: "Registration failed" };
  }
}
