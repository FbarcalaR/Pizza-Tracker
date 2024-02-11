"use client";
import MainButton from "@/components/main-button/main-button";
import CalculationForm from "./calculation-form/calculation-form";
import CalculationResult from "./calculation-result/calculation-result";
import { useEffect, useState } from "react";
import { IRecipe } from "@/api/recipes/types/recipe";
import { RecipeCalculator, ICalculatedRecipe } from "./calculation-result/recipe-calculator/recipe-calculator";

const mockOptions = [
  { label: "Autolisi", value: "1" },
  { label: "Biga", value: "2" },
];

const mockRecipe1: IRecipe = {
  id: "1",
  title: 'Autolisi',
  doughBallWeightInGrams: 260,
  steps: [
    {
      title: "Step 1",
      ingredients: [
        { ingredient: "flour 00", amountPercentage: 0.75 },
        { ingredient: "flour nuvola", amountPercentage: 0.25 },
        { ingredient: "water", amountPercentage: 0.55 },
      ],
      restInHours: 12
    },
    {
      title: "Step 2",
      ingredients: [
        { ingredient: "water", amountPercentage: 0.15 },
        { ingredient: "yeast", amountPercentage: 0.006 },
        { ingredient: "salt", amountPercentage: 0.03 },
      ],
      restInHours: 1
    },
  ],
};

const mockRecipe2: IRecipe = {
  id: "2",
  title: 'Biga',
  doughBallWeightInGrams: 260,
  steps: [
    {
      title: "Step 1",
      ingredients: [
        { ingredient: "manitoba", amountPercentage: 0.4 },
        { ingredient: "water", amountPercentage: 0.2 },
      ],
    },
    {
      title: "Step 2",
      ingredients: [
        { ingredient: "00", amountPercentage: 0.6 },
        { ingredient: "water", amountPercentage: 0.8 },
        { ingredient: "yeast", amountPercentage: 0.006 },
        { ingredient: "salt", amountPercentage: 0.03 },
      ],
    },
  ],
};

const recipes = [mockRecipe1, mockRecipe2];

export default function PizzaCalculator() {
  const [formValues, setFormValues] = useState({
    doughBallsAmount: 1,
    recipeId: recipes[0]?.id,
  });
  const [calculatedRecipe, setCalculatedRecipe] = useState<ICalculatedRecipe | undefined>();

  const handleFormChanged = (newValues: {
    doughBallsAmount?: any;
    recipeId?: any;
  }) => {
    setFormValues((prevValues) => ({...prevValues, ...newValues}));    
  };

  useEffect(() => {
    const recipe = recipes.find(recipe => recipe.id === formValues.recipeId);
    if(!recipe) return;
    const calculatedRecipe = new RecipeCalculator(recipe, formValues.doughBallsAmount);
    setCalculatedRecipe(calculatedRecipe.recipe);
  }, [formValues]);

  return (
    <div className="flex flex-col items-center gap-7">
      <CalculationForm
        recipeOptions={mockOptions}
        onFormChange={handleFormChanged}
        defaultValues={{doughBallsAmount: 1, recipeId: recipes[0]?.id}}
      ></CalculationForm>

      {calculatedRecipe && <CalculationResult recipe={calculatedRecipe} />}

      <div className="w-1/3">
        <MainButton>Add new diary entry</MainButton>
      </div>
    </div>
  );
}
