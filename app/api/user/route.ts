import { connectDB } from "@/lib/connectDB"
import User from "@/models/userModel";
import { isLoggedIn } from "@/lib/auth";


export async function GET() {
    console.log('Entered inside GET')
    await connectDB();
    const user = await isLoggedIn();
    console.log('user', user);

    if(user instanceof Response) {
        return user;
    }

    return Response.json({
        message: "user fetched",
        user,
    })
}