"use client";

import FormInvisibleTextArea from "@/components/form-invisible-text-area/form-invisible-text-area";
import Title from "@/components/title/title";

type IProps = {
    ingredients: string;
};

export default function PizzaRecipeIngredients({ ingredients }: IProps) {
    return (
        <>
            <Title className="w-full" title="Ingredients" />
            <FormInvisibleTextArea
                withAutoHeight={true}
                className="w-full"
                defaultValue={ingredients}
            />
        </>
    );
}
