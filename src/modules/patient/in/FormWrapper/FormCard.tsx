import React from 'react';
import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { Surface } from 'react-native-paper';

interface AuthCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const FormCard = ({ children, style }: AuthCardProps) => {
  const { width } = useWindowDimensions();
  const maxWidth = width >= 1200 ? 475 : 400;
  const margin = width >= 900 ? 24 : 20;
  const padding = width >= 1536 ? 40 : width >= 900 ? 32 : width >= 600 ? 24 : 16;

  return (
    <Surface style={[styles.surface, { maxWidth, margin, padding }, style]} elevation={2}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 12,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },
});

export default FormCard;
