import { isLoggedIn } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB"
import { cookies } from "next/headers";


export async function POST() {

    await connectDB();

    const user = await isLoggedIn();

    const cookieStore = await cookies();

    const res = cookieStore.delete('userId')
    console.log('res', res)
    

    return Response.json({
        message: "Logged out successfully" 
    })
} 