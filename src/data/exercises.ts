export type ExerciseCategory = "mobility" | "physio" | "work";
export type ExerciseFrequency = "daily" | "3x-week" | "work-only";
export type SessionKey = "morning" | "night";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  benefit: string;
  category: ExerciseCategory;
  frequency: ExerciseFrequency;
  driveFileId?: string;
  driveImageId?: string;
  notes?: string;
}

export const exercises: Exercise[] = [
  // --- MOBILITY (original morning) ---
  {
    id: "basculacion-pelvica",
    title: "Basculación Pélvica",
    description:
      "Tumbado, contrae el abdomen para pegar la zona lumbar al suelo.",
    duration: "10 reps",
    benefit: "Neutraliza la lordosis desde temprano.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "movilidad-90-90",
    title: "Movilidad 90/90",
    description:
      "Sentado, rodillas a 90 grados. Alterna el lado rotando suavemente.",
    duration: "8 reps",
    benefit: "Libera la cadera, reduciendo carga en L5-S1.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "gato-camello",
    title: "Gato-Camello",
    description:
      "En cuadrupedia, arquea suavemente sin buscar el máximo rango lumbar.",
    duration: "10 reps",
    benefit: "Hidrata los discos sin impacto.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "bird-dog",
    title: "Bird-Dog",
    description:
      "Extiende brazo y pierna contraria manteniendo espalda plana.",
    duration: "10 reps",
    benefit: "Activa la faja abdominal protectora.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "puente-gluteo",
    title: "Puente de Glúteo",
    description:
      "Tumbado boca arriba, eleva la pelvis contrayendo fuerte los glúteos.",
    duration: "12 reps",
    benefit: "El glúteo es el mejor escudo para tu disco L5.",
    category: "mobility",
    frequency: "daily",
  },

  // --- WORK ---
  {
    id: "psoas-de-pie",
    title: "Psoas de Pie",
    description:
      "Paso atrás, tronco erguido, contrae glúteo del lado estirado.",
    duration: "30s/lado",
    benefit: "Evita que el psoas tire de L5 hacia delante.",
    category: "work",
    frequency: "work-only",
  },
  {
    id: "columna-en-silla",
    title: "Columna en Silla",
    description:
      "Sentado, abre codos y extiende levemente la espalda ALTA.",
    duration: "8 reps",
    benefit: "Libera presión dorsal para no sobrecargar la lumbar.",
    category: "work",
    frequency: "work-only",
  },
  {
    id: "pendulo-cadera",
    title: "Péndulo de Cadera",
    description: "Apoyado en mesa, balancea una pierna como un péndulo.",
    duration: "15 reps",
    benefit: "Lubrica la cadera sin añadir peso vertical.",
    category: "work",
    frequency: "work-only",
  },
  {
    id: "elongacion-axial",
    title: "Elongación Axial",
    description: "Imagina un hilo tirando de tu coronilla hacia el cielo.",
    duration: "3 respiraciones",
    benefit: "Descompresión activa de las vértebras.",
    category: "work",
    frequency: "work-only",
  },
  {
    id: "extension-pared",
    title: "Extensión en Pared",
    description:
      "Manos a la pared, baja el pecho manteniendo espalda recta.",
    duration: "45s",
    benefit: "Abre el tórax y reduce la carga estática sentada.",
    category: "work",
    frequency: "work-only",
  },

  // --- MOBILITY (original night) ---
  {
    id: "postura-nino",
    title: "Postura del Niño",
    description:
      "Siéntate sobre talones, brazos al frente, respira hondo.",
    duration: "2 min",
    benefit: "Apertura pasiva de los espacios L5-S1.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "piriforme-suave",
    title: "Piriforme Suave",
    description:
      "Tumbado, cruza tobillo sobre rodilla y tira del muslo.",
    duration: "1 min/lado",
    benefit: "Libera el nervio ciático de la tensión pélvica.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "rodillas-pecho",
    title: "Rodillas al Pecho",
    description: "Abraza rodillas y balancéate suavemente.",
    duration: "1 min",
    benefit: "Masajea el sacro y relaja la artrosis lumbar.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "torsion-controlada",
    title: "Torsión Controlada",
    description: "Tumbado, deja caer rodillas a un lado con suavidad.",
    duration: "1 min/lado",
    benefit: "Movilidad rotacional para desinflamar facetas.",
    category: "mobility",
    frequency: "daily",
  },
  {
    id: "paloma-suave",
    title: "Paloma Suave",
    description:
      "Una pierna flexionada delante, la otra estirada atrás. Mantén tronco alto.",
    duration: "45s/lado",
    benefit: "Estiramiento profundo de rotadores externos de cadera.",
    category: "mobility",
    frequency: "daily",
  },

  // --- PHYSIO (daily) ---
  {
    id: "plancha-frontal",
    title: "Plancha Frontal",
    description:
      "5 series de 5 segundos de contracción seguidos de 5 segundos de descanso.",
    duration: "5x5s",
    benefit: "Estabilización del core sin carga axial.",
    category: "physio",
    frequency: "daily",
    driveFileId: "1F3G6zHOU2G5DYiftTdn8sef0fmRYxCiQ",
  },
  {
    id: "plancha-lateral",
    title: "Plancha Lateral",
    description:
      "5 series de 5 segundos de contracción seguidos de 5 segundos de descanso.",
    duration: "5x5s",
    benefit: "Fortalece los oblicuos y estabilizadores laterales.",
    category: "physio",
    frequency: "daily",
    driveFileId: "1wGk8eO2EZSuTx0KJwoDcQyGhnPV-r8qg",
  },
  {
    id: "press-pallof",
    title: "Press Pallof",
    description: "2 series de 10 repeticiones a cada lado.",
    duration: "2x10/lado",
    benefit: "Anti-rotación que protege la columna bajo carga.",
    category: "physio",
    frequency: "daily",
    driveFileId: "1vndmjQ8SrHWegAdiElV8tCpUbGuuUlFU",
  },
  {
    id: "rotacion-externa-cadera",
    title: "Rotación Externa de Cadera",
    description: "1 serie de 10 repeticiones.",
    duration: "1x10",
    benefit: "Mejora la movilidad de cadera y reduce compensaciones lumbares.",
    category: "physio",
    frequency: "daily",
    driveFileId: "1sxUMGXXsiRIW-l2bNSr7qEKrR6O2XCJn",
    notes: "En derecha incluir goma.",
  },
  {
    id: "slr",
    title: "SLR (Elevación Pierna Recta)",
    description: "10 repeticiones con cada pierna.",
    duration: "10 reps/pierna",
    benefit: "Fortalece el cuádriceps sin compresión discal.",
    category: "physio",
    frequency: "daily",
    driveFileId: "1DCNZ4ULvVah6vS7bO3e8h1edQBxjMMwv",
  },

  // --- PHYSIO (3x/week) ---
  {
    id: "puente-gluteo-goma",
    title: "Puente Glúteo con Goma",
    description: "2 series quedándote con 5 repeticiones en reserva.",
    duration: "2 series (RIR 5)",
    benefit: "Activación glútea con resistencia externa.",
    category: "physio",
    frequency: "3x-week",
    driveFileId: "111gd9tgl5yKIUnZKPfqfXzhxzS29t8-M",
  },
  {
    id: "puente-gluteo-talones",
    title: "Puente Glúteo en Talones",
    description:
      "2 series de 30 repeticiones. Incluye goma que traccione hacia el exterior.",
    duration: "2x30",
    benefit: "Resistencia glútea y estabilidad pélvica.",
    category: "physio",
    frequency: "3x-week",
    driveFileId: "1z0NWMMEcMZjMZk7zS-ygVd4UKO0x5IEg",
  },
  {
    id: "puente-gluteo-1pierna-foam",
    title: "Puente Glúteo 1 Pierna Isométrico sobre Foam",
    description:
      "Apoyo talón sobre el foam, subo y mantengo sin caer. 3 series de 15-20 segundos. Si molesta algo, bajas. Descanso a placer. Empieza por la pierna mala.",
    duration: "3x15-20s",
    benefit: "Activación glútea unilateral con control sobre superficie inestable.",
    category: "physio",
    frequency: "3x-week",
    driveImageId: "1UCzPz7VfMBTc__0g9PNMyYymC1PO5nKd",
    notes:
      "No debe molestar lumbar y no puedes notar más el gemelo que el isquio.",
  },
  {
    id: "puente-gluteo-1pierna-banco",
    title: "Puente Glúteo 1 Pierna con Apoyo en Banco",
    description:
      "3 series de 10-15 repeticiones según tolerancia. Empieza por la pierna mala; la contraria hace las mismas repeticiones.",
    duration: "3x10-15",
    benefit: "Fuerza glútea unilateral con mayor recorrido.",
    category: "physio",
    frequency: "3x-week",
    notes:
      "No debe molestar lumbar y no puedes notar más el gemelo que el isquio.",
  },
  {
    id: "clamshell",
    title: "Clamshell",
    description:
      "2 series hasta quedarte con 5 repeticiones en reserva (5 reps antes del límite de fuerza). Pierna mala arriba primero.",
    duration: "2 series (RIR 5)",
    benefit: "Activa el glúteo medio y estabiliza la pelvis.",
    category: "physio",
    frequency: "3x-week",
    driveFileId: "1j1_Ostn7iAeEVLPOuSOCYclGLagHY1SY",
  },
  {
    id: "puente-gluteo-banco-goma",
    title: "Puente Glúteo en Banco con Goma en Rodillas",
    description:
      "2 series quedándote con 5 repeticiones en reserva. Apoyo en banco con goma en las rodillas.",
    duration: "2 series (RIR 5)",
    benefit: "Activación glútea con resistencia en abducción.",
    category: "physio",
    frequency: "3x-week",
    notes: "Día de gym: uno de los 3 días por semana.",
  },
  {
    id: "puente-gluteo-barra",
    title: "Puente Glúteo con Barra",
    description:
      "3 series entre 8-15 repeticiones según tolerancia. Peso aproximado 40-50 kg totales.",
    duration: "3x8-15",
    benefit: "Hipertrofia y fuerza glútea con carga progresiva.",
    category: "physio",
    frequency: "3x-week",
    driveFileId: "1ZnrcyGvYcyMhwT0sb9HqT2g6QxdlGm3J",
    notes: "Día de gym: uno de los 3 días por semana.",
  },
];

export const EXERCISES_TO_AVOID = [
  "Sentadillas profundas o con barra trasera",
  "Peso muerto",
  "Abdominales",
  "Hiperextensiones lumbares",
];

export const WORK_EXERCISE_IDS = exercises
  .filter((e) => e.category === "work")
  .map((e) => e.id);

export const DEFAULT_SESSION_CONFIG: Record<SessionKey, string[]> = {
  morning: [
    "basculacion-pelvica",
    "movilidad-90-90",
    "gato-camello",
    "bird-dog",
    "puente-gluteo",
  ],
  night: [
    "postura-nino",
    "piriforme-suave",
    "rodillas-pecho",
    "torsion-controlada",
    "paloma-suave",
  ],
};

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((e) => e.id === id);
}
