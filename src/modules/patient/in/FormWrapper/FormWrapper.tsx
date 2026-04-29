import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import FormCard from './FormCard';

interface Props {
  children: ReactNode;
}

const FormWrapper = ({ children }: Props) => (
  <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
    {/* Logo */}
    <View style={styles.logoContainer}>{/* <Logo /> */}</View>

    <View style={styles.cardContainer}>
      <FormCard>{children}</FormCard>
    </View>

    
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    marginTop: 24,
    marginLeft: 24,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  footerContainer: {
    margin: 24,
    marginTop: 8,
  },
});

export default FormWrapper;
