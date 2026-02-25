import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  PatientQuestionaryDetail,
  PatientQuestionaryGroup,
} from 'src/modules/patient-questionary/adapters/out/patient-questionary';

import { usePatientQuestionary } from 'src/modules/patient-questionary/adapters/out/PatientQuestionaryActions';
import { ReduxStates } from 'src/shared/types/types';

const QUESTIONS_PER_PAGE = 5;

function PatientQuestionary() {
  const { getQuestionaryForPatient } = usePatientQuestionary();

  const { data: patientQuestionaryState, error } = useSelector(
    (state: ReduxStates) => state.patientQuestionary.patientQuestionary,
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentPageInGroup, setCurrentPageInGroup] = useState(0);
  const route = useRoute();

  useEffect(() => {
    const { patient, professional, patientQuestionary } = route.params as {
      patient: string;
      professional: string;
      patientQuestionary: string;
    };
    if (patient && professional && patientQuestionary) {
      getQuestionaryForPatient({
        patient,
        professional,
        patientQuestionary,
      });
    }
  }, []);

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
  const allDetails: PatientQuestionaryDetail[] = currentGroup.questionaryDetails;
  const totalPages = Math.ceil(allDetails.length / QUESTIONS_PER_PAGE);
  const pageStart = currentPageInGroup * QUESTIONS_PER_PAGE;
  const visibleDetails = allDetails.slice(pageStart, pageStart + QUESTIONS_PER_PAGE);

  const isLastPageInGroup = currentPageInGroup >= totalPages - 1;
  const isLastGroup = currentGroupIndex >= groups.length - 1;
  const isVeryLast = isLastPageInGroup && isLastGroup;

  const handleContinuar = () => {
    if (!isLastPageInGroup) {
      setCurrentPageInGroup((p) => p + 1);
    } else if (!isLastGroup) {
      setCurrentGroupIndex((g) => g + 1);
      setCurrentPageInGroup(0);
    } else {
      // TODO: submit answers
      console.log('Final answers:', answers);
    }
  };

  const handleRetroceder = () => {
    if (currentPageInGroup > 0) {
      setCurrentPageInGroup((p) => p - 1);
    } else if (currentGroupIndex > 0) {
      const prevGroup = groups[currentGroupIndex - 1];
      const prevGroupTotalPages = Math.ceil(prevGroup.questionaryDetails.length / QUESTIONS_PER_PAGE);
      setCurrentGroupIndex((g) => g - 1);
      setCurrentPageInGroup(prevGroupTotalPages - 1);
    }
  };

  const canGoBack = currentGroupIndex > 0 || currentPageInGroup > 0;

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.groupTitle}>{currentGroup.title}</Text>
          {currentGroup.description ? <Text style={styles.groupDescription}>{currentGroup.description}</Text> : null}

          {visibleDetails.map((detail: PatientQuestionaryDetail) => (
            <View key={detail.uuid} style={styles.questionBlock}>
              <Text style={styles.questionLabel}>{detail.associatedQuestion}</Text>
              <TextInput
                style={styles.input}
                placeholder={detail.fieldName}
                placeholderTextColor="#b0b8c1"
                value={answers[detail.uuid] ?? detail.answer ?? ''}
                onChangeText={(text) => setAnswers((prev) => ({ ...prev, [detail.uuid]: text }))}
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
              <Text style={styles.continueButtonText}>{isVeryLast ? 'Finalizar' : 'Continuar'}</Text>
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
