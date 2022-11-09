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
                "Order ID: " +
                data?._id +
                "Your order has been placed successfully",
        });
    };
    const handleOrderStatus = (e: any) => {
        mutate({ status: e.target.value });
        setPaymentStatus(e.target.value);
    };

    const handleInvoicePrint = () => {
        // Create your invoice! Easy!
        const data = {
            images: {
                logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
                background:
                    "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
            },
            sender: {
                company: "DBZBEDS",
                address: "Sample Street 123",
                zip: "1234 AB",
                city: "Sampletown",
                country: "Samplecountry",
            },
            client: {
                company: "Client Corp",
                address: "Clientstreet 456",
                zip: "4567 CD",
                city: "Clientcity",
                country: "Clientcountry",
            },
            information: {
                number: "2022.0001",
                date: "1.1.2022",
                "due-date": "15.1.2022",
            },
            products: [
                {
                    quantity: "2",
                    description: "Test1",
                    "tax-rate": 6,
                    price: 33.87,
                },
                {
                    quantity: "4",
                    description: "Test2",
                    "tax-rate": 21,
                    price: 10.45,
                },
            ],
            "bottom-notice": "Kindly pay your invoice within 15 days.",
            settings: {
                currency: "USD",
                "tax-notation": "vat",
                "margin-top": 25,
                "margin-right": 25,
                "margin-left": 25,
                "margin-bottom": 25,
            },
        };

        easyinvoice.createInvoice(data, (result: any) => {
            // The response will contain a base64 encoded PDF file
            easyinvoice.download(`invoice_${data.information.number}.pdf`);
        });
    };

    // easyinvoice.createInvoice(data, function (result: any) {
    //     // The response will contain a base64 encoded PDF file
    //     easyinvoice.download(`invoice_${data.information.number}.pdf`);

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
                                                onChange={handleOrderStatus}
                                            >
                                                {paymentOptions?.map((item) => {
                                                    return (
                                                        <option
                                                            key={item?.value}
                                                            value={item?.value}
                                                        >
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
                                <button onClick={handleInvoicePrint}>
                                    Print Invoice
                                </button>
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
