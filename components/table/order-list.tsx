import moment from "moment";
import { Order } from "network-requests/types";
import Link from "next/link";
import React from "react";
import styles from "styles/order.module.scss";

interface OrderListProps {
  order?: Order;
  onChecked?: (id: string) => void;
  checked?: boolean;
}

const OrderList = ({ order, onChecked, checked }: OrderListProps) => {
  // const paymentOptions = [
  //   { label: "Completed", value: "COMPLETED" },
  //   { label: "Delivered", value: "DELIVERED" },
  //   { label: "Processing", value: "PROCESSING" },
  //   { label: "Pending", value: "PENDING" },
  //   { label: "Pending Payment", value: "PENDING_PAYMENT" },
  //   { label: "On Hold", value: "ON_HOLD" },
  //   { label: "Failed", value: "FAILED" },
  //   { label: "Canacelled", value: "CANCELLED" },
  //   { label: "Refunded", value: "REFUNDED" },
  //   { label: "Draft", value: "DRAFT" },
  // ];

  const statusClass = React.useMemo(() => {
    switch (order?.payment?.status as string) {
      case "COMPLETED":
        return {
          color: "#ffffff",
          background: "#208b3a",
        };
      case "DELIVERED":
        return {
          color: "#ffffff",
          background: "#0000FF",
        };
      case "PROCESSING":
        return {
          color: "#ffffff",
          background: "#FFC300",
        };
      case "PENDING":
        return {
          color: "#ffffff",
          background: "#ff7b00",
        };
      case "PENDING_PAYMENT":
        return {
          color: "#ffffff",
          background: "#ff8800",
        };
      case "ON_HOLD":
        return {
          color: "#ffffff",
          background: "#581845",
        };
      case "FAILED":
        return {
          color: "#ffffff",
          background: "#FF0000",
        };
      case "CANCELLED":
        return {
          color: "#ffffff",
          background: "#ef233c",
        };
      case "REFUNDED":
        return {
          color: "#ffffff",
          background: "#DE006F",
        };
      case "DRAFT":
        return {
          color: "#ffffff",
          background: "#335c67",
        };
      default:
        return;
    }
  }, [order?.payment?.status]);

  const convertDate = (dateString: string) => {
    const formattedDate = moment(dateString).format("DD MMM YY - hh:mm A");
    return formattedDate;
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          checked={checked}
          onChange={() => {
            order?._id && onChecked && onChecked(order?._id || "");
          }}
        />
      </td>
      <td className={styles.oderId}>
        <div className={styles.order}>
          <Link href={`/order/${order?._id}`}>
            <a>#{order?.orderId?.toString() || ""}</a>
          </Link>
        </div>
      </td>
      <td>
        <div className={styles.date}>
          {order?.createdAt ? convertDate(order?.createdAt) : "-"}
        </div>
      </td>
      <td>
        <div className={styles.customername}>
          <p>
            {" "}
            {order?.user?.firstName} {order?.user?.lastName}{" "}
          </p>
        </div>
      </td>
      <td>
        <div className={styles.price}> £ {order?.totalPrice}</div>
      </td>
      <td>
        <div className={` ${styles.status}`} style={statusClass}>
          {order?.payment?.status}
        </div>
      </td>
      <td>
        <div className={styles.addressDetails}>
          {order?.user?.firstName} {order?.user?.lastName}&nbsp;
          {order?.shippingAddress?.address}&nbsp;
          {order?.shippingAddress?.townCity}&nbsp;
          {order?.shippingAddress?.country}
          {order?.shippingAddress?.postalCode}
          <br />
          <p className={styles.viaPayment}>
            <span style={{ textTransform: "lowercase" }}> via </span>{" "}
            {order?.payment?.paymentMethod}
          </p>
        </div>
      </td>
      {/* <td>
        <div className={styles.location}>{order?.shippingAddress?.country}</div>
      </td> */}
      {/* <td>
        <div className={styles.paymenttype}>
          {order?.payment?.paymentMethod}
        </div>
      </td> */}
    </tr>
  );
};

export default OrderList;
