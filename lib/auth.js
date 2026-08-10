import { cookies } from "next/headers";
import User from "../models/userModel";
import { createHmac } from "crypto";
export async function isLoggedIn() {
  try {
    const cookieStore = await cookies();
    const [userId, signature] = cookieStore.get("userId")?.value.split('.') || [];

    console.log('userId', userId)
    console.log('signature', signature)

    if(userId == [] || signature == undefined) {
      return Response.json({
        message: "invalid userId or signature"
      }, {status: 400})
    }

    const verifySignature = createHmac('sha256', process.env.COOKIE_SECRET).update(userId).digest('hex')

    console.log('verifiedSignature', verifySignature)

    if(signature !== verifySignature) {
      return Response.json({
        message: "Cookie is changed or diffrent cookie"
      }, {status: 400})
    }

    if(!userId || !signature) {
      return 
    }
    
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


