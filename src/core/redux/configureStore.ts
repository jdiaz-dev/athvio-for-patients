import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from 'src/modules/auth/adapters/in/slicers/AuthSlice';
import ChatReducer from 'src/modules/chat/adapters/in/slicers/ChatSlice';
import PatienPlansReducer from 'src/modules/patient-plans/adapters/in/slicers/PatientPlanSlice';
import NutritionalMealsReducer from 'src/modules/nutritional-meals/adapters/in/slicers/NutritonalMealsSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    patientPlans: PatienPlansReducer,
    chat: ChatReducer,
    nutritionalMeals: NutritionalMealsReducer,
  },
  devTools: true,
});
