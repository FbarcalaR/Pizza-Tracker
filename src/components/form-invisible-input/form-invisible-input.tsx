import { ChangeEventHandler, MouseEventHandler } from "react";

type IProps = {
    name: string;
    className?: string;
    defaultValue?: string;
    type?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onClick?: MouseEventHandler<HTMLInputElement>;
};

export default function FormInvisibleInput({ name, className, defaultValue, type, onChange, onClick }: IProps) {
    return (
        <input
        name={name}
            className={`bg-transparent ${className}`}
            type={type}
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClick}
        />
    );
}