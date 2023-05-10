import moment from "moment";
import styles from "styles/order.module.scss";

const ItemSubtotal = ({ data }: any) => {
  const totalPrice = data?.totalPrice;
  const status = data?.payment?.status;
  const isPending = status === "PENDING_PAYMENT";
  const paymentMethod = data?.payment?.paymentMethod;
  return (
    <>
      <table className={styles.subtotal_paid}>
        <tbody>
          <tr>
            <td>Items Subtotal:</td>
            <td>
              <strong>£{totalPrice}</strong>
            </td>
          </tr>

          <tr>
            <td>Shipping:</td>
            <td>
              <strong>£0.00</strong>
            </td>
          </tr>

          {data?.discount?.code && (
            <tr>
              <td>Promo Code:</td>
              <td>
                <strong>{data?.discount?.code?.toUpperCase()}</strong>
              </td>
            </tr>
          )}

          {data?.discount?.code && (
            <tr>
              <td>Discount:</td>
              <td>
                <strong>
                  - £
                  {getDiscountAmount(
                    totalPrice || 0,
                    data?.discount?.percent || 0
                  )}
                  {" | "} ({data?.discount?.percent}%)
                </strong>
              </td>
            </tr>
          )}

          <tr>
            <td>Order Total:</td>
            <td>
              <strong>£{data?.discount?.price || totalPrice}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Paid:</strong>
            </td>
            <td>
              <strong>£{data?.discount?.price || totalPrice}</strong>
            </td>
          </tr>
          <tr>
            <span>
              {moment(data?.createdAt).format(`MMMM DD, YYYY`)} via{" "}
              <span style={{ textTransform: "capitalize" }}>
                {" "}
                {paymentMethod} {`${isPending ? "(  Pending Payment)" : ""}`}
              </span>
            </span>
          </tr>
        </tbody>
      </table>
      <table className={styles.total_paid}>
        <tbody>
         
         
        </tbody>
      </table>
    </>
  );
};

export default ItemSubtotal;

const getDiscountAmount = (total: number, discountPct: number) => {
  return (total * discountPct) / 100;
};
