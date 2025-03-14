import { configureStore } from '@reduxjs/toolkit';

import ChatReducer from 'src/modules/chat/adapters/in/slicers/ChatSlice';
import PatienPlansReducer from 'src/modules/patient-plans/adapters/in/slicers/PatientPlanSlice';
import NutritionalMealsReducer from 'src/modules/nutritional-meals/adapters/in/slicers/NutritonalMealsSlice';

export default configureStore({
  reducer: {
    chat: ChatReducer,
    patientPlans: PatienPlansReducer,
    nutritionalMeals: NutritionalMealsReducer,
  },
  devTools: true,
});
