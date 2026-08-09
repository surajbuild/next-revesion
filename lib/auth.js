import { cookies } from "next/headers";
import User from "../models/userModel";
export async function isLoggedIn() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    if (userId == undefined) {
      return Response.json(
        {
          message: "User not logged in",
        },
        { status: 401 },
      );
    }
    const user = await User.findById(userId);
    if(!user) {
        return Response.json({
            message: "User not found"
        }, {status: 404})
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}


