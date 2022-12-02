import React from 'react';

import s from './icon.module.css';

type Props = {
    name: string;
};

const Icon: React.FC<Props> = ({ name }) => (
    <>
        <i className={s[name]}></i>
    </>
);

export default Icon;
