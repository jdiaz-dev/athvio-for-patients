import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, ListRenderItem, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/auth/adapters/in/context/AuthContext';
import { ReduxStates } from 'src/shared/types/types';
import { useNutritionalMeals } from 'src/modules/nutritional-meals/adapters/out/NutritionalMealsActions';
import NutritionalMealItem from 'src/modules/nutritional-meals/adapters/in/components/NutritionalMealItem';
import { NutritionalMeal } from 'src/modules/nutritional-meals/adapters/out/nutritional-meals';
import MessageSnackbar from 'src/shared/components/MessageSnackbar';
import { Ionicons } from '@expo/vector-icons'; // for arrows

const CATEGORIES = ['Desserts', 'Dressings, dips and sauces'];

const renderItem: ListRenderItem<NutritionalMeal> = ({ item, index }) => (
  <NutritionalMealItem nutritonalMeal={item} index={index} />
);

function NutritionalMealList() {
  const { patient } = useContext(AuthContext);
  const { getNutritionalMeals } = useNutritionalMeals();
  const { data: nutritionalMealsState, error } = useSelector((state: ReduxStates) => state.nutritionalMeals.nutritionalMeals);

  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchNutritonalMeals = async () => {
      if (patient) {
        const input = {
          patient,
          offset: 0,
          limit: 30,
          category: selectedCategory,
        };
        await getNutritionalMeals(input);
      }
    };
    fetchNutritonalMeals();
  }, [patient, selectedCategory]);

  const scrollLeft = () => scrollRef.current?.scrollTo({ x: 0, animated: true });
  const scrollRight = () => scrollRef.current?.scrollToEnd({ animated: true });

  return (
    <>
      <View style={styles.tabsWrapper}>
        <TouchableOpacity onPress={scrollLeft}>
          <Ionicons name="chevron-back-circle-outline" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={styles.tabsContainer}
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[styles.tab, isActive && styles.activeTab]}
              >
                <Text style={[styles.tabText]}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity onPress={scrollRight}>
          <Ionicons name="chevron-forward-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={nutritionalMealsState || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.uuid}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        />
      </View>

      <MessageSnackbar error={error} />
    </>
  );
}

export default NutritionalMealList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#121212',
  },
  tabsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c9687',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  activeTab: {
    backgroundColor: '#065ba0',
    borderWidth: 0,
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
