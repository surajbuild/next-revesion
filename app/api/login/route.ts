import { CreateLoginSchema } from "@/app/types";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  const body = await request.json();
  console.log(body);
  const { success, data } = CreateLoginSchema.safeParse(body);

  if (!success) {
    return NextResponse.json(
      {
        message: "invalid inputs",
      },
      { status: 401 },
    );
  }

  const { email, password } = data;
  const user = await User.findOne({email: email});

  console.log(user._id);

  if(!user) {
    return NextResponse.json({
        message: "User not found"
    }, {status: 404})
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)

  if(!isMatch) {
    return NextResponse.json({
        message: "Incorrect password"
    }, {status: 401})
  }

  const signature = createHmac('sha256',process.env.COOKIE_SECRET!)
                    .update(user.id)
                    .digest('hex')
  console.log('signature', signature)


  const signedUserId = `${user.id}.${signature}`;


  const cookieStore = await cookies();

  cookieStore.set('userId', signedUserId, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  })


  return NextResponse.json(
    {
      message: "Logged in successfully",
      user,
    },
    { status: 200 },
  );
}
