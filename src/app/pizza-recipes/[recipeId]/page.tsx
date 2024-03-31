'use client';
import { IPizzaRecipe } from '@/api/recipes/types/pizzaRecipe';
import FormInvisibleInput from '@/components/form-invisible-input/form-invisible-input';
import Title from '@/components/title/title';
import { FormEvent, useEffect, useState } from 'react';
import PizzaRecipeIngredients from './pizza-recipe-ingredients/pizza-recipe-ingredients';
import PizzaRecipeNotes from './pizza-recipe-notes/pizza-recipe-notes';
import { getRecipe, setRecipe as saveRecipe } from '@/api/recipes/handler'; 
import { useParams } from 'next/navigation'

export default function PizzaRecipeDetails() {
  const { recipeId } = useParams<{ recipeId: string }>()
    const [recipe, setRecipe] = useState<IPizzaRecipe>();

    useEffect(() => {
      getRecipe(recipeId).then((recipe) => {
        setRecipe(recipe as IPizzaRecipe);
      });
    }, [recipeId]);

    const handleForm = (ev: FormEvent<HTMLFormElement>) => {
      const rawFormData = new FormData(ev.currentTarget);
      const formData = Object.fromEntries(rawFormData);

      saveRecipe({ id: recipe?.id, ...formData });
    };

    return (
        <form className='w-full flex flex-col items-center gap-4' onChange={(ev) => handleForm(ev)}>
            <Title className='w-full' titleTemplate={
              <FormInvisibleInput type='text' defaultValue={recipe?.title} name='title'/>
            } />
            <PizzaRecipeIngredients ingredients={recipe?.ingredients} />
            <PizzaRecipeNotes notes={recipe?.notes} />
        </form>
    );
}
