import React from "react";

import styles from "./input.module.css";

type Props = {
    id: string;
    value: string | string[];
    name: string;
    onInputChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
    isChecked: boolean;
    isActive?: boolean;
};

const Input: React.FC<Props> = ({ id, value, name, isChecked, type, isActive, onInputChange }) => {
    return (
        <>
            <label className={`${styles.checkbox}  ${isActive ? styles.allActive : ""}`} htmlFor={id}>
                <input
                    id={id}
                    value={value}
                    type={type}
                    name={name}
                    checked={isChecked}
                    aria-label={name}
                    onChange={onInputChange}
                />
                <span className={`${styles.checkmark} ${isActive ? styles.allActive_checkmark : ""}`}></span>
            </label>
        </>
    );
};

export default Input;
