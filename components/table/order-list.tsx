import Link from "next/link";
import styles from "styles/order.module.scss";

interface OrderListProps {
  order?: string;
  date?: string;
  customer?: string;
  total?: string;
  status?: string;
  items?: string | number;
  location?: string;
  paymentType?: string;
  href: string;
}

const OrderList = ({
  date,
  items,
  total,
  order,
  status,
  location,
  customer,
  paymentType,
  href,
}: OrderListProps) => {
  return (
    <tr>
      <td>
        <div className={styles.order}>
          <Link href={href}>
            <a>#143567</a>
          </Link>
        </div>
      </td>
      <td>
        <div className={styles.date}>22/01/2021</div>
      </td>
      <td>
        <div className={styles.customername}>Dominik Lamakani</div>
      </td>
      <td>
        <div className={styles.price}>$129.00</div>
      </td>
      <td>
        <div className={` ${styles.status} ${styles.approved} `}>Approved</div>
      </td>
      <td>
        <div className={styles.itemsqty}>1</div>
      </td>
      <td>
        <div className={styles.location}>🇨🇳 Shanghai, CN</div>
      </td>
      <td>
        <div className={styles.paymenttype}>Subscription</div>
      </td>
    </tr>
  );
};

export default OrderList;
