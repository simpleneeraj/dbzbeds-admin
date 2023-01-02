/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import dynamic from "next/dynamic";
import { useFetchOrderById } from "network-requests/queries";
import { format } from "date-fns";
import {
  useSendOrderDetails,
  useUpdateOrderStatus,
} from "network-requests/mutations";
import easyinvoice from "easyinvoice";
import { useSocket } from "hooks/useSocket";
import Button from "components/element/button";

const ProductDetails = dynamic(
  () => import("components/order/product-details"),
  {
    ssr: false,
  }
);
const ItemSubtotal = dynamic(() => import("components/order/item-subtotal"), {
  ssr: false,
});

const paymentOptions = [
  { label: "Pending Payment", value: "PENDING_PAYMENT" },
  { label: "Processing", value: "PROCESSING" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Canacelled", value: "CANCELLED" },
  { label: "Refunded", value: "REFUNDED" },
  { label: "Failed", value: "FAILED" },
  { label: "Pending", value: "PENDING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Draft", value: "DRAFT" },
];

function SingleOrderPreview() {
  const router = useRouter();
  const socket = useSocket();

  const { id } = router.query;

  const { data, isLoading } = useFetchOrderById(id as string);
  const { mutate } = useUpdateOrderStatus(id as string);

  const { mutate: sendEmailInvoce } = useSendOrderDetails();

  const [orderDate, setOrderDate] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");

  const handleEmailSend = () => {
    sendEmailInvoce({
      email: data?.user.email,
      message:
        "Order ID: " + data?._id + "Your order has been placed successfully",
    });
  };
  const handleOrderStatus = (e: any) => {
    mutate({ status: e.target.value });
    setPaymentStatus(e.target.value);
  };

  const handleInvoicePrint = () => {
    router.push("/invoice/" + id);
  };

  // easyinvoice.createInvoice(data, function (result: any) {
  //     // The response will contain a base64 encoded PDF file
  //     easyinvoice.download(`invoice_${data.information.number}.pdf`);

  React.useEffect(() => {
    if (data) {
      setPaymentStatus(data?.payment?.status as string);
      setOrderDate(
        format(new Date(data?.createdAt as any), "yyyy-MM-dd'T'HH:mm:ss")
      );
    }
  }, [data]);

  const [accessible, setAccessible] = React.useState(false);
  const [socketLoading, setSocketLoading] = React.useState(false);

  React.useEffect(() => {
    if (socket) {
      if (id) {
        setSocketLoading(true);
        socket.emit("active-order", id as string);
      }
      socket.on("is-order-accessible", ({ access }) => {
        setAccessible(access);
        setSocketLoading(false);
      });
    }
    return () => {
      if (socket) {
        socket.off("is-order-accessible");
        socket.emit("inactive-order", id as string);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  if (isLoading || socketLoading) return <div>Loading...</div>;
  if (!data) return <div>No order found</div>;
  if (!accessible)
    return (
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1>Order is not accessible</h1>
        <p style={{ textAlign: "center" }}>
          Other Admin is working on this order currently <br />
          Please try again later
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
        {/* <button
          onClick={() => router.back()}
          style={{
            width: "max-content",
            padding: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
        >
          Go Back
        </button> */}
      </div>
    );

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.devide}>
              <div className={styles.mainheading}>
                <h1>Orders No #{data?.orderId?.toString()}</h1>
                <p>
                  Payment via {data?.payment?.paymentMethod}. Customer IP:
                  <span> 92.40.196.240</span>
                </p>
                <div className={styles.orderdetails}>
                  <div className={styles.col}>
                    <div className={styles.box}>
                      <div className={styles.wdheading}>General</div>
                      <span>
                        <label>Date created</label>
                        <input
                          type="datetime-local"
                          id="date-time"
                          name="date-time"
                          value={orderDate}
                          onChange={(e) => setOrderDate(e.target.value)}
                        />
                      </span>
                      <div className={styles.payment_link}>
                        {" "}
                        <label>
                          Status <a href="">Customer payment page →</a>
                        </label>
                      </div>

                      <select
                        name="order_status"
                        className={styles.select_status}
                        value={paymentStatus}
                        onChange={handleOrderStatus}
                      >
                        {paymentOptions?.map((item) => {
                          return (
                            <option key={item?.value} value={item?.value}>
                              {item?.label}
                            </option>
                          );
                        })}
                      </select>
                      <span></span>
                    </div>
                  </div>
                  <div className={styles.col}>
                    <div className={styles.box}>
                      <div className={styles.swdheading}>Billing</div>
                      <div className={styles.Billingbox}>
                        <span>
                          {data?.user?.firstName} {data?.user?.lastName}
                        </span>
                        <span>{data?.shippingAddress?.companyName}</span>
                        <span>{data?.shippingAddress?.address}</span>
                        <span>{data?.shippingAddress?.townCity}</span>
                        <span>{data?.shippingAddress?.country}</span>
                        <span>{data?.shippingAddress?.postalCode}</span>
                        <span>
                          <strong>Email address:</strong>
                        </span>{" "}
                        <span>
                          <a href="mailto:">{data?.user?.email}</a>
                        </span>
                        <span>
                          <strong>Phone:</strong>
                        </span>{" "}
                        <span>
                          <a href="tel:">{data?.user?.phone}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.col}>
                    <div className={styles.box}>
                      <div className={styles.swdheading}>Shipping</div>
                      <div className={styles.Billingbox}>
                        <span>
                          {data?.user?.firstName} {data?.user?.lastName}
                        </span>
                        <span>{data?.shippingAddress?.companyName}</span>
                        <span>{data?.shippingAddress?.address}</span>
                        <span>{data?.shippingAddress?.townCity}</span>
                        <span>{data?.shippingAddress?.country}</span>
                        <span>{data?.shippingAddress?.postalCode}</span>
                        <span>
                          <strong>Email address:</strong>
                        </span>{" "}
                        <span>
                          <a href="mailto:">{data?.user?.email}</a>
                        </span>
                        <span>
                          <strong>Phone:</strong>
                        </span>{" "}
                        <span>
                          <a href="tel:">{data?.user?.phone}</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {data?.orderItems?.map((item, index) => (
                <ProductDetails data={item} key={index} />
              ))}

              <div className={styles.Order_subtotal}>
                <ItemSubtotal data={data.totalPrice} />
                <div className={styles.refund_button}>
                  <p>
                    <button type="button">Refund</button>
                    <span>This order is no longer editable.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.action_parent}>
              <div className={styles.order_Action}>
                <h2>Order actions</h2>
                <div className={styles.action_Select}>
                  <select>
                    <option value={"action"}>Choose an action...</option>
                    <option value={"email"}>
                      Email invoice / order details to customer
                    </option>
                    <option value={"resend"}>
                      Resend new order notification
                    </option>
                    <option value={"regenerate"}>
                      Regenerate download permissions
                    </option>
                  </select>
                </div>
                <div className={styles.action_update}>
                  <div className={styles.left_link}>
                    <a href="#">Move to bin</a>
                  </div>
                  <div
                    className={styles.right_update_button}
                    onClick={handleEmailSend}
                  >
                    <button type="button">Update</button>
                  </div>
                </div>
              </div>
              <div className={styles.Order_printing}>
                <h2>Order Printing</h2>
              </div>
              <div className={styles.printing_buttons}>
                <button onClick={handleInvoicePrint}>Print Invoice</button>
                <button>Print Delivery Note</button>
                <span>
                  <button>Print Receipt</button>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default SingleOrderPreview;
