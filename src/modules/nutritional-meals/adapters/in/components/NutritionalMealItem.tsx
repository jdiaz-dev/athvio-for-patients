import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { IngredientType } from 'src/shared/constants';
import { ReduxStates } from 'src/shared/types/types';
import { Image } from 'react-native';
import { NutritionalMeal } from 'src/modules/nutritional-meals/adapters/out/nutritional-meals';

function NutritionalMealItem({ nutritonalMeal, index }: { nutritonalMeal: NutritionalMeal; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const handlePress = () => {
    setExpanded(!expanded);
  };
  const isLastSurface = index === patientPlansState.length - 1;
  const image = (
    <Image
      source={{
        uri: nutritonalMeal.image,
      }}
      style={{
        height: 180,
      }}
    />
  );
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
                return (
                  <Text style={styles.text} key={index2}>
                    - {`${ingredientAmount} ${ingredientLabel} ${ingredientName}`}
                  </Text>
                );
              })}
              <Text>{'\n'}</Text>
              <Text
                style={styles.text}
              >{`${nutritonalMeal.cookingInstructions.length ? 'Directions:' : ''} ${nutritonalMeal.cookingInstructions}`}</Text>
              <Text>{'\n'}</Text>
              <Text
                style={styles.text}
              >{`${nutritonalMeal.healthBenefits?.length ? 'Health benefits:' : ''} ${nutritonalMeal.healthBenefits}`}</Text>
              <View style={{ padding: '6%' }}>{image}</View>
            </>
          )}
        </List.Accordion>
        {!expanded && image}
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
    paddingLeft: '5%',
    paddingRight: '3%',
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
