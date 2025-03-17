import { GetRecordsBody, Meal, MetadataRecords } from 'src/shared/types/types';

export type GetNutritionalMealsBody = GetRecordsBody & {
  patient: string;
};

export type GetNutritionalMealsRequest = {
  input: GetNutritionalMealsBody;
};

export type NutritionalMeal = Meal & {
  image: string;
};

export type NutritonalMeals = {
  data: NutritionalMeal[];
  meta: MetadataRecords;
};

export type GetNutritionalMealsResponse = {
  getNutritionalMealsForPatient: NutritonalMeals;
};

export type NutritionalMealsInitialState = {
  nutritionalMeals: { data: Meal[]; error: string | null };
};
