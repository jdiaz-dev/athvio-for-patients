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
    savePatientQuestionaryDetail: (
      state,
      action: PayloadAction<{ questionaryGroup: string; patientQuestionaryDetail: string; answer: string }>,
    ) => {
      const group = state.data.questionaryGroups.find((group) => group.uuid === action.payload.questionaryGroup);
      if (group) {
        const detail = group.questionaryDetails.find((detail) => detail.uuid === action.payload.patientQuestionaryDetail);
        if (detail) {
          detail.answer = action.payload.answer;
        }
      }
      return state;
    },
    initializePatientQuestionaryError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      return state;
    },
  },
});

export const { initializePatientQuestionary, savePatientQuestionaryDetail, initializePatientQuestionaryError } =
  patientQuestionarySlice.actions;

export default combineReducers({
  patientQuestionary: patientQuestionarySlice.reducer,
});
