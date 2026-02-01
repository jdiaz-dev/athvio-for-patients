import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { patientProgramsInitialState } from 'src/modules/patient-programs/adapters/in/slicers/PatientProgramsInitialState';
import { PatientProgram } from 'src/modules/patient-programs/adapters/out/patient-program';

const patientProgramsSlice = createSlice({
  name: 'patientPrograms',
  initialState: patientProgramsInitialState,
  reducers: {
    initializePatientPrograms: (state, action: PayloadAction<PatientProgram[]>) => {
      state.patientPrograms.data = action.payload;
      return state;
    },
    initializePatientProgramsError(state, action: PayloadAction<string>) {
      state.patientPrograms.error = action.payload;
      return state;
    },
  },
});

export const { initializePatientPrograms, initializePatientProgramsError } = patientProgramsSlice.actions;

export default patientProgramsSlice.reducer;
