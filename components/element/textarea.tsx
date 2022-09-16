import { T } from "../types";
import css from "styles/admin.module.scss";
import DeleteIcon from "icons/delete";

const Textarea = ({ label, onDelete, deletable, error, ...rest }: T) => {
  return (
    <div className={css.input}>
      <label>{label}</label>
      <div className={css.field}>
        <textarea {...rest}></textarea>
        {deletable ? (
          <i title="Delete" onClick={onDelete}>
            <DeleteIcon height={18} width={18} />
          </i>
        ) : null}
      </div>
      {error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};

export default Textarea;
