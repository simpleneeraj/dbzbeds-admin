import styles from "styles/order.module.scss";

const ItemSubtotal = () => {
  return (
    <>
      <table className={styles.subtotal_paid}>
        <tbody>
          <tr>
            <td>Items Subtotal:</td>
            <td>
              <strong>£264.00</strong>
            </td>
          </tr>

          <tr>
            <td>Shipping:</td>
            <td>
              <strong>£0.00</strong>
            </td>
          </tr>

          <tr>
            <td>Order Total:</td>
            <td>
              <strong>£264.00</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <table className={styles.total_paid}>
        <tbody>
          <tr>
            <td>
              <strong>Paid:</strong>
            </td>
            <td>
              <strong>£264.00</strong>
            </td>
          </tr>
          <tr>
            <span>October 16, 2022 via Credit card/Debit card</span>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ItemSubtotal;
