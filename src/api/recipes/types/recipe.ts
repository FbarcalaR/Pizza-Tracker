import { IRecipeStep } from "./recipeStep";

export type IRecipe = {
  id: string,
  title: string;
  doughBallWeightInGrams: number;
  steps: IRecipeStep[];
};