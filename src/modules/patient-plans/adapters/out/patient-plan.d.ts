import { IngredientType } from "src/modules/patient-plans/adapters/out/enum";

export interface Macros {
  weightInGrams: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Ingredient extends Macros {
  amount: number;
  name: string;
  label: string;
}
export interface DisplayedIngredient extends Ingredient {
  ingredientType: IngredientType;
}
export interface CustomIngredient {
  amount: number;
  name: string;
  label: string;
  ingredients: Ingredient[];
  macros: Macros;
}

interface Equivalent {
  ingredientType: IngredientType;
  customIngredient?: CustomIngredient;
  ingredient?: Ingredient;
}

export interface IngredientDetail extends Equivalent {
  equivalents: Equivalent[];
}

export type GetRecordsBody = {
  offset: number;
  limit: number;
  search?: string[];
};

export type MetadataRecords = {
  total: number;
  offset: number;
  limit: number;
};

export type MealBasicInfo = {
  position: number;
  mealTag: string;
  name: string;
};

export type MealDetails = {
  _id: string;
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
};

export interface Meal extends MealBasicInfo, MealDetails {}

export type Plan = {
  _id: string;
  title?: string;
  week: number;
  day: number;
  meals: Meal[];
};

export type PatientPlanBody = Plan & {
  patient: string;
  assignedDate: string;
  // comments
  // commentResult
};

export type GetRecordsPatientPlansBody = GetRecordsBody & {
  patient: string;
};

export type GetPatientPlansRequest = {
  patientPlans: GetRecordsPatientPlansBody;
};

export type PatientPlans = {
  data: PatientPlanBody[];
  meta: MetadataRecords;
};

export type GetPatientPlansResponse = {
  getPatientPlansForMobile: PatientPlanBody[];
};

export interface PatientPlanInitialState {
  patientPlans: { data: PatientPlanBody[]; error: string | null };
}
