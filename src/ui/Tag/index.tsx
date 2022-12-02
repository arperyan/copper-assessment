import styles from "./tag.module.css";

const Tag = () => {
    return (
        <button type="button" className={styles.tag} aria-label="complete" disabled={true}>
            Complete
        </button>
    );
};

export default Tag;
