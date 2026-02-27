import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  PatientQuestionaryDetail,
  PatientQuestionaryGroup,
} from 'src/modules/patient-questionary/adapters/out/patient-questionary';
import { saveAnwser } from 'src/modules/patient-questionary/adapters/in/slicers/PatientQuestionarySlice';
import { usePatientQuestionary } from 'src/modules/patient-questionary/adapters/out/PatientQuestionaryActions';
import { ReduxStates } from 'src/shared/types/types';

function PatientQuestionary() {
  const dispatch = useDispatch();
  const { getQuestionaryForPatient } = usePatientQuestionary();

  const { data: patientQuestionaryState, error } = useSelector(
    (state: ReduxStates) => state.patientQuestionary.patientQuestionary,
  );

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>({});
  const route = useRoute();

  useEffect(() => {
    const { patient, professional, patientQuestionary } = route.params as {
      patient: string;
      professional: string;
      patientQuestionary: string;
    };
    if (patient && professional && patientQuestionary) {
      getQuestionaryForPatient({ patient, professional, patientQuestionary });
    }
  }, []);

  const handleAnswerChange = (detailUuid: string, answer: string) => {
    setLocalAnswers((prev) => ({ ...prev, [detailUuid]: answer }));
  };

  const dispatchGroupAnswers = (group: PatientQuestionaryGroup) => {
    group.questionaryDetails.forEach((detail) => {
      const answer = localAnswers[detail.uuid];
      if (answer !== undefined) {
        dispatch(
          saveAnwser({
            questionaryGroup: group.uuid,
            patientQuestionaryDetail: detail.uuid,
            answer,
          }),
        );
      }
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!patientQuestionaryState) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Cargando cuestionario...</Text>
      </View>
    );
  }

  const groups = patientQuestionaryState.questionaryGroups;
  if (!groups || groups.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>No hay preguntas disponibles.</Text>
      </View>
    );
  }

  const currentGroup: PatientQuestionaryGroup = groups[currentGroupIndex];
  const isLastGroup = currentGroupIndex >= groups.length - 1;
  const canGoBack = currentGroupIndex > 0;

  const handleContinuar = () => {
    dispatchGroupAnswers(currentGroup);
    if (!isLastGroup) {
      setCurrentGroupIndex((g) => g + 1);
      setLocalAnswers({});
    } else {
      // TODO: submit final answers
      console.log('Finalizar');
    }
  };

  const handleRetroceder = () => {
    if (currentGroupIndex > 0) {
      dispatchGroupAnswers(currentGroup);
      setCurrentGroupIndex((g) => g - 1);
      setLocalAnswers({});
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.groupTitle}>{currentGroup.title}</Text>
          {currentGroup.description ? <Text style={styles.groupDescription}>{currentGroup.description}</Text> : null}

          {currentGroup.questionaryDetails.map((detail: PatientQuestionaryDetail) => (
            <View key={detail.uuid} style={styles.questionBlock}>
              <Text style={styles.questionLabel}>{detail.associatedQuestion}</Text>
              <TextInput
                style={styles.input}
                placeholder={detail.fieldName}
                placeholderTextColor="#b0b8c1"
                value={localAnswers[detail.uuid] ?? detail.answer ?? ''}
                onChangeText={(text) => handleAnswerChange(detail.uuid, text)}
                multiline
              />
            </View>
          ))}

          <View style={styles.buttonRow}>
            {canGoBack ? (
              <TouchableOpacity style={styles.backButton} onPress={handleRetroceder}>
                <Text style={styles.backButtonText}>Retroceder</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonPlaceholder} />
            )}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
              <Text style={styles.continueButtonText}>{isLastGroup ? 'Finalizar' : 'Continuar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#3dbf82',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    width: '100%',
    maxWidth: 740,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  groupTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#3dbf82',
    textAlign: 'center',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
    color: '#7a8899',
    textAlign: 'center',
    marginBottom: 24,
  },
  questionBlock: {
    marginBottom: 24,
  },
  questionLabel: {
    fontSize: 14,
    color: '#3a4a5a',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d8e0ea',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: '#3a4a5a',
    minHeight: 80,
    backgroundColor: '#fafbfc',
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonPlaceholder: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c0cdd8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    color: '#5a6a7a',
    fontSize: 15,
    fontWeight: '500',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#f0a06a',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3dbf82',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
});

export default PatientQuestionary;
