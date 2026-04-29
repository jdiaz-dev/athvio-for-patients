import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const APP_DOWNLOAD_URL = process.env.EXPO_PUBLIC_PATIENT_APP_DOWNLOAD_URL;

export default function Congratulations() {
  const theme = useTheme();

  const handleDownload = async () => {
    if (APP_DOWNLOAD_URL) {
      const supported = await Linking.canOpenURL(APP_DOWNLOAD_URL);
      if (supported) {
        await Linking.openURL(APP_DOWNLOAD_URL);
      } else {
        console.warn('Cannot open URL:', APP_DOWNLOAD_URL);
      }
    } else {
      console.warn('APP_DOWNLOAD_URL is not defined');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.card} elevation={4}>
        {/* Check icon circle */}
        <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary + '22' }]}>
          <MaterialCommunityIcons name="check-circle" size={40} color={theme.colors.primary} />
        </View>

        {/* Title */}
        <Text variant="headlineSmall" style={styles.title}>
          ¡Felicitaciones!
        </Text>

        {/* Body */}
        <Text variant="bodyMedium" style={styles.body}>
          Tu cuenta ha sido activada correctamente.{'\n'}
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    borderRadius: 999,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
});
