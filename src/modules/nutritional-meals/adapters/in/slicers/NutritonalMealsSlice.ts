import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nutritionalMealsInitialState } from 'src/modules/nutritional-meals/adapters/in/slicers/NutritionalMealsInitialState';
import { Meal } from 'src/shared/types/types';

const nutritonalMealsSlice = createSlice({
  name: 'nutritionalMeals',
  initialState: nutritionalMealsInitialState,
  reducers: {
    initializeNutritionalMeals: (state, action: PayloadAction<Meal[]>) => {
      state.nutritionalMeals.data = action.payload;
      return state;
    },
    initializeNutritonalMealsError(state, action: PayloadAction<string>) {
      state.nutritionalMeals.error = action.payload;
      return state;
    },
  },
});

export const { initializeNutritionalMeals, initializeNutritonalMealsError } = nutritonalMealsSlice.actions;

export default nutritonalMealsSlice.reducer;
