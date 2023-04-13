/* eslint-disable @next/next/no-img-element */
import EditIcon from "icons/edit";
import DeleteIcon from "icons/delete";
import css from "styles/order.module.scss";

interface TableListProps {
  name: string;
  date: string;
  image: string;
  content: string;
  categories: string[];
  onView?: () => void;
  onDelete?: () => void;
  onEdit?: (value: any) => any;
}
const BlogList = ({
  name,
  content,
  categories,
  image,
  date,
  onEdit,
  onDelete,
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
          <img src={image || "/image.png"} alt="" width={50} height={50} />
        </div>
      </td>
      <td>
        <div className={css.productrname}>
          <p>{name}</p>
        </div>
      </td>
      {/* <td>
        <div
          className={css.price}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></div>
      </td> */}
      <td>
        <div className={css.price}>
          {categories?.map((item) => {
            return <div key={item}>{item} </div>;
          })}
        </div>
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

export default BlogList;
