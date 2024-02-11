import { IRecipeStep } from "@/api/recipes/types/recipeStep";
import { useState } from "react";
import RecipeDetailIngredient from "../recipe-detail-ingredient/recipe-detail-ingredient";

type IProps = {
    step: IRecipeStep;
  };

export default function RecipeDetailIngredientsList({ step }: IProps) {
  let [ingredients, setIngredients] = useState(step.ingredients);

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { ingredient: "new ingredient", amountPercentage: 0 },
    ]);
  };
  return (
    <>
      {ingredients.map((ingredient, i) => (
        <RecipeDetailIngredient
          key={step.title + ingredient.ingredient + i}
          ingredient={ingredient}
        />
      ))}

      <div
        className="w-full flex justify-between opacity-60 italic cursor-pointer"
        onClick={() => handleAddIngredient()}
      >
        <span className="text-base">+ Add ingredient</span>
        <span className="text-base">100%</span>
      </div>
    </>
  );
}
