import s from './spinner.module.css';

const Spinner = () => (
    <div id={s.spinner} className={s.spinner_overlay}>
        <div className={s.spinner_container} />
    </div>
);

export default Spinner;
