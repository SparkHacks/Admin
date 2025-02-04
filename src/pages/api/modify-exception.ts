import type { APIRoute } from "astro";
import { auth } from "../../firebase/server";
import { FirebaseAuthError } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  
  // get email
  try {
    const data = await request.formData()
    const email = data.get("email") as string
    const action = data.get("action") as string

    // add user with specific email with admin
    const user = await auth.getUserByEmail(email)
    console.log(user)

    if (action === "add") {
      if (user.customClaims && (user.customClaims as any).exception === true) {
        console.log("user already is exception")
        return new Response(`${email}: Already is exception`)
      }

      await auth.setCustomUserClaims(user.uid, {
        exception: true
      })

      return new Response(`${email}: Successfully add user as exception`)
    }
    else if (action === "remove") {
      if (user.customClaims && (user.customClaims as any).exception === true) {
        await auth.setCustomUserClaims(user.uid, null)
        return new Response(`${email}: Successfully remove exception role from user`)
      }

      if (user.customClaims && user.customClaims.admin === true) {
        return new Response(`${email}: User already is admin`)
      }

      return new Response(`${email}: User already regular`)
    }
    else { // action is weird
      return new Response("Invalid action", {status: 400})
    }
  }
  catch (err) {
    console.error(err)
    if (err instanceof FirebaseAuthError) {
      if (err.code === "auth/user-not-found") {
        return new Response(err.message, {status: 500})
      }
      else {
        return new Response("Something is wrong with server", {status: 500})
      }
    }
    else {
      console.error("Other unknown error")
      return new Response("Something is wrong with server", {status: 500})
    }
  }
}