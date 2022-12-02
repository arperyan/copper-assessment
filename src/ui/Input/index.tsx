import React from 'react';

import s from './input.module.css';

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

const Input: React.FC<Props> = ({ id, value, name, isChecked, type, isActive, isDisabled, onInputChange }) => (
    <>
        <label className={`${s.checkbox}  ${isActive ? s.allActive : ''}`} htmlFor={id}>
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
            <span className={`${s.checkmark} ${isActive ? s.allActive_checkmark : ''}`}></span>
            {isActive && !isChecked && <span className={s.line}></span>}
        </label>
    </>
);

export default Input;
