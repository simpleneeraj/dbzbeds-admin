/* eslint-disable @next/next/no-img-element */
// import PrintIcon from "icons/PrintIcon";
import dynamic from "next/dynamic";
import React, { Fragment, useMemo } from "react";
import Styles from "../styles/invoice.module.scss";

const ItemSubtotal = dynamic(() => import("components/order/item-subtotal"), {
  ssr: false,
});

interface Props {
  data: any;
}
const notToShow = ["headboard", "feet", "matress", "storage", "mattresses"];

function Invoice({ data }: Props) {
  return (
    <div
      className="container"
      id="invoice"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <div className="row">
        <div className={Styles.invoice_top}>
          <p>
            <span>{new Date(data?.createdAt as any).toLocaleString()}</span>
          </p>
          <p>
            <span>Invoice</span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className={Styles.invoive_beds_divan}>
            <h3>DBZBEDS</h3>
            <div className={Styles.invoice_address}>
              <div className={Styles.billing_address}>
                <h5>Billing Address</h5>
                <ul>
                  <li>
                    {data?.user?.firstName} {data?.user?.lastName}
                  </li>
                  <li>
                    {data?.billingAddress?.companyName ||
                      data?.shippingAddress?.companyName}
                  </li>
                  <li style={{ whiteSpace: "break-spaces" }}>
                    {data?.billingAddress?.address ||
                      data?.shippingAddress?.address}
                  </li>
                  <li>
                    {data?.billingAddress?.townCity ||
                      data?.shippingAddress?.townCity}
                  </li>
                  <li>
                    {data?.billingAddress?.postalCode ||
                      data?.shippingAddress?.postalCode}
                  </li>
                  <li>
                    {data?.billingAddress?.country ||
                      data?.shippingAddress?.country}
                  </li>
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
                        <th>Payment Method </th>
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
                  {data?.orderItems?.map((item: any) => (
                    <OrderItems key={item?._id} item={item} />
                  ))}
                </thead>
               
              </table>
              <ItemSubtotal data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

function OrderItems({ item }: any) {
  const isDivanbed = useMemo(() => {
    return !item?.categories?.find((item: any) => notToShow?.includes(item));
  }, [item]);
  return (
    <Fragment key={item._id}>
      <tr>
        <th>Product Name</th>
        <td className={Styles.nameP}>{item.name} </td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
      <tr>
        <th>Size</th>
        <td>{item?.accessories?.size?.name}</td>
        <td>£{item?.accessories?.size?.price}</td>
        <td>{item.quantity}</td>
        <td>£{item?.accessories?.size?.price}</td>
      </tr>

      <tr>
        <th>Choose Colour</th>
        <td>
          {/* <img
            src={item?.accessories?.color?.image || item?.image}
            width="100px"
            height="100px"
            alt="color-image"
          /> */}
          <div>{item?.accessories?.color?.name}</div>
        </td>
        <td>£ 0</td>
        <td>{item.quantity}</td>
        <td>£ 0</td>
        <th></th>
      </tr>

      {isDivanbed && (
        <tr>
          <th>Storage</th>
          <td>
            {item.accessories.storage
              ? item.accessories.storage?.name
              : "No Storage"}
          </td>
          <td>£{item.accessories.storage?.price || 0}</td>
          <td>{item.quantity}</td>
          <td>£{item.accessories.storage?.price || 0}</td>
        </tr>
      )}
      {isDivanbed && (
        <tr>
          <th>Feet</th>
          <td>
            {item.accessories.feet
              ? item.accessories.feet?.name
              : "Free Castor Wheels"}
          </td>
          <td>£{item.accessories.feet?.price || 0}</td>
          <td>{item.quantity}</td>
          <td>£{item.accessories.feet?.price || 0}</td>
        </tr>
      )}
      {isDivanbed && (
        <tr>
          <th>Headboard</th>
          <td>
            {item.accessories.headboard
              ? item.accessories.headboard?.name
              : "No Headboard"}
          </td>
          <td>£{item.accessories.headboard?.price || 0}</td>
          <td>{item.quantity}</td>
          <td>£{item.accessories.headboard?.price || 0}</td>
        </tr>
      )}
      {isDivanbed && (
        <tr>
          <th>Mattress</th>
          <td>
            {item.accessories.mattress
              ? item.accessories.mattress?.name
              : "No Mattress"}
          </td>
          <td>£{item.accessories.mattress?.price || 0}</td>
          <td>{item.quantity}</td>
          <td>£{item.accessories.mattress?.price || 0}</td>
        </tr>
      )}

      <tr>
        <th>Product Total</th>
        <th></th>
        <th></th>
        <th></th>
        <th>£{item.price}</th>
      </tr>
      <br />
     
    </Fragment>
  );
}
