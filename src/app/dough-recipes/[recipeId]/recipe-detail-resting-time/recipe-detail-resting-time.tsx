import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import { useState } from "react";

type IProps = {initialRestInHours?: number};

export default function RecipeDetailRestingTime({ initialRestInHours }: IProps) {
    let [restInHours, setRestInHours] = useState(initialRestInHours);
    const handleAddRestingTime = () => {
        setRestInHours(1);
    };

    return (
        <>
            {restInHours && (
            <div className="w-full flex justify-center">
                <span className="text-base italic">
                Rest for about <FormInvisibleInput
                    className="italic w-5 text-center"
                    type="text"
                    defaultValue={restInHours.toString()}
                    onClick={(e) => e.stopPropagation()}/>
                h
                </span>
            </div>
            )}
            {!restInHours && (
            <div className="w-full flex justify-center cursor-pointer"
                onClick={() => handleAddRestingTime()}
            >
                <span className="opacity-60 text-base italic">
                + Add resting time
                </span>
            </div>
            )}
        </>
    );
}