import mongoose from "mongoose";
import Prestacion from "../models/Prestacion";

const prestaciones = [
  // 01. Consultas
  { codigo: "01.01", categoria: "Consultas", nombre: "Examen, diagnóstico y plan de tratamiento", valorActual: 30000 },
  { codigo: "01.01-A", categoria: "Consultas", nombre: "AUSENTE", valorActual: 0, facturable: false },
  { codigo: "01.04", categoria: "Consultas", nombre: "Consulta Urgencia", valorActual: 30000 },

  // 02. Operatoria dental
  { codigo: "02.01", categoria: "Operatoria dental", nombre: "Composite simple", valorActual: 65000 },
  { codigo: "02.02", categoria: "Operatoria dental", nombre: "Composite compuesto", valorActual: 70000 },
  { codigo: "02.03", categoria: "Operatoria dental", nombre: "Composite globalizado por cavidad", valorActual: 75000 },
  { codigo: "02.04", categoria: "Operatoria dental", nombre: "Estética del ángulo en dientes anteriores", valorActual: 75000 },
  { codigo: "02.05", categoria: "Operatoria dental", nombre: "Carilla de resina directa estratificada", valorActual: 120000 },
  { codigo: "02.06", categoria: "Operatoria dental", nombre: "Incrustación de resina directa", valorActual: 140000 },

  // 03. Endodoncia
  { codigo: "03.01", categoria: "Endodoncia", nombre: "Tratamiento unirradicular", valorActual: 190000 },
  { codigo: "03.02", categoria: "Endodoncia", nombre: "Tratamiento multirradicular", valorActual: 220000 },
  { codigo: "03.03", categoria: "Endodoncia", nombre: "Retratamiento endodóntico", valorActual: 220000 },

  // 04. Prótesis fija
  { codigo: "04.01", categoria: "Prótesis fija", nombre: "Overlay/Inlay/Endocrown en resina", valorActual: 230000 },
  { codigo: "04.02", categoria: "Prótesis fija", nombre: "Overlay/Inlay/Endocrown en disilicato", valorActual: 350000 },
  { codigo: "04.03", categoria: "Prótesis fija", nombre: "Postes de fibra", valorActual: 240000 },
  { codigo: "04.04", categoria: "Prótesis fija", nombre: "Perno muñón simple", valorActual: 180000 },
  { codigo: "04.05", categoria: "Prótesis fija", nombre: "Perno muñón seccionado o pasante", valorActual: 195000 },
  { codigo: "04.06", categoria: "Prótesis fija", nombre: "Provisorio de acrílico por unidad", valorActual: 75000 },
  { codigo: "04.07", categoria: "Prótesis fija", nombre: "Provisorio PMMA por unidad", valorActual: 180000 },
  { codigo: "04.08", categoria: "Prótesis fija", nombre: "Corona definitiva de PMMA", valorActual: 250000 },
  { codigo: "04.09", categoria: "Prótesis fija", nombre: "Corona acrílico biolon", valorActual: 230000 },
  { codigo: "04.10", categoria: "Prótesis fija", nombre: "Corona porcelana-metal", valorActual: 410000 },
  { codigo: "04.11", categoria: "Prótesis fija", nombre: "Corona de zirconio", valorActual: 450000 },
  { codigo: "04.12", categoria: "Prótesis fija", nombre: "Corona metálica", valorActual: 320000 },
  { codigo: "04.13", categoria: "Prótesis fija", nombre: "Puente porcelana-metal (por tramo)", valorActual: 250000 },
  { codigo: "04.14", categoria: "Prótesis fija", nombre: "Corona sobre implante (metal porcelana)", valorActual: 480000 },
  { codigo: "04.15", categoria: "Prótesis fija", nombre: "Corona sobre implante (zirconio)", valorActual: 520000 },
  { codigo: "04.16", categoria: "Prótesis fija", nombre: "Corona de disilicato", valorActual: 520000 },

  // 05. Prótesis parcial removible
  { codigo: "05.01", categoria: "PPR", nombre: "PPR Acrílico hasta 4 dientes", valorActual: 220000 },
  { codigo: "05.02", categoria: "PPR", nombre: "PPR Acrílico hasta 5 dientes o más", valorActual: 390000 },
  { codigo: "05.03", categoria: "PPR", nombre: "PPR Cromo cobalto", valorActual: 520000 },
  { codigo: "05.04", categoria: "PPR", nombre: "Cromoflex", valorActual: 520000 },
  { codigo: "05.05", categoria: "PPR", nombre: "Prótesis parcial inmediata", valorActual: 250000 },
  { codigo: "05.06", categoria: "PPR", nombre: "Prótesis flex Arañita (hasta 3 piezas)", valorActual: 180000 },
  { codigo: "05.07", categoria: "PPR", nombre: "Prótesis flex Arañita (más de 3 piezas)", valorActual: 270000 },

  // 06. Varios
  { codigo: "06.01", categoria: "Varios", nombre: "Compostura simple", valorActual: 50000 },
  { codigo: "06.02", categoria: "Varios", nombre: "Compostura con agregado de diente", valorActual: 75000 },
  { codigo: "06.03", categoria: "Varios", nombre: "Compostura con agregado de retenedor", valorActual: 75000 },
  { codigo: "06.04", categoria: "Varios", nombre: "Compostura con agregado de diente y retenedor", valorActual: 85000 },
  { codigo: "06.05", categoria: "Varios", nombre: "Diente adicional", valorActual: 5000 },
  { codigo: "06.06", categoria: "Varios", nombre: "Retenedor adicional", valorActual: 5000 },
  { codigo: "06.07", categoria: "Varios", nombre: "Rebasado en laboratorio", valorActual: 100000 },
  { codigo: "06.08", categoria: "Varios", nombre: "Rebasado en consultorio", valorActual: 65000 },

  // 07. Periodoncia
  { codigo: "07.01", categoria: "Periodoncia", nombre: "Tratamiento de gingivitis", valorActual: 65000 },
  { codigo: "07.02", categoria: "Periodoncia", nombre: "Periodontitis leve/moderada (por sector)", valorActual: 65000 },
  { codigo: "07.03", categoria: "Periodoncia", nombre: "Periodontitis severa (por sector)", valorActual: 65000 },
  { codigo: "07.04", categoria: "Periodoncia", nombre: "Placa oclusal acrílica miorrelajante", valorActual: 260000 },
  { codigo: "07.05", categoria: "Periodoncia", nombre: "Placa oclusal bruxismo digital", valorActual: 290000 },
  { codigo: "07.06", categoria: "Periodoncia", nombre: "Placa oclusal termocurada", valorActual: 340000 },
  { codigo: "07.07", categoria: "Periodoncia", nombre: "Ferulización temporaria", valorActual: 65000 },
  { codigo: "07.08", categoria: "Periodoncia", nombre: "Contención post ortodoncia", valorActual: 65000 },

  // 08. Radiología
  { codigo: "08.01", categoria: "Radiología", nombre: "Periapical", valorActual: 15000 },
  { codigo: "08.02", categoria: "Radiología", nombre: "Bitewing", valorActual: 15000 },

  // 09. Cirugía
  { codigo: "09.01", categoria: "Cirugía", nombre: "Extracción simple", valorActual: 65000 },
  { codigo: "09.02", categoria: "Cirugía", nombre: "Extracción de terceros molares simple", valorActual: 85000 },
  { codigo: "09.03", categoria: "Cirugía", nombre: "Incisión y drenaje de abscesos", valorActual: 25000 },
  { codigo: "09.04", categoria: "Cirugía", nombre: "Alargamiento de corona clínica", valorActual: 55000 },
  { codigo: "09.05", categoria: "Cirugía", nombre: "Liberación de dientes retenidos", valorActual: 95000 },
  { codigo: "09.06", categoria: "Cirugía", nombre: "Eliminación de hiperplasias paraprotésicas", valorActual: 60000 },
  { codigo: "09.07", categoria: "Cirugía", nombre: "Gingivectomía", valorActual: 65000 }
];

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/odenta";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado");

    for (const p of prestaciones) {
      const existe = await Prestacion.findOne({ codigo: p.codigo });

      if (!existe) {
        await Prestacion.create({
          ...p,
          facturable: p.facturable ?? true,
          activa: true,
          historialValores:
            p.facturable === false
              ? []
              : [
                  {
                    valor: p.valorActual,
                    desde: new Date()
                  }
                ]
        });

        console.log(`✔ ${p.codigo} creada`);
      } else {
        console.log(`↪ ${p.codigo} ya existe`);
      }
    }

    console.log("Seed completo 🎉");
    process.exit(0);
  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  }
}

seed();
