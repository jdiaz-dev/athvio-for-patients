import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import * as NutritionalMealsSlice from 'src/modules/nutritional-meals/adapters/in/slicers/NutritonalMealsSlice';
import { apolloClient } from 'src/core/graphql/ApolloClient';
import { GET_NUTRITIONAL_MEALS_FOR_PATIENTS } from 'src/modules/nutritional-meals/adapters/out/nutritionalMealsQueries';
import {
  GetNutritionalMealsBody,
  GetNutritionalMealsRequest,
  GetNutritionalMealsResponse,
} from 'src/modules/nutritional-meals/adapters/out/nutritional-meals';

export function useNutritionalMeals() {
  const dispatch = useDispatch();

  const getNutritionalMeals = async (body: GetNutritionalMealsBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetNutritionalMealsResponse, GetNutritionalMealsRequest>({
        mutation: GET_NUTRITIONAL_MEALS_FOR_PATIENTS,
        variables: {
          input: { ...body },
        },
      });
      console.log('----------response.data', response.data);
      if (response.data) {
        dispatch(NutritionalMealsSlice.initializeNutritionalMeals(response.data.getNutritionalMealsForPatient.data));
      }
    } catch (error) {
      dispatch(NutritionalMealsSlice.initializeNutritonalMealsError((error as ApolloError).graphQLErrors[0].message));
    }
  };

  return { getNutritionalMeals };
}
