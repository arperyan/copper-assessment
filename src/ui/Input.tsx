import React from "react";

import styles from "./input.module.css";

type Props = {
    id: string;
    value: string;
    name: string;
    onInputChange: React.ChangeEventHandler<HTMLInputElement>;
    type: string;
    isChecked: boolean;
};

const Input: React.FC<Props> = ({ id, value, name, isChecked, type, onInputChange }) => {
    return (
        <>
            <label className={styles.checkbox} htmlFor={id}>
                <input
                    id={id}
                    value={value}
                    type={type}
                    name={name}
                    checked={isChecked}
                    aria-label={name}
                    onChange={onInputChange}
                />
                <span className={styles.checkmark}></span>
            </label>
        </>
    );
};

export default Input;
