import { gql } from '@apollo/client';

export const GET_NUTRITIONAL_MEALS_FOR_PATIENTS = gql`
  query _getNutritionalMealsForPatient($input: GetNutritionalMealsForPatientDto!) {
    getNutritionalMealsForPatient(input: $input) {
      data {
        _id
        name
        image
        description
        healthBenefits
        ingredientDetails {
          ingredientType
          customIngredient {
            amount
            label
            name
            ingredients {
              name
              amount
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
            macros {
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
          equivalents {
            ingredientType
            customIngredient {
              name
              ingredients {
                name
                amount
                label
                weightInGrams
                protein
                carbs
                fat
                calories
              }
              macros {
                weightInGrams
                protein
                carbs
                fat
                calories
              }
            }
            ingredient {
              amount
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
          ingredient {
            name
            amount
            label
            weightInGrams
            protein
            carbs
            fat
            calories
          }
          equivalents {
            ingredientType
            customIngredient {
              name
              ingredients {
                amount
                name
                label
                weightInGrams
                protein
                carbs
                fat
                calories
              }
            }
            ingredient {
              amount
              name
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
        }
        cookingInstructions
        macros {
          weightInGrams
          protein
          carbs
          fat
          calories
        }
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;
