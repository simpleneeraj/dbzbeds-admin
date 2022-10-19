import { Order } from "network-requests/types";
import Link from "next/link";
import styles from "styles/order.module.scss";

interface OrderListProps {
    order?: Order;
}

const OrderList = ({ order }: OrderListProps) => {
    return (
        <tr>
            <td>
                <div className={styles.order}>
                    <Link href={`/order/${order?._id}`}>
                        <a>#{order?.orderId?.toString() || ""}</a>
                    </Link>
                </div>
            </td>
            <td>
                <div className={styles.date}>
                    {order?.createdAt
                        ? new Intl.DateTimeFormat("en-GB", {
                              dateStyle: "long",
                              timeStyle: "short",
                          }).format(new Date(order?.createdAt))
                        : "-"}
                </div>
            </td>
            <td>
                <div className={styles.customername}>
                    {order?.user?.firstName} {order?.user?.lastName}
                </div>
            </td>
            <td>
                <div className={styles.price}>{order?.totalPrice}</div>
            </td>
            <td>
                <div className={` ${styles.status} ${styles.approved} `}>
                    {order?.payment?.status}
                </div>
            </td>
            <td>
                <div className={styles.itemsqty}>
                    {order?.orderItems?.length || 0}
                </div>
            </td>
            <td>
                <div className={styles.location}>
                    {order?.shippingAddress?.country}
                </div>
            </td>
            <td>
                <div className={styles.paymenttype}>
                    {order?.payment?.paymentMethod}
                </div>
            </td>
        </tr>
    );
};

export default OrderList;
