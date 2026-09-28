import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExit = await User.findOne({ email });
    if (userExit) {
      return res.status(400).json({ message: "This email is taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({ name, email, password: hashedPassword }).save();
    res.status(200).json({ message: "Register Succes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Login success", user: payload.user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error test" });
  }
};
