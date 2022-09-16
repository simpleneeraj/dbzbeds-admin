import DeleteIcon from "icons/delete";
import css from "styles/admin.module.scss";
import { FP } from "../types";

const FilePicker = ({ label, deletable, error, onDelete, ...rest }: FP) => {
  return (
    <div className={css.input}>
      <label>{label}</label>
      <div className={css.field}>
        <input type="file" accept="image/*" {...rest} />
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
export default FilePicker;
