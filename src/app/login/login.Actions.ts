"use server"

import { cookies } from "next/headers";
import { LoginObjectType } from "./login.schemas";


 export async function LoginAction(datafromLogin : LoginObjectType)
{
  try {

    let request = await fetch("https://game-x-flax.vercel.app/api/v1/auth/login" , {
      method : "POST" , 
      body : JSON.stringify(datafromLogin),
      headers : { 'content-type' : 'application/json' }
    })

    let respones = await request.json()

    console.log("respones form login" , respones);


    
    if( respones ) 
      {
        const cookie = await cookies()
        
        cookie.set( "token" , respones.data.accessToken , {
          httpOnly : true , 
          secure : true , 
          sameSite : "strict" 
        } )

        return respones

    }
    
  } catch (error) {
    console.log("error from login" , error);
    
  }
}