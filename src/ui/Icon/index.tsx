import React from "react";
import styles from "./icon.module.css";

type Props = {
    name: string;
};

const Icon: React.FC<Props> = ({ name }) => {
    return (
        <>
            <i className={styles[name]}></i>
        </>
    );
};

export default Icon;
