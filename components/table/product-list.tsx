/* eslint-disable @next/next/no-img-element */
import EditIcon from "icons/edit";
import ViewIcon from "icons/view";
import DeleteIcon from "icons/delete";
import css from "styles/order.module.scss";

interface TableListProps {
  name: string;
  date: string;
  image: string;
  price?: string;
  status?: string;
  categories: string[];
  // Methods
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: (value: any) => any;
}
const ProductList = ({
  name,
  date,
  image,
  onView,
  onEdit,
  onDelete,
  categories,
}: TableListProps) => {
  return (
    <tr>
      <td>
        <div className={css.checkbox}>
          <input type="checkbox" />
        </div>
      </td>
      <td>
        <div className={css.image}>
          <img src={image || "/image.png"} alt="Product Image" />
        </div>
      </td>
      <td>
        <div className={css.productrname}>
          <p>{name}</p>
        </div>
      </td>
      <td>
        <div className={css.price}>
          {categories?.map((item) => {
            return (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  margin: "4px 0",
                  padding: "2px 4px",
                  borderRadius: 12,
                  fontSize: "10px",
                  backgroundColor: "#3f8a62",
                }}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </div>
      </td>
      <td>
        <div className={`${css.status} ${css.approved}`}>Approved</div>
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
            <li onClick={onView} title="View">
              <ViewIcon height={16} width={16} />
            </li>
            <li onClick={onEdit} title="Edit">
              <EditIcon height={16} width={16} />
            </li>
            <li onClick={onDelete} title="Delete">
              <DeleteIcon height={16} width={16} />
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default ProductList;
