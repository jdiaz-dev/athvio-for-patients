import { gql } from '@apollo/client';

export const GET_QUESTIONARY_FOR_PATIENT = gql`
  query _getQuestionaryForPatient($input: GetQuestionaryForPatientDto!) {
    getQuestionaryForPatient(input: $input) {
      uuid
      patient
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          uuid
          fieldName
          isEnabled
          associatedQuestion
          answer
        }
      }
    }
  }
`;

export const UPDATE_PATIENT_QUESTIONARY_ANSWERS = gql`
  mutation _updatePatientQuestionaryAnswers($input: UpdateAnswersDto!) {
    updatePatientQuestionaryAnswers(input: $input) {
      uuid
      patient
      professional
      questionaryGroups {
        uuid
        title
        description
        questionaryDetails {
          uuid
          fieldName
          isEnabled
          associatedQuestion
          answer
        }
      }
    }
  }
`;
