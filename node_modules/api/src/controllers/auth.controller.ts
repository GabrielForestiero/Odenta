import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

/* ======================================================
   REGISTER
====================================================== */
export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: "Faltan datos obligatorios"
      });
    }

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({
        message: "El usuario ya existe"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      nombre,
      email,
      password: passwordHash,
      rol: "profesional", // 🔐 forzado
      activo: true
    });

    return res.status(201).json({
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      createdAt: user.createdAt
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};

/* ======================================================
   LOGIN
====================================================== */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password requeridos"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    if (!user.activo) {
      return res.status(403).json({
        message: "Usuario desactivado"
      });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        rol: user.rol
      },
      process.env.JWT_SECRET || "secret_key",
      {
        expiresIn: "8h"
      }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno" });
  }
};
