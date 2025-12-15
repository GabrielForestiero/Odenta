import { Schema, model } from "mongoose";

const PrecioHistoricoSchema = new Schema(
  {
    valor: {
      type: Number,
      required: true
    },
    desde: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const PrestacionSchema = new Schema(
  {
    // 01.01, 04.11, etc.
    codigo: {
      type: String,
      required: true,
      unique: true
    },

    // "Consultas", "Operatoria dental", etc.
    categoria: {
      type: String,
      required: true
    },

    // Texto largo de la prestación
    nombre: {
      type: String,
      required: true
    },

    // Valor actual
    valorActual: {
      type: Number,
      required: true
    },

    // Historial de valores
    historialValores: {
      type: [PrecioHistoricoSchema],
      default: []
    },

    // Ej: AUSENTE
    facturable: {
      type: Boolean,
      default: true
    },

    // Para no borrar nunca
    activa: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default model("Prestacion", PrestacionSchema);
