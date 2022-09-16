import DeleteIcon from "icons/delete";
import EditIcon from "icons/edit";
import ViewIcon from "icons/view";
import { Bed, VariantsTypes } from "network-requests/types";
import Image from "next/image";
// import ViewIcon from "icons/view";
import css from "styles/order.module.scss";

interface TableListProps {
    data: Bed;
    onEdit?: (value: any) => any;
    onDelete?: () => void;
    onClickList?: () => void;
}
const TableList = ({ onClickList, onDelete, onEdit, data }: TableListProps) => {
    return (
        <tr onClick={onClickList}>
            <td>
                <div className={css.checkbox}>
                    <input type="checkbox" />
                </div>
            </td>
            <td>
                <div className={css.image}>
                    <Image
                        src={"/image.png"}
                        height={60}
                        width={60}
                        alt="Product Image"
                    />
                </div>
            </td>
            <td>
                <div className={css.productrname}>
                    <p>{data?.name}</p>
                </div>
            </td>
            <td>
                <div className={css.price}>
                    {data.categories?.map((item) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: "#3f8a62",
                                    color: "white",
                                    textAlign: "center",
                                    margin: "4px 0",
                                    padding: "2px 4px",
                                    borderRadius: 12,
                                    fontSize: 10,
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
                    {data?.createdAt
                        ? new Intl.DateTimeFormat("en-GB", {
                              dateStyle: "full",
                              timeStyle: "short",
                          }).format(new Date(data?.createdAt))
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
