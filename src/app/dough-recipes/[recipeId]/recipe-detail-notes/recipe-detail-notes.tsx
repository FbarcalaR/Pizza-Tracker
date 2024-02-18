import FormInvisibleTextArea from "@/components/form-invisible-text-area/form-invisible-text-area";
import { useState } from "react";

type IProps = {
  initialNotes?: string;
};

export default function RecipeDetailNotes({ initialNotes }: IProps) {
  let [notes, setNotes] = useState(initialNotes ?? null);
  const handleAddRestingTime = () => {
    setNotes('New note');
  };

  return (
    <>
        {notes && (
        <div className="w-full flex justify-center">
            <FormInvisibleTextArea
                withAutoHeight={true}
                className="w-full"
                defaultValue={notes}
                onClick={(e) => e.stopPropagation()}/>
        </div>
        )}
        {!notes && (
        <div className="w-full flex justify-center cursor-pointer"
            onClick={() => handleAddRestingTime()}
        >
            <span className="opacity-60 text-base italic">
            + Add notes
            </span>
        </div>
        )}
    </>
  );
}
