import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { IngredientType } from 'src/shared/constants';
import { Meal, ReduxStates } from 'src/shared/types/types';

function NutritionalMealItem({ nutritonalMeal, index }: { nutritonalMeal: Meal; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const handlePress = () => {
    setExpanded(!expanded);
  };
  const isLastSurface = index === patientPlansState.length - 1;

  return (
    <>
      <Surface style={{ ...styles.card, ...(isLastSurface && styles.lastSurface) }} elevation={5}>
        <List.Accordion
          id={nutritonalMeal._id}
          title={`${nutritonalMeal.name}`}
          style={{ ...styles.accordion }}
          titleStyle={{ width: 300, fontWeight: 'bold', color: '#84e0d2' }}
          expanded={expanded}
          onPress={handlePress}
          right={(props) => <List.Icon {...props} icon={expanded ? 'chevron-up' : 'chevron-down'} color="white" />}
        >
          {expanded && (
            <>
              <List.Item title={nutritonalMeal.mealTag} titleStyle={{ color: 'white' }} />
              {nutritonalMeal.ingredientDetails.map((ingredientDetail, index2) => {
                const ingredientAmount =
                  ingredientDetail.ingredientType === IngredientType.UNIQUE_INGREDIENT
                    ? ingredientDetail.ingredient?.amount
                    : ingredientDetail.customIngredient?.amount;
                const ingredientName =
                  ingredientDetail.ingredientType === IngredientType.UNIQUE_INGREDIENT
                    ? ingredientDetail.ingredient?.name
                    : ingredientDetail.customIngredient?.name;
                const ingredientLabel =
                  ingredientDetail.ingredientType === IngredientType.UNIQUE_INGREDIENT
                    ? ingredientDetail.ingredient?.label
                    : ingredientDetail.customIngredient?.label;
                return <Text style={styles.text} key={index2}>{`${ingredientAmount} ${ingredientLabel} ${ingredientName}`}</Text>;
              })}
              <Text
                style={styles.text}
              >{`${nutritonalMeal.cookingInstructions.length ? 'Directions:' : ''} ${nutritonalMeal.cookingInstructions}`}</Text>
            </>
          )}
        </List.Accordion>
        {/* {!expanded &&
          nutritonalMeal.meals.map((meal, indexMeal) => {
            const isLastItem = indexMeal === nutritonalMeal.meals.length - 1;

            return (
              <>
                <List.Item titleStyle={{ color: 'white' }} style={{ ...(isLastItem && styles.lastItem) }} title={meal.mealTag} />
              </>
            );
          })} */}
      </Surface>
    </>
  );
}

export default NutritionalMealItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  accordion: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#323232',
  },
  text: {
    margin: 'auto',
    paddingLeft: 25,
    width: 300,
    color: 'white',
  },

  lastItem: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  lastSurface: {
    marginBottom: 36,
  },
});
