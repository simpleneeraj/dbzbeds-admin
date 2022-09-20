/* eslint-disable @next/next/no-img-element */
import DeleteIcon from "icons/delete";
import EditIcon from "icons/edit";
import css from "styles/order.module.scss";

interface TableListProps {
  // name: string;
  date?: any;
  image: any;
  price: {
    salePrice: any;
    basePrice: any;
  };
  // status?: string;
  size: any;
  // Methods
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: (value: any) => any;
}
const VariantList = ({
  onDelete,
  onEdit,
  date,
  image,
  price,
  size,
}: TableListProps) => {
  console.log(price);
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
          <p>{size}</p>
        </div>
      </td>
      <td>
        <div className={css.price}>
          {price?.salePrice}
          <del style={{ fontSize: 12, marginLeft: 5 }}>{price?.basePrice}</del>
        </div>
      </td>
      <td>
        <div className={`${css.status} ${css.approved}`}>Approved</div>
      </td>
      <td>
        <div className={css.date}>
          {date
            ? new Intl.DateTimeFormat("en-GB", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(new Date(date))
            : "-"}
        </div>
      </td>
      <td>
        <div className={css.actionbtn}>
          <ul className={css.actionbtnul}>
            {" "}
            {/* <li onClick={onView} title="View">
              <ViewIcon height={16} width={16} />
            </li> */}
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

export default VariantList;
