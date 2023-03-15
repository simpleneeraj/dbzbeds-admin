import Button from "components/element/button";
import PrintIcon from "icons/PrintIcon";
import { useFetchOrderById } from "network-requests/queries";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Styles from "../../styles/invoice.module.scss";

function Invoice() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useFetchOrderById(id as string);

  return (
    <div className="container">
      <div className="row">
        <div className={Styles.invoice_top}>
          <p>
            <span>{new Date(data?.createdAt as any).toLocaleString()}</span>
          </p>
          <p>
            <span>Invoice</span>
          </p>
          <Button className="printButton" onClick={() => window.print()}>
            <PrintIcon height={18} width={18} />
            Print
          </Button>
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
                  <li>
                    {data?.user?.firstName} {data?.user?.lastName}
                  </li>
                  <li>{data?.shippingAddress?.companyName}</li>
                  <li style={{ whiteSpace: "break-spaces" }}>
                    {data?.shippingAddress?.address}
                  </li>
                  <li>{data?.shippingAddress?.townCity}</li>
                  <li>{data?.shippingAddress?.postalCode}</li>
                  <li>{data?.shippingAddress?.country}</li>
                </ul>
              </div>
              <div className={Styles.shipping_address}>
                <h5>Shipping Address</h5>
                <ul>
                  <li>
                    {data?.user?.firstName} {data?.user?.lastName}
                  </li>
                  <li>{data?.shippingAddress?.companyName}</li>
                  <li style={{ whiteSpace: "break-spaces" }}>
                    {data?.shippingAddress?.address}
                  </li>
                  <li>{data?.shippingAddress?.townCity}</li>
                  <li>{data?.shippingAddress?.postalCode}</li>
                  <li>{data?.shippingAddress?.country}</li>
                </ul>
              </div>
            </div>
            <div className={Styles.invoice_details}>
              <h3>Invoice</h3>
              <div className={Styles.row}>
                <div className={Styles.invoice_upper}>
                  <table className={Styles.tableCol}>
                    <thead>
                      <tr>
                        <th>Order Number</th>
                        <td>{`#${data?.orderId}`}</td>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr>
                        <th>Ordr date</th>

                        <td>
                          {" "}
                          {data?.createdAt
                            ? new Intl.DateTimeFormat("en-GB", {
                                dateStyle: "long",
                                timeStyle: "short",
                              }).format(new Date(data?.createdAt))
                            : "-"}
                        </td>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr>
                        <th>Payment Method</th>
                        <td>{data?.payment?.paymentMethod}</td>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{data?.user.email}</td>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                      <tr>
                        <th>Telephone</th>
                        <td>{data?.user.phone}</td>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={Styles.invoice_upper}>
              <table className={Styles.tableCol}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                  {data?.orderItems?.map((item) => (
                    <Fragment key={item._id}>
                      <tr>
                        <th>Product Name & Size</th>
                        <td>
                          {item.name}{" "}
                          <span>
                            <b>{item?.accessories?.size?.name}</b>
                          </span>
                        </td>
                        <td>£{item?.accessories?.size?.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{item?.accessories?.size?.price}</td>
                      </tr>

                      <tr>
                        <th>Choose Colour</th>

                        <td>{item.image}</td>
                        <td>£ 0</td>
                        <td>{item.quantity}</td>
                        <td>£ 0</td>
                        <th></th>
                      </tr>
                      <tr>
                        <th>Storage</th>
                        <td>
                          {item.accessories.storage
                            ? item.accessories.storage?.name
                            : ""}
                        </td>
                        <td>£{item.accessories.storage?.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{item.accessories.storage?.price}</td>
                      </tr>
                      <tr>
                        <th>Feet</th>
                        <td>
                          {item.accessories.feet
                            ? item.accessories.feet?.name
                            : ""}
                        </td>
                        <td>£{item.accessories.feet?.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{item.accessories.feet?.price}</td>
                      </tr>
                      <tr>
                        <th>Headboard</th>
                        <td>
                          {item.accessories.headboard
                            ? item.accessories.headboard?.name
                            : ""}
                        </td>
                        <td>£{item.accessories.headboard?.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{item.accessories.headboard?.price}</td>
                      </tr>
                      <tr>
                        <th>Mattress</th>
                        <td>
                          {item.accessories.mattress
                            ? item.accessories.mattress?.name
                            : ""}
                        </td>
                        <td>£{item.accessories.mattress?.price}</td>
                        <td>{item.quantity}</td>
                        <td>£{item.accessories.mattress?.price}</td>
                      </tr>

                      <tr>
                        <th>Subtotal</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>£{item.price * item.quantity}</th>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th style={{ textAlign: "center", padding: "0" }}>
                          Free Shipping
                        </th>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>£{item.price * item.quantity}</th>
                      </tr>
                    </Fragment>
                  ))}
                </thead>
              </table>
            </div>

            {/* <div className={Styles.invoice_product_details}>
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
                      {data?.orderItems?.map((item) => (
                        <Fragment key={item._id}>
                          <tr>
                            <td className={Styles.ukdelivery}>{item.name}</td>
                            <td>£{item.price}</td>
                            <td className={Styles.center}>{item.quantity}</td>
                            <td>£{item.price * item.quantity}</td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Choose Colour&nbsp;: &nbsp;</span>
                              <span>{item.accessories.color?.name}</span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Select Your Size &nbsp; : &nbsp;</span>
                              <span>
                                {item?.accessories?.size?.name} - £
                                {item?.accessories?.size?.price}
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Storage Options &nbsp; : &nbsp;</span>
                              <span>
                                {item.accessories.storage
                                  ? item.accessories.storage?.name +
                                    "- £" +
                                    item.accessories.storage?.price
                                  : "No Storage  "}
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Select Your Feet &nbsp; : &nbsp;</span>
                              <span>
                                {item.accessories.feet
                                  ? item.accessories.feet?.name +
                                    "- £" +
                                    item.accessories.feet?.price
                                  : "No Feet  "}
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Select Your Headboard &nbsp; : &nbsp;</span>
                              <span>
                                {item.accessories.headboard
                                  ? item.accessories.headboard?.name +
                                    "- £" +
                                    item.accessories.headboard?.price
                                  : "No Headboard  "}
                              </span>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className={Styles.ukdelivery}>
                              <span>Select Your Mattress &nbsp; : &nbsp;</span>
                              <span>
                                {item.accessories.mattress
                                  ? item.accessories.mattress?.name +
                                    "- £" +
                                    item.accessories.mattress?.price
                                  : "No Mattress  "}
                              </span>
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
                        </Fragment>
                      ))}

                      <tr>
                        <td className={Styles.subtotal}>
                          <b>Subtotal</b>
                        </td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}></td>
                        <td className={Styles.pillow}>
                          <b>£{data?.totalPrice}</b>
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
                        <td className={Styles.table_end}></td>
                        <td className={Styles.table_end}>
                          <b>£{data?.totalPrice}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
