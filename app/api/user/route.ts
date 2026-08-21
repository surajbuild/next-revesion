import { connectDB } from "@/lib/connectDB";
import User from "@/models/userModel";
import { isLoggedIn } from "@/lib/auth";

export async function GET() {
  try {
    console.log("Entered inside GET");
    await connectDB();
    const user = await isLoggedIn();

    console.log("user", user.email.length);

    if (user instanceof Response) {
      return user;
    }

    return Response.json({
      message: "user fetched",
      user,
    });
  } catch (error) {
    return Response.json({
      message: "Something went wrong",
    });
  }
}
