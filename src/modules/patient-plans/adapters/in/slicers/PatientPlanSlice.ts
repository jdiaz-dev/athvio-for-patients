import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { patientPlanInitialState } from 'src/modules/patient-plans/adapters/in/slicers/PatienPlanInitialState';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';

const patientPlansSlice = createSlice({
  name: 'patientPlans',
  initialState: patientPlanInitialState,
  reducers: {
    initializePatientPlans: (state, action: PayloadAction<PatientPlanBody[]>) => {
      state.patientPlans.data = action.payload;
      return state;
    },
    initializePatientPlansError(state, action: PayloadAction<string>) {
      state.patientPlans.error = action.payload;
      return state;
    },
  },
});

export const { initializePatientPlans, initializePatientPlansError } = patientPlansSlice.actions;

export default patientPlansSlice.reducer;
