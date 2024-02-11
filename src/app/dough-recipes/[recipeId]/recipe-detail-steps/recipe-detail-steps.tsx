import { IRecipe } from "@/api/recipes/types/recipe";
import BlockSection from "@/components/block-section/block-section";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import RecipeDetailIngredientsList from "../recipe-detail-ingredients-list/recipe-detail-ingredients-list";
import RecipeDetailRestingTime from "../recipe-detail-resting-time/recipe-detail-resting-time";

type IProps = {
  recipe: IRecipe;
};

export default function RecipeDetailSteps({ recipe }: IProps) {

  return (
    <div className="w-full flex flex-col gap-4">
      {recipe.steps.map((step) => (
        <BlockSection
          key={step.title}
          bodyClassName="flex flex-col gap-1"
          titleTemplate={
            <FormInvisibleInput
              type="text"
              defaultValue={step.title}
              onClick={(e) => e.stopPropagation()}
            />
          }
          className="w-full flex flex-col gap-2"
        >
            <RecipeDetailIngredientsList step={step}/>
            <RecipeDetailRestingTime initialRestInHours={step.restInHours}/>
        </BlockSection>
      ))}
    </div>
  );
}
