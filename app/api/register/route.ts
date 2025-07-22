import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return NextResponse.json({ user: { id: user._id, email: user.email, name: user.name } }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Registration failed." }, { status: 500 });
  }
} 