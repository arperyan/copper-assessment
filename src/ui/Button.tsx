import React from "react";
import { useDispatch } from "react-redux";

import styles from "./button.module.css";

type Props = {
    label: string;
    disabled?: boolean;
    onPress: React.MouseEventHandler<HTMLButtonElement>;
    type: string;
};

const Button: React.FC<Props> = ({ label, disabled = false, onPress, type }) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`${styles[type]} ${styles.ripple}`}
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onPress}
        >
            {label}
        </button>
    );
};

export default Button;
