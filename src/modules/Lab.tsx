import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList, Text } from 'react-native';
import { List, Surface } from 'react-native-paper';

const ActivityList = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activities = [
    {
      id: '1',
      date: 'Wed, Dec 25',
      exercises: [
        { name: 'Push-Up', icon: 'weight-lifter' },
        { name: 'Arm Bar', icon: 'arm-flex' },
        { name: 'Arm Hug', icon: 'heart-outline' },
        { name: 'Arm Swing', icon: 'gesture-swipe-horizontal' },
      ],
    },
    {
      id: '2',
      date: 'Thu, Dec 26',
      exercises: [
        { name: 'Push-Up', icon: 'weight-lifter' },
        { name: 'Arm Bar', icon: 'arm-flex' },
        { name: 'Arm Hug', icon: 'heart-outline' },
        { name: 'Arm Swing', icon: 'gesture-swipe-horizontal' },
      ],
    },
    {
      id: '3',
      date: 'Fri, Dec 27',
      exercises: [{ name: 'Push-Up', icon: 'weight-lifter' }],
    },
  ];

  const handlePress = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderAccordion = ({ item }: { item: (typeof activities)[0] }) => (
    <Surface key={item.id} style={styles.card}>
      <List.Accordion
        id={item.id}
        title={item.date}
        titleStyle={styles.date}
        expanded={expandedId === item.id}
        onPress={() => handlePress(item.id)}
        style={styles.accordion}
        right={(props) => <List.Icon {...props} icon={expandedId === item.id ? 'chevron-up' : 'chevron-down'} color="white" />}
      >
        {item.exercises.map((exercise, idx) => (
          <View key={idx} style={styles.exerciseContainer}>
            <List.Icon icon={exercise.icon} color="white" />
            <Text style={styles.exercise}>{exercise.name}</Text>
          </View>
        ))}
      </List.Accordion>
    </Surface>
  );

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={renderAccordion}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden', // Ensures child elements don't exceed borders
  },
  accordion: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 0,
    margin: 0, // Removes extra spacing
    elevation: 0, // Removes shadow effect, if any
  },
  date: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginTop: 10,
  },
  exercise: {
    color: '#BDBDBD',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default ActivityList;
