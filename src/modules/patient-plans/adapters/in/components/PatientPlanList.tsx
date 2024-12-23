import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Card, List, Surface, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/adapters/in/context/AuthContext';
import { PatientPlanBody } from 'src/modules/patient-plans/adapters/out/patient-plan';
import { usePatientPlans } from 'src/modules/patient-plans/adapters/out/PatientPlanActions';
import { ReduxStates } from 'src/shared/types/types';
import { StyleSheet } from 'react-native';
import { IngredientType } from 'src/modules/patient-plans/adapters/out/enum';

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
                  return <Text key={index2}>{`${ingredientAmount} ${ingredientLabel} ${ingredientName}`}</Text>;
                })}
                <Text>{meal.cookingInstructions}</Text>
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
const renderItem: ListRenderItem<PatientPlanBody> = ({ item }) => {
  return <PatientPlanItem patientPlan={item} />;
};
function PatientPlanList() {
  const { patient } = useContext(AuthContext);
  const { getPatientPlans } = usePatientPlans();
  const { data: patientPlansState } = useSelector((state: ReduxStates) => state.patientPlans.patientPlans);
  const input = {
    patient,
    offset: 0,
    limit: 30,
  };
  useEffect(() => {
    const getPatientPlansHelper = async () => {
      await getPatientPlans(input);
    };
    getPatientPlansHelper();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={patientPlansState ? patientPlansState : []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={styles.chatContainer}
        // showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default PatientPlanList;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 250,
    width: 250,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
