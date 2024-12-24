import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import { IngredientType } from 'src/modules/patient-plans/adapters/out/enum';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';

function PatientPlanItem({ patientPlan }: { patientPlan: PatientPlanBody }) {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <List.Accordion
        id={patientPlan._id}
        title={`${new Date(patientPlan.assignedDate).toDateString()}`}
        style={{ backgroundColor: 'green', width: 300 }}
        titleStyle={{ width: 300 }}
        expanded={expanded}
        onPress={handlePress}
      >
        {expanded &&
          patientPlan.meals.map((meal, index1) => {
            return (
              <>
                <List.Item title={meal.mealTag} key={index1} style={{}} />
                {meal.ingredientDetails.map((ingredientDetail, index2) => {
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
                    <Text style={styles.text} key={index2}>{`${ingredientAmount} ${ingredientLabel} ${ingredientName}`}</Text>
                  );
                })}
                <Text
                  style={styles.text}
                >{`${meal.cookingInstructions.length ? 'Directions:' : ''} ${meal.cookingInstructions}`}</Text>
              </>
            );
          })}
      </List.Accordion>
      {!expanded &&
        patientPlan.meals.map((meal) => {
          return (
            <>
              <List.Item title={meal.mealTag} />
            </>
          );
        })}
    </>
  );
}

export default PatientPlanItem;

const styles = StyleSheet.create({
  text: {
    marginLeft: 30,
  },
});
