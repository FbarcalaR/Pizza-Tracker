import { ChangeEventHandler, MouseEventHandler, useEffect, useRef } from "react";

type IProps = {
    withAutoHeight?: boolean;
    className?: string;
    defaultValue?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onClick?: MouseEventHandler<HTMLTextAreaElement>;
};

export default function FormInvisibleTextArea({ withAutoHeight = false, className, defaultValue, onChange, onClick }: IProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const autoHeight = () => {
        if (!withAutoHeight) return;

        const element = textAreaRef.current;
        if(!element) return;

        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
      };

      useEffect(() => autoHeight(), []);

    return (
        <textarea
            ref={textAreaRef}
            className={`bg-transparent ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClick}
            onInput={autoHeight}
        />
    );
}