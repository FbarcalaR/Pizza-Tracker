import { IIngredient } from "@/api/recipes/types/ingredient";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";

type IProps = {
    ingredient: IIngredient,
    className?: string;
}

export default function RecipeDetailIngredient({ ingredient, className }: IProps) {
    return (
      <div className={`w-full flex justify-between ${className}`}>
        <span className="text-base">
            <FormInvisibleInput
              type="text"
              defaultValue={ingredient.ingredient}
            />
        </span>
        <span className="text-base">
            <FormInvisibleInput
              className="text-end w-8"
              type="text"
              defaultValue={Math.round(ingredient.amountPercentage*100).toString()}
            />
            %
        </span>
      </div>
    );
  }