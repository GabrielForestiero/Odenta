import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import app from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI no está definida");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => {
      console.log(`API corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error MongoDB:", err);
  });

  app.use("/api/auth", authRoutes);
