import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../types/user";
import { authentication } from "../middleware/authMiddleware";

const router = Router();
const users: User[] = [];

// Register
router.post("/registerUser", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const checkUser = users.find((u) => u.username === username);

  if (!checkUser) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, checkUser.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const secretKey = "mySuperSecretKey";
  if (!secretKey) {
    console.error("JWT_SECRET missing");
    return res.status(500).json({ message: "Internal server error" });
  }

  const token = jwt.sign(
    { id: checkUser.id, username: checkUser.username },
    secretKey,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

router.get("/protected", authentication, (req: Request, res: Response) => {
  res.json({ message: "Access granted!", user: (req as any).user });
});

export default router;
