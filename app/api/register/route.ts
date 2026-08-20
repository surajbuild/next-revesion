import { connectDB } from "@/lib/connectDB";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { CreateUserSchema } from "@/app/types";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { success, data } = CreateUserSchema.safeParse(body);

    if (!success) {
      return NextResponse.json(
        {
          message: "Invalid input",
        },
        { status: 400 },
      );
    }

    const { name, email, password } = data;

    console.log('data', data)

    const existingUser = await User.findOne({ email: data.email }).select('-password');

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "user created successfully",
      id: user._id,
    }, {status: 201});
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
