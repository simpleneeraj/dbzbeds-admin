/* eslint-disable @next/next/no-img-element */
import EditIcon from "icons/edit";
import DeleteIcon from "icons/delete";
import css from "styles/order.module.scss";

interface TableListProps {
  name: string;
  percentage: string;
  date: string;
  description: string;
  min: string;
  max: string;
  // Methods
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: (value: any) => any;
  showDelete?: boolean;
}
const CouponList = ({
  name,
  percentage,
  max,
  min,
  description,
  onView,
  date,
  onEdit,
  onDelete,

  showDelete = true,
}: TableListProps) => {
  return (
    <tr>
      <td>
        <div className={css.checkbox}>
          <input type="checkbox" />
        </div>
      </td>
      <td>
        <div className={css.productrname}>
          <p>{name}</p>
        </div>
      </td>
      <td>
        <div className={css.productrname}>
          <p>{percentage || 0}%</p>
        </div>
      </td>
      <td>
        <div className={css.price}>
          <p>£{min}</p>
        </div>
      </td>
      <td>
        <div className={css.price}>
          <p>£{max}</p>
        </div>
      </td>
      <td>
        <div className={`${css.status} ${css.approved}`}>{description}</div>
      </td>
      <td>
        <div className={css.date}>
          {date
            ? new Intl.DateTimeFormat("en-GB", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(new Date(date))
            : "-"}
        </div>
      </td>
      <td>
        <div className={css.actionbtn}>
          <ul className={css.actionbtnul}>
            {/* <li onClick={onView} title="View">
              <ViewIcon height={16} width={16} />
            </li> */}
            <li onClick={onEdit} title="Edit">
              <EditIcon height={16} width={16} />
            </li>
            {showDelete && (
              <li onClick={onDelete} title="Delete">
                <DeleteIcon height={16} width={16} />
              </li>
            )}
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default CouponList;
