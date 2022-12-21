/* eslint-disable @next/next/no-img-element */
import React from "react";
import empty from "utils/empty";
import CloseIcon from "icons/close";
import CheckIcon from "icons/check";
import css from "styles/order.module.scss";
import DeleteIcon from "icons/delete";

interface TableListProps {
  name?: string;
  date?: string;
  email?: string;
  image?: string;
  status?: "approved" | "rejected" | "pending";
  onReject?: () => void;
  onApprove?: () => void;
  onDelete?: () => void;
}
const ReviewList = ({
  name,
  image,
  status = "approved",
  email,
  date,
  onReject,
  onApprove,
  onDelete,
}: TableListProps) => {
  const StatusClass = React.useMemo(() => {
    switch (status) {
      case "approved":
        return css.approved;
      case "rejected":
        return css.rejected;
      case "pending":
        return css["in-review"];
      default:
        return empty;
    }
  }, [status]);

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
        <div className={css.productrname}>
          <code>
            <p>{email}</p>
          </code>
        </div>
      </td>
      <td>
        <div className={`${css.status} ${StatusClass} `}>{status}</div>
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
          <ul className={`${css.actions} ${css.actionbtnul}`}>
            <li onClick={onApprove} title="Approve">
              <CheckIcon height={16} width={16} />
            </li>
            <li onClick={onReject} title="Reject">
              <CloseIcon height={16} width={16} />
            </li>
            <li onClick={onDelete} title="DElete">
              <DeleteIcon height={16} width={16} />
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default ReviewList;
