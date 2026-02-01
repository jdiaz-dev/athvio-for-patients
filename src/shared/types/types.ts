import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthInitialState } from 'src/modules/auth/adapters/out/auth';
import { ChatInitialState } from 'src/modules/chat/adapters/out/chat';
import { NutritionalMealsInitialState } from 'src/modules/nutritional-meals/adapters/out/nutritional-meals';
import { PatientPlanInitialState } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { PatientProgramsInitialState } from 'src/modules/patient-programs/adapters/out/patient-program';
import { IngredientType } from 'src/shared/constants';

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
  uuid: string;
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
  image: string | null;
};

export interface Meal extends MealBasicInfo, MealDetails {}

export type ReduxStates = {
  chat: ChatInitialState;
  patientPlans: PatientPlanInitialState;
  nutritionalMeals: NutritionalMealsInitialState;
  patientPrograms: PatientProgramsInitialState;
  auth: AuthInitialState;
};

export type ScreenParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Navigation: { tabTitle: string };
};
export type SignInScreenNavigationProp = NativeStackNavigationProp<ScreenParamList, 'SignIn'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<ScreenParamList, 'SignUp'>;
export type NavigationScreenNavigationProp = NativeStackNavigationProp<ScreenParamList, 'Navigation'>;
