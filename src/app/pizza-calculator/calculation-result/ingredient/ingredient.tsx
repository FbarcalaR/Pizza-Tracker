import { IIngredientAmount } from "@/api/recipes/types/ingredient";

export default function Ingredient({ ingredient, amountInGrams }: IIngredientAmount) {
    return (
      <div className="w-full flex justify-between">
        <span>{ingredient}</span>
        <span>{amountInGrams}g</span>
      </div>
    );
  }