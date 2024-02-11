import { ChangeEventHandler, MouseEventHandler } from "react";

type IProps = {
    className?: string;
    defaultValue?: string;
    type?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onClick?: MouseEventHandler<HTMLInputElement>;
};

export default function FormInvisibleInput({ className, defaultValue, type, onChange, onClick }: IProps) {
    return (
        <input
            className={`bg-transparent ${className}`}
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClick}
        />
    );
}