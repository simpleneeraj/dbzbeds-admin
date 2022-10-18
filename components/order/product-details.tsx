import styles from "styles/order.module.scss";

const ProductDetails = () => {
  return (
    <>
      <div className={styles.singleorderpage}>
        <div className={styles.productdetailslist}>
          <table>
            <tbody>
              <tr>
                <th>Product</th>
                <th>Option</th>
                <th>Cost</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>Select Your Mattress</td>
                <td>No Mattress</td>
                <td>£0.00</td>
                <td>
                  1<small>(1x1)</small>
                </td>
                <td>£0.00</td>
              </tr>
              <tr>
                <td>Select Your Headboard</td>
                <td>26 Inch Vertical 4 Panel Headboard- £40</td>
                <td>£40.00</td>
                <td>
                  1 <small>(1×1)</small>
                </td>
                <td>£40.00</td>
              </tr>
              <tr>
                <td>Select Your Feet</td>
                <td>Free Castor Wheels</td>
                <td>£0.00</td>
                <td>
                  1 <small>(1×1)</small>
                </td>
                <td>£0.00</td>
              </tr>
              <tr>
                <td>Storage Options</td>
                <td>2 Drawers Same Side - £45</td>
                <td>£45.00</td>
                <td>
                  1 <small>(1×1)</small>
                </td>
                <td>£45.00</td>
              </tr>
              <tr>
                <td>Select Your Size</td>
                <td>4FT 6" - Double - £179</td>
                <td>£179.00</td>
                <td>
                  1 <small>(1×1)</small>
                </td>
                <td>£179.00</td>
              </tr>
              <tr>
                <td>Choose Colour</td>
                <td>
                  <img src="/grey-suede.jpg" />
                </td>
                <td>£0.00</td>
                <td>
                  1 <small>(1×1)</small>
                </td>
                <td>£0.00</td>
              </tr>
              <tr className={styles.total_cal}>
                <td>Image</td>
                <td>Product</td>
                <td>Total cost</td>
                <td>Qty</td>
                <td>Grand total</td>
              </tr>
              <tr>
                <td>
                  <img src="/grey-suede.png"></img>
                </td>
                <td>
                  <a>Royal Grey Suede Divan Bed FREE UK DELIVERY</a>
                </td>
                <td>£264.00</td>
                <td>× 1</td>
                <td>£264.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <tbody>
        <div className={styles.free_ship}>
          <tr>
            <p>
              <td>Free shipping</td>
              <td>£0.00</td>
            </p>
          </tr>
        </div>
      </tbody>
    </>
  );
};

export default ProductDetails;
