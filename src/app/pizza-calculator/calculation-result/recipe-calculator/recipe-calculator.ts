import { IIngredient } from "@/api/recipes/types/ingredient";
import { IRecipe } from "@/api/recipes/types/recipe";
import { IRecipeStep } from "@/api/recipes/types/recipeStep";

export class RecipeCalculator {
  public recipe: ICalculatedRecipe;

  constructor(recipe: IRecipe, amountOfDoughBalls: number) {
    const allIngredientPercentages = recipe.steps
      .flatMap((step) => step.ingredients.map((i) => i.amountPercentage))
      .reduce((p, c) => p + c, 0);
    const totalFlourInGrams =
      (recipe.doughBallWeightInGrams * amountOfDoughBalls) /
      allIngredientPercentages;

    this.recipe = this.mapToCalculatedRecipe(recipe, totalFlourInGrams);
  }

  private mapToCalculatedRecipe(
    recipe: IRecipe,
    totalFlourInGrams: number
  ): ICalculatedRecipe {
    return {
      title: recipe.title,
      doughBallWeightInGrams: recipe.doughBallWeightInGrams,
      steps: recipe.steps.map((s) =>
        this.mapToCalculatedStep(s, totalFlourInGrams)
      ),
    };
  }

  private mapToCalculatedStep(
    step: IRecipeStep,
    totalFlour: number
  ): ICalculatedRecipeStep {
    return {
      title: step.title,
      ingredients: step.ingredients.map((i) =>
        this.mapToCalculatedRecipeIngredient(i, totalFlour)
      ),
    };
  }

  private mapToCalculatedRecipeIngredient(
    ingredient: IIngredient,
    totalFlour: number
  ): ICalculatedIngredient {
    const amountInGrams = totalFlour * ingredient.amountPercentage;
    let roundedAmount = amountInGrams;
    if (amountInGrams > 850)
      roundedAmount = Math.round(amountInGrams / 10) * 10;
    else if (amountInGrams > 100)
      roundedAmount = Math.round(amountInGrams);
    else
      roundedAmount = Math.round(amountInGrams * 10) / 10;

    return {
      ingredient: ingredient.ingredient,
      amountInGrams: roundedAmount,
    };
  }
}

export type ICalculatedRecipe = {
  title: string;
  doughBallWeightInGrams: number;
  steps: ICalculatedRecipeStep[];
};

export type ICalculatedRecipeStep = {
  title: string;
  ingredients: ICalculatedIngredient[];
};

export type ICalculatedIngredient = {
  ingredient: string;
  amountInGrams: number;
};
