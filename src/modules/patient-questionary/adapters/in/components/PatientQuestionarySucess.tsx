import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function PatientQuestionarySuccess() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✓</Text>
        <Text style={styles.title}>¡Felicitaciones!</Text>
        <Text style={styles.message}>El formulario fue guardado exitosamente.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3dbf82',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 48,
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 56,
    color: '#3dbf82',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3dbf82',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#5a6a7a',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default PatientQuestionarySuccess;
