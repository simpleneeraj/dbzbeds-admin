import React from "react";
import Styles from "../../styles/invoice.module.scss";

function Invoice() {
  return (
    <div className="container">
      <div className="row">
        <div className={Styles.invoice_top}>
          <p>
            <span>11/8/22,</span>
            <span>7:10 PM</span>
          </p>
          <p>
            <span>Invoice</span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className={Styles.invoive_beds_divan}>
            <h3>Beds Divans</h3>
            <div className={Styles.invoice_address}>
              <div className={Styles.billing_address}>
                <h5>Billing Address</h5>
                <ul>
                  <li>Anna Jhagroo</li>
                  <li>7 Argyle Road</li>
                  <li>Tottenham</li>
                  <li>London</li>
                  <li>London</li>
                  <li>N17 0BE</li>
                </ul>
              </div>
              <div className={Styles.shipping_address}>
                <h5>Shipping Address</h5>
                <ul>
                  <li>Anna Jhagroo</li>
                  <li>7 Argyle Road</li>
                  <li>Tottenham</li>
                  <li>London</li>
                  <li>London</li>
                  <li>N17 0BE</li>
                </ul>
              </div>
            </div>
            <div className={Styles.invoice_details}>
              <h3>Invoice</h3>
              <div className={Styles.row}>
                <div className={Styles.invoice_upper}>
                  <ul className={Styles.left_ul}>
                    <p>
                      <li>Order Number</li>
                    </p>
                    <p>
                      <li>Order Date</li>
                    </p>
                    <p>
                      <li>Payment Method </li>
                    </p>
                    <p>
                      <li>Email</li>
                    </p>
                    <p>
                      <li>Telephone</li>
                    </p>
                  </ul>
                  <ul className={Styles.right_ul}>
                    <p>
                      <li>55821</li>
                    </p>
                    <p>
                      <li>November 8, 2022</li>
                    </p>
                    <p>
                      <li>Klarna</li>
                    </p>
                    <p>
                      <li>ajhagroo@hotmail.co.uk</li>
                    </p>
                    <p>
                      <li>07495712662</li>
                    </p>
                  </ul>
                </div>
              </div>
            </div>
            <div className={Styles.invoice_product_details}>
              <div className={Styles.row}>
                <div className={Styles.invoice_table}>
                  <table>
                    <tbody>
                      <tr>
                        <th className={Styles.ukdelivery}>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>

                      <tr>
                        <td className={Styles.ukdelivery}>
                          Grey Linen Divan Bed Base or Set Headboard & Mattress
                          Free Uk Delivery
                        </td>
                        <td>£328.00</td>
                        <td className={Styles.center}>1</td>
                        <td>£328.00</td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Choose Colour&nbsp;: &nbsp;</span>
                          <span>Grey Linen</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Select Your Size &nbsp; : &nbsp;</span>
                          <span>4FT - Small Double - £179.00</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Storage Options &nbsp; : &nbsp;</span>
                          <span>:No Drawers</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Select Your Feet &nbsp; : &nbsp;</span>
                          <span>Free Castor Wheels</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Select Your Headboard &nbsp; : &nbsp;</span>
                          <span>
                            26 Inch Matching Button Cube Headboard- £50.00
                          </span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.ukdelivery}>
                          <span>Select Your Mattress &nbsp; : &nbsp;</span>
                          <span>4FT - Orthopedic Mattress - £99.00</span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={Styles.sku}>
                          <span>SKU&nbsp;:&nbsp;</span>
                          <span>OKH10000</span>
                        </td>
                        <td className={Styles.sku}></td>
                        <td className={Styles.sku}></td>
                        <td className={Styles.sku}></td>
                      </tr>
                      <tr>
                        <td className={Styles.sku}>
                          Pillow Top 1500 Pocket firm Mattress Free UK Delivery
                        </td>
                        <td className={Styles.pillow}>£299.00</td>
                        <td className={Styles.pillow}>1</td>
                        <td className={Styles.pillow}>£299.00</td>
                      </tr>
                      <tr>
                        <td className={Styles.subtotal}>
                          <b>Subtotal</b>
                        </td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}>
                          <b>£627.00</b>
                        </td>
                      </tr>
                      <tr>
                        <td className={Styles.subtotal}>Shipping</td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}>Free shipping</td>
                      </tr>
                      <tr>
                        <td className={Styles.table_end_total}>
                          <b>Total</b>
                        </td>
                        <td className={Styles.table_end}></td>
                        <td className={Styles.table_end}>
                          <b>2</b>
                        </td>
                        <td className={Styles.table_end}>
                          <b>£627.00</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
