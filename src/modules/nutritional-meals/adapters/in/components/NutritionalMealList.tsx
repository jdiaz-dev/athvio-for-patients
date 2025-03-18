import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, ListRenderItem, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { ReduxStates } from 'src/shared/types/types';
import { useNutritionalMeals } from 'src/modules/nutritional-meals/adapters/out/NutritionalMealsActions';
import NutritionalMealItem from 'src/modules/nutritional-meals/adapters/in/components/NutritionalMealItem';
import { NutritionalMeal } from 'src/modules/nutritional-meals/adapters/out/nutritional-meals';

const renderItem: ListRenderItem<NutritionalMeal> = ({ item, index }) => {
  return <NutritionalMealItem nutritonalMeal={item} index={index} />;
};

function NutritionalMealList() {
  const { patient } = useContext(AuthContext);
  const { getNutritionalMeals } = useNutritionalMeals();
  const { data: nutritionalMealsState, error } = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

  useEffect(() => {
    const fetchNutritonalMeals = async () => {
      if (patient) {
        const input = {
          patient,
          offset: 0,
          limit: 30,
        };
        await getNutritionalMeals(input);
      }
    };
    fetchNutritonalMeals();
  }, [patient]);

  return (
    <View style={{ flex: 1 }}>
      <Text>{nutritionalMealsState.length}</Text>
      <Text>{nutritionalMealsState.length ? nutritionalMealsState.length : 'nothing'}</Text>
      {error !== null && <Text>{error}</Text>}

      <FlatList
        data={nutritionalMealsState || []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      />
    </View>
  );
}

export default NutritionalMealList;

// Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2c9687',
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#6A1B9A',
  },
});
