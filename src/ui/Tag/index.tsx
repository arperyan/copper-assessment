import s from './tag.module.css';

const Tag = () => (
    <button type="button" className={s.tag} aria-label="complete" disabled={true}>
        Complete
    </button>
);

export default Tag;
