import { gql } from '@apollo/client';

export const GET_MASTER_PROGRAMS = gql`
  query _getMasterPrograms($input: GetProgramsDto!) {
    getMasterPrograms(input: $input) {
      data {
        uuid
        professional
        name
        description
        programTags {
          uuid
          title
        }
        plans {
          uuid
          title
          week
          day
          meals {
            uuid
            position
            mealTag
            name
            image
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
              ingredient {
                name
                amount
                label
                weightInGrams
                protein
                carbs
                fat
                calories
                internalFood
              }
              equivalents {
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
