import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Switch, Text, useTheme } from 'react-native-paper';
import { useAppTheme } from '../theme/ThemeContext';

export default function ThemeToggle() {
  const paperTheme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <View style={{ ...styles.container }}>
      <Card style={[{ backgroundColor: paperTheme.colors.surface }]}>
        <Card.Content style={styles.row}>
          <Text variant="titleMedium" style={{ color: paperTheme.colors.onSurface }}>
            Dark mode
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} color={paperTheme.colors.primary} />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
