"use client";
import { getAllRecipes, removeRecipe, setRecipe } from "@/api/recipes/handler";
import { IPizzaRecipe } from "@/api/recipes/types/pizzaRecipe";
import MainButton from "@/components/main-button/main-button";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
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
  const [recipes, setRecipes] = useState<IPizzaRecipe[]>([]);

  const handleRemoveRecipe = (event: MouseEvent, recipeId: string) => {
    event.stopPropagation();
    
    removeRecipe(recipeId).then(() => fetchRecipes());
  };

  const handleNewRecipe = () => {
    const id = (recipes.length +1).toString();
    setRecipe({ id, title: 'new recipe' })
      .then(() => fetchRecipes());
  };

  const fetchRecipes = () => {
    getAllRecipes().then(recipes => {
      setRecipes(recipes as IPizzaRecipe[]);
    });
  }

  useEffect(() => fetchRecipes(), []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {recipes.map((recipe) => (
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
      
      <div className="pt-4 w-1/3">
        <MainButton onClick={() => handleNewRecipe()}>Add new recipe</MainButton>
      </div>
    </div>
  );
}
