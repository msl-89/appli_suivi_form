export type Phase = 1 | 2 | 3;

export interface WeekData {
  week: number;
  phase: Phase;
  weightMin: number;
  weightMax: number;
  calories: number;
  water: number;
  nutritionRule: string;
  sport: string;
  stepsGoal: number;
  sleepGoal: string;
  waistChange: string;
}

export const WEEKS: WeekData[] = [
  {
    week: 1, phase: 1, weightMin: 103, weightMax: 104,
    calories: 2200, water: 2.5,
    nutritionRule: "Menu type + 1 repas plaisir samedi midi.",
    sport: "Lun/Mer/Ven : Marche 45 min.\nMar/Jeu : Circuit A & B (3x12 reps).\nSam : 1h vélo/natation.",
    stepsGoal: 8000, sleepGoal: "7h30", waistChange: "-2 cm",
  },
  {
    week: 2, phase: 1, weightMin: 102, weightMax: 103,
    calories: 2200, water: 2.5,
    nutritionRule: "Varier les viandes (canard, veau) et légumes (choux, fenouil).",
    sport: "Marche : 50 min.\nMuscu : Circuit A & B (3x15 reps).\nSam : 1h15 rando.",
    stepsGoal: 8500, sleepGoal: "7h30", waistChange: "-2 cm",
  },
  {
    week: 3, phase: 1, weightMin: 101, weightMax: 102,
    calories: 2150, water: 2.5,
    nutritionRule: "Supprimer les féculents le soir (sauf si sport effectué le jour-même).",
    sport: "Marche : 45 min avec intervalles (5 min rapide / 3 min normale).\nMuscu : 4 tours (3x15).\nSam : 1h natation.",
    stepsGoal: 9000, sleepGoal: "7h30", waistChange: "-2 cm",
  },
  {
    week: 4, phase: 1, weightMin: 100, weightMax: 101,
    calories: 2150, water: 2.5,
    nutritionRule: "Ajouter 1/2 avocat le midi. Réduire les féculents midi à 130g.",
    sport: "Marche : 55 min.\nMuscu : Circuit A & B (3x18 reps).\nSam : 1h30 marche rapide.",
    stepsGoal: 9000, sleepGoal: "7h30", waistChange: "-2 cm",
  },
  {
    week: 5, phase: 2, weightMin: 98, weightMax: 99,
    calories: 2100, water: 2.6,
    nutritionRule: "Glucides uniquement au déjeuner. Remplacer le pain du matin par flocons d'avoine.",
    sport: "Lun/Mer/Ven : Marche rapide 45 min + 10 min gainage.\nMar/Jeu : Circuit A & B (4x15 reps).\nSam : 1h vélo + 20 min renfo.",
    stepsGoal: 9500, sleepGoal: "7h30", waistChange: "-3 cm",
  },
  {
    week: 6, phase: 2, weightMin: 97, weightMax: 98,
    calories: 2100, water: 2.6,
    nutritionRule: "Doubler les légumes verts à chaque repas pour caler la faim.",
    sport: "Marche : 50 min inclinée ou côtes.\nMuscu : 4x18 reps, repos réduit à 30s.\nSam : 1h natation.",
    stepsGoal: 10000, sleepGoal: "7h30", waistChange: "-2 cm",
  },
  {
    week: 7, phase: 2, weightMin: 96, weightMax: 97,
    calories: 2000, water: 2.7,
    nutritionRule: "Protéines à 190g/jour (rajouter 1 oeuf ou 30g de whey si besoin).",
    sport: "Cardio : 3x/sem. 40 min (Vélo ou Rameur).\nMuscu : Ajouter Tractions australiennes.\nSam : Randonnée 1h30.",
    stepsGoal: 10000, sleepGoal: "8h", waistChange: "-2 cm",
  },
  {
    week: 8, phase: 2, weightMin: 95, weightMax: 96,
    calories: 2000, water: 2.7,
    nutritionRule: "Dîner 100% protéines + légumes (0 féculents).",
    sport: "Cardio : 3x/sem. 45 min (Seuil).\nMuscu : 5 tours (4x15) + gainage 1min.\nSam : 1h30 marche + footing léger 10 min.",
    stepsGoal: 10500, sleepGoal: "8h", waistChange: "-2 cm",
  },
  {
    week: 9, phase: 3, weightMin: 94, weightMax: 95,
    calories: 2000, water: 2.8,
    nutritionRule: "Carb cycling : légumes uniquement le soir. Féculents complets uniquement midi.",
    sport: "Lun : 55 min Marche.\nMar : Séance A (Squats 4x12, Fentes, Soulevé).\nJeu : Séance B (Pompes + Rowing + Épaules).\nSam : 1h30 Vélo ou Boxe.",
    stepsGoal: 10500, sleepGoal: "8h", waistChange: "-2 cm",
  },
  {
    week: 10, phase: 3, weightMin: 93, weightMax: 94,
    calories: 1950, water: 2.8,
    nutritionRule: "Augmenter les bonnes graisses (huile de lin / poissons gras) pour la satiété.",
    sport: "Cardio : 2x/sem. (Mer/Ven) 50 min fractionné (30s sprint / 1min repos).\nMuscu : 3 séances/sem. (Lun/Mar/Jeu).",
    stepsGoal: 11000, sleepGoal: "8h", waistChange: "-1 cm",
  },
  {
    week: 11, phase: 3, weightMin: 92, weightMax: 93,
    calories: 1950, water: 2.8,
    nutritionRule: "Repas plaisir décalé : le samedi soir (évite de grignoter le dimanche).",
    sport: "10 000 pas obligatoires / jour (descendre 2 arrêts de bus plus tôt).\nSéances : 45 min muscu pure (3x12 à échec).",
    stepsGoal: 11000, sleepGoal: "8h", waistChange: "-1 cm",
  },
  {
    week: 12, phase: 3, weightMin: 91, weightMax: 92,
    calories: 1950, water: 2.8,
    nutritionRule: "Batch cooking : préparer les repas à l'avance pour éviter les écarts de fin de parcours.",
    sport: "Semaine de pic : 4 séances (Lun, Mar, Jeu, Sam).\nDim : Repos total (massage ou étirements).",
    stepsGoal: 11000, sleepGoal: "8h", waistChange: "-1 cm",
  },
];

export const PHASE_NAMES: Record<Phase, string> = {
  1: "Adaptation",
  2: "Accélération",
  3: "Sculptage",
};

export const PHASE_COLORS: Record<Phase, string> = {
  1: "#2563EB",
  2: "#EA580C",
  3: "#16A34A",
};

export const WORKOUT_SESSIONS = [
  {
    name: "Séance A – Bas du corps",
    exercises: ["Squats (prise large)", "Fentes alternées", "Hip Thrust (Pont)", "Gainage avant"],
  },
  {
    name: "Séance B – Haut / Cardio",
    exercises: ["Pompes inclinées", "Rowing (élastique ou haltères)", "Mountain Climbers", "Gainage latéral"],
  },
];

export const MENUS = [
  {
    meal: "Petit-déjeuner",
    description: "3 oeufs + 80g pain complet + 1 fruit",
    note: "A partir de S5 : remplacer le pain par flocons d'avoine",
  },
  {
    meal: "Déjeuner",
    description: "200g viande/poisson + 150g féculents + légumes + 1 cs huile d'olive",
    note: "130g féculents à partir de S4",
  },
  {
    meal: "Dîner",
    description: "200g protéines + légumes à volonté",
    note: "+100g féculents uniquement Phase 1 ou si sport effectué le jour-même",
  },
];
