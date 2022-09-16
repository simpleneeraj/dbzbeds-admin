/* eslint-disable @next/next/no-img-element */
import DeleteIcon from "icons/delete";
import EditIcon from "icons/edit";
import ViewIcon from "icons/view";
// import ViewIcon from "icons/view";
import css from "styles/order.module.scss";

interface TableListProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onClickList?: () => void;
}
const TableList = ({ onClickList, onDelete, onEdit }: TableListProps) => {
  return (
    <tr onClick={onClickList}>
      <td>
        <div className={css.checkbox}>
          <input type="checkbox" />
        </div>
      </td>
      <td>
        <div className={css.image}>
          <img
            src={`https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg`}
            height={60}
            width={60}
            alt="Product Image"
          />
        </div>
      </td>
      <td>
        <div className={css.productrname}>
          <p>Modern Armchair for home interiors</p>
        </div>
      </td>
      <td>
        <div className={css.price}>$129.00</div>
      </td>
      <td>
        <div className={`${css.status} ${css.approved}`}>Approved</div>
      </td>
      <td>
        <div className={css.date}>02.11.2020</div>
      </td>
      <td>
        <div className={css.actionbtn}>
          <ul className={css.actionbtnul}>
            <li onClick={onEdit} title="Edit">
              <EditIcon height={16} width={16} />
            </li>
            <li onClick={onDelete} title="Delete">
              <DeleteIcon height={16} width={16} />
            </li>
            <li title="View">
              <ViewIcon height={16} width={16} />
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default TableList;
