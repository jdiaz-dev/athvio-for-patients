import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import {
  GET_QUESTIONARY_FOR_PATIENT,
  UPDATE_PATIENT_QUESTIONARY_ANSWERS,
} from 'src/modules/patient-questionary/adapters/out/patientQuestionaryQueries';
import * as PatientQuestionarySlice from 'src/modules/patient-questionary/adapters/in/slicers/PatientQuestionarySlice';
import {
  GetPatientQuestionaryBody,
  GetPatientQuestionaryRequest,
  GetPatientQuestionaryResponse,
  UpdateAnswersInput,
  UpdatePatientQuestionaryAnswersRequest,
  UpdatePatientQuestionaryAnswersResponse,
} from 'src/modules/patient-questionary/adapters/out/patient-questionary';

export function usePatientQuestionary() {
  const dispatch = useDispatch();

  const getQuestionaryForPatient = async (body: GetPatientQuestionaryBody): Promise<void> => {
    try {
      const response = await apolloClient.query<GetPatientQuestionaryResponse, GetPatientQuestionaryRequest>({
        query: GET_QUESTIONARY_FOR_PATIENT,
        variables: {
          input: { ...body },
        },
      });
      if (response.data) dispatch(PatientQuestionarySlice.initializePatientQuestionary(response.data.getQuestionaryForPatient));
    } catch (error) {
      dispatch(PatientQuestionarySlice.initializePatientQuestionaryError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  const updatePatientQuestionaryAnswers = async (body: UpdateAnswersInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePatientQuestionaryAnswersResponse, UpdatePatientQuestionaryAnswersRequest>(
        {
          mutation: UPDATE_PATIENT_QUESTIONARY_ANSWERS,
          variables: {
            input: { ...body },
          },
        },
      );
    } catch (error) {
      dispatch(PatientQuestionarySlice.initializePatientQuestionaryError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  return { getQuestionaryForPatient, updatePatientQuestionaryAnswers };
}
