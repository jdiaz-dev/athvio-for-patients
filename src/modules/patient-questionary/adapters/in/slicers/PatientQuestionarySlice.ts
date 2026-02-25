import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit';
import { patientQuestionaryInitialState } from 'src/modules/patient-questionary/adapters/in/slicers/PatientQuestionaryInitialState';
import { PatientQuestionaryBody } from 'src/modules/patient-questionary/adapters/out/patient-questionary';

const patientQuestionarySlice = createSlice({
  name: 'patientQuestionary',
  initialState: patientQuestionaryInitialState.patientQuestionary,
  reducers: {
    initializePatientQuestionary: (state, action: PayloadAction<PatientQuestionaryBody>) => {
      state.data = action.payload;
      return state;
    },
    initializePatientQuestionaryError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
  },
});

export const { initializePatientQuestionary, initializePatientQuestionaryError } = patientQuestionarySlice.actions;

const patientQuestionaryAnswersSlice = createSlice({
  name: 'patientQuestionaryAnswers',
  initialState: patientQuestionaryInitialState.patientQuestionaryAnswers,
  reducers: {
    initializePatientQuestionaryAnswers: (state, action: PayloadAction<PatientQuestionaryBody>) => {
      // state.data = action.payload;
      return state;
    },
    initializePatientQuestionaryAnswersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
  },
});

export const { initializePatientQuestionaryAnswers, initializePatientQuestionaryAnswersError } =
  patientQuestionaryAnswersSlice.actions;

export default combineReducers({
  patientQuestionary: patientQuestionarySlice.reducer,
  patientQuestionaryAnswers: patientQuestionaryAnswersSlice.reducer,
});
