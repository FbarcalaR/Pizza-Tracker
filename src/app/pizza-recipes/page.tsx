"use client";
import { IPizzaRecipe } from "@/api/recipes/types/pizzaRecipe";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { BiTrash } from "react-icons/bi";

const mockRecipe1: IPizzaRecipe = {
  id: "1",
  title: "Margherita",
  ingredients: '- tomato sauce\n- Mozzarella\n- Basil',
  notes: 'all on top'
};

const mockRecipe2: IPizzaRecipe = {
    id: "2",
    title: "Pumpkin",
    ingredients: '- Pumpkin\n- shiitake\n- ricotta',
    notes: 'all on top'
  };

const mockRecipes: IPizzaRecipe[] = [mockRecipe1, mockRecipe2];

export default function PizzaRecipes() {
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
            onClick={() => router.push(`/pizza-recipes/${recipe.id}`)}
          />
        </div>
      ))}
    </div>
  );
}
