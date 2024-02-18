'use client'

import { IDoughRecipe } from "@/api/recipes/types/doughRecipe";
import Title from "@/components/title/title";
import { useState } from "react";
import RecipeDetailSteps from "./recipe-detail-steps/recipe-detail-steps";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";

const mockRecipe1: IDoughRecipe = {
    id: "1",
    title: "Autolisi",
    doughBallWeightInGrams: 260,
    steps: [
      {
        title: "Step 1",
        ingredients: [
          { ingredient: "flour 00", amountPercentage: 0.75 },
          { ingredient: "flour nuvola", amountPercentage: 0.25 },
          { ingredient: "water", amountPercentage: 0.55 },
        ],
        restInHours: 12,
      },
      {
        title: "Step 2",
        ingredients: [
          { ingredient: "water", amountPercentage: 0.15 },
          { ingredient: "yeast", amountPercentage: 0.006 },
          { ingredient: "salt", amountPercentage: 0.03 },
        ],
      },
    ],
  };

export default function DoughRecipeDetail() {
    const [recipe] = useState(mockRecipe1);
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <Title className="w-full" titleTemplate={
              <FormInvisibleInput type="text" defaultValue={recipe.title}/>
            } />
            <RecipeDetailSteps recipe={mockRecipe1} />
        </div>
    );
}
