"use client";
import MainButton from "@/components/main-button/main-button";
import CalculationForm from "./calculation-form/calculation-form";
import CalculationResult from "./calculation-result/calculation-result";
import { useEffect, useState } from "react";
import { IDoughRecipe } from "@/api/dough-recipes/types/doughRecipe";
import { RecipeCalculator, ICalculatedRecipe } from "./calculation-result/recipe-calculator/recipe-calculator";
import { getAllDoughRecipes } from "@/api/dough-recipes/handler";
import { Option } from "@/components/form-select/form-select";

export default function PizzaCalculator() {
  const [calculatedRecipe, setCalculatedRecipe] = useState<ICalculatedRecipe | undefined>();
  const [doughRecipeOptions, setDoughRecipeOptions] = useState<Option[]>([]);
  const [doughRecipes, setDoughRecipes] = useState<IDoughRecipe[]>([]);
  const [formValues, setFormValues] = useState({
    doughBallsAmount: 1,
    recipeId: doughRecipes[0]?.id,
  });

  const handleFormChanged = (newValues: {
    doughBallsAmount?: any;
    recipeId?: any;
  }) => {
    setFormValues((prevValues) => ({...prevValues, ...newValues}));    
  };

  useEffect(() => {
    const recipe = doughRecipes.find(recipe => recipe.id === formValues.recipeId);
    if(!recipe) return;
    const calculatedRecipe = new RecipeCalculator(recipe, +formValues.doughBallsAmount);
    setCalculatedRecipe(calculatedRecipe.recipe);
  }, [doughRecipes, formValues]);

  useEffect(() => {
    getAllDoughRecipes().then(recipes => {
      setDoughRecipes(recipes as IDoughRecipe[]);
      setDoughRecipeOptions(recipes.map(r => ({
        value: r.id,
        label: r.title,
      })));
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7">
      <CalculationForm
        recipeOptions={doughRecipeOptions}
        onFormChange={handleFormChanged}
        defaultValues={{doughBallsAmount: 1, recipeId: doughRecipes[0]?.id}}
      ></CalculationForm>

      {calculatedRecipe && <CalculationResult recipe={calculatedRecipe} />}

      <div className="w-1/3">
        <MainButton>Add new diary entry</MainButton>
      </div>
    </div>
  );
}
