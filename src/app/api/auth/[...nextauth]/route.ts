
import { NextAuthConfig } from "@/Next-Auth/next-auth.Config";
import NextAuth from "next-auth";


 const routeHandler =  NextAuth( NextAuthConfig )

export { routeHandler as GET , routeHandler as POST }