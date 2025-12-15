import express from "express";
import cors from "cors";
import Prestacion from "./models/Prestacion";

const app = express();

app.use(cors());
app.use(express.json());


app.post("/prestaciones", async (req, res) => {
  const prestacion = await Prestacion.create(req.body);
  res.json(prestacion);
});



export default app;
