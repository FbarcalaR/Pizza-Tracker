"use client";
import { IPizzaRecipe } from "@/api/recipes/types/pizzaRecipe";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import Title from "@/components/title/title";
import { useState } from "react";
import PizzaRecipeIngredients from "./pizza-recipe-ingredients/pizza-recipe-ingredients";
import PizzaRecipeNotes from "./pizza-recipe-notes/pizza-recipe-notes";

const mockRecipe1: IPizzaRecipe = {
  id: "1",
  title: "Margherita",
  ingredients: '- tomato sauce\n- Mozzarella\n- Basil',
  notes: 'all on top'
};

export default function PizzaRecipeDetails() {
    const [recipe] = useState(mockRecipe1);
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <Title className="w-full" titleTemplate={
              <FormInvisibleInput type="text" defaultValue={recipe.title}/>
            } />
            <PizzaRecipeIngredients ingredients={recipe.ingredients} />
            <PizzaRecipeNotes notes={recipe.notes} />
        </div>
    );
}
