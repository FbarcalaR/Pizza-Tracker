"use client";
import { IRecipe } from "@/api/recipes/types/recipe";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { BiTrash } from "react-icons/bi";

const mockRecipe1: IRecipe = {
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
      restInHours: 1,
    },
  ],
};

const mockRecipe2: IRecipe = {
  id: "2",
  title: "Biga",
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

const mockRecipes: IRecipe[] = [mockRecipe1, mockRecipe2];

export default function DoughRecipes() {
  const router = useRouter();
  const handleRemoveRecipe = (event: MouseEvent, recipeId: string) => {
    event.stopPropagation();
    console.log("remove: ", recipeId);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {mockRecipes.map((recipe) => (
        <div key={recipe.id} className="w-full flex flex-col gap-4">
          <Title
            className="cursor-pointer"
            title={recipe.title}
            icon={
              <BiTrash
                onClick={(e) => handleRemoveRecipe(e, recipe.id)}
                className="absolute top-0 right-1 mt-auto mb-auto cursor-pointer"
              />
            }
            onClick={() => router.push(`/dough-recipes/${recipe.id}`)}
          />
        </div>
      ))}
    </div>
  );
}
