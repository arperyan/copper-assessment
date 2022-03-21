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
    isDisabled?: boolean;
};

const Input: React.FC<Props> = ({ id, value, name, isChecked, type, isActive, isDisabled, onInputChange }) => {
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
                    disabled={isDisabled}
                    onChange={onInputChange}
                />
                <span className={`${styles.checkmark} ${isActive ? styles.allActive_checkmark : ""}`}></span>
                {isActive && !isChecked && <span className={styles.line}></span>}
            </label>
        </>
    );
};

export default Input;
