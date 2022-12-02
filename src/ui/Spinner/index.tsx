import styles from "./spinner.module.css";

const Spinner = () => {
    return (
        <div id={styles.spinner} className={styles.spinner_overlay}>
            <div className={styles.spinner_container} />
        </div>
    );
};

export default Spinner;
