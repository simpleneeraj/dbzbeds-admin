/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import dynamic from "next/dynamic";
import { useFetchOrderById } from "network-requests/queries";
import { format } from "date-fns";
const ProductDetails = dynamic(
    () => import("components/order/product-details"),
    {
        ssr: false,
    }
);
const ItemSubtotal = dynamic(() => import("components/order/item-subtotal"), {
    ssr: false,
});

function SingleOrderPreview() {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = useFetchOrderById(id as string);

    const [orderDate, setOrderDate] = React.useState("");
    const [paymentStatus, setPaymentStatus] = React.useState("");

    React.useEffect(() => {
        if (data) {
            setPaymentStatus(data?.payment?.status as string);
            setOrderDate(
                format(
                    new Date(data?.createdAt as any),
                    "yyyy-MM-dd'T'HH:mm:ss"
                )
            );
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No order found</div>;

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
                                    Payment via {data?.payment?.paymentMethod}.
                                    Customer IP:
                                    <span> 92.40.196.240</span>
                                </p>
                                <div className={styles.orderdetails}>
                                    <div className={styles.col}>
                                        <div className={styles.box}>
                                            <div className={styles.wdheading}>
                                                General
                                            </div>
                                            <span>
                                                <label>Date created</label>
                                                <input
                                                    type="datetime-local"
                                                    id="date-time"
                                                    name="date-time"
                                                    value={orderDate}
                                                    onChange={(e) =>
                                                        setOrderDate(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </span>
                                            <div
                                                className={styles.payment_link}
                                            >
                                                {" "}
                                                <label>
                                                    Status{" "}
                                                    <a href="">
                                                        Customer payment page →
                                                    </a>
                                                </label>
                                            </div>

                                            <select
                                                name="order_status"
                                                className={styles.select_status}
                                                value={paymentStatus}
                                                onChange={(e) =>
                                                    setPaymentStatus(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="status-payment">
                                                    Pending payment
                                                </option>
                                                <option value="Processing">
                                                    Processing
                                                </option>
                                                <option value="status-hold">
                                                    On hold
                                                </option>
                                                <option value="status-Completed">
                                                    Completed
                                                </option>
                                                <option value="status-Cancelled">
                                                    Cancelled
                                                </option>
                                                <option value="status-Refunded">
                                                    Refunded
                                                </option>
                                                <option value="status-failed">
                                                    failed
                                                </option>
                                                <option value="status-Delivered">
                                                    Delivered
                                                </option>
                                                <option value="status-Draft">
                                                    Draft
                                                </option>
                                            </select>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div className={styles.col}>
                                        <div className={styles.box}>
                                            <div className={styles.swdheading}>
                                                Billing
                                            </div>
                                            <div className={styles.Billingbox}>
                                                <span>
                                                    {data?.user?.firstName}{" "}
                                                    {data?.user?.lastName}
                                                </span>
                                                <span>
                                                    {
                                                        data?.shippingAddress
                                                            ?.companyName
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        data?.shippingAddress
                                                            ?.address
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        data?.shippingAddress
                                                            ?.townCity
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        data?.shippingAddress
                                                            ?.country
                                                    }
                                                </span>
                                                <span>
                                                    {
                                                        data?.shippingAddress
                                                            ?.postalCode
                                                    }
                                                </span>
                                                <span>
                                                    <strong>
                                                        Email address:
                                                    </strong>
                                                </span>{" "}
                                                <span>
                                                    <a href="mailto:">
                                                        {data?.user?.email}
                                                    </a>
                                                </span>
                                                <span>
                                                    <strong>Phone:</strong>
                                                </span>{" "}
                                                <span>
                                                    <a href="tel:">
                                                        {data?.user?.phone}
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.col}>
                                        <div className={styles.box}>
                                            <div className={styles.swdheading}>
                                                Shipping
                                            </div>
                                            <div className={styles.Billingbox}>
                                                <span>Jasmine Windsor</span>
                                                <span>16 Dale View</span>
                                                <span>Hove</span>
                                                <span> East Sussex</span>
                                                <span>BN3 8LF</span>
                                                <span>
                                                    <strong>Phone:</strong>
                                                </span>{" "}
                                                <span>
                                                    <a href="tel:">
                                                        {data?.user?.phone}
                                                    </a>
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
                                        <span>
                                            This order is no longer editable.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.action_parent}>
                            <div className={styles.order_Action}>
                                <h2>Order actions</h2>
                                <div className={styles.action_Select}>
                                    <select>
                                        <option value={"action"}>
                                            Choose an action...
                                        </option>
                                        <option value={"email"}>
                                            Email invoice / order details to
                                            customer
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
                                    <div className={styles.right_update_button}>
                                        <button type="button">Update</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.Order_printing}>
                                <h2>Order Printing</h2>
                            </div>
                            <div className={styles.printing_buttons}>
                                <button>Print Invoice</button>
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
