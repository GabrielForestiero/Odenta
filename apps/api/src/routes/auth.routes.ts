// routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { authMiddleware, AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/User";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json({
    id: user._id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol
  });
});

export default router;
