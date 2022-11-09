import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "styles/order.module.scss";
import { randomBytes } from "crypto";
import OrderList from "components/table/order-list";
import DashboardHeader from "layout/header";
import { useFetchAllOrders } from "network-requests/queries";

function AllOrderPage() {
    const { data } = useFetchAllOrders();

    const [orders, setOrders] = React.useState<any>([]);

    React.useEffect(() => {
        if (data) {
            setOrders(data);
        }
    }, [data]);

    const orderStatus = {
        PendingPayment: "PENDING_PAYMENT",
        Processing: "PROCESSING",
        OnHold: "ON_HOLD",
        Completed: "COMPLETED",
        Cancelled: "CANCELLED",
        Refunded: "REFUNDED",
        Failed: "FAILED",
        Pending: "PENDING",
        Delivered: "DELIVERED",
        Draft: "DRAFT",
    };

    return (
        <>
            <div className={styles.rightsidebar}>
                <DashboardHeader />

                <main className={styles.main}>
                    <div className={styles.containerbox}>
                        <div className={styles.mainheading}>Orders </div>

                        <div className={` ${styles.tablebox} ${styles.mt2}`}>
                            <div className={styles.tabletopheading}>
                                All Orders{" "}
                                <span className={styles.number}>442</span>
                            </div>

                            <div className={styles.subsubsubactionbtnlist}>
                                <div className={styles.actionbtnlist}>
                                    <ul>
                                        <li>
                                            <a onClick={() => setOrders(data)}>
                                                All{" "}
                                                <span>({data?.length})</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.PendingPayment
                                                        )
                                                    );
                                                }}
                                            >
                                                Pending payments{" "}
                                                <span>
                                                    (
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.PendingPayment
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.OnHold
                                                        )
                                                    );
                                                }}
                                            >
                                                On hold{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.OnHold
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.Completed
                                                        )
                                                    );
                                                }}
                                            >
                                                Completed{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.Completed
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.Cancelled
                                                        )
                                                    );
                                                }}
                                            >
                                                Cancelled{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.Cancelled
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.Refunded
                                                        )
                                                    );
                                                }}
                                            >
                                                Refunded{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.Refunded
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.Failed
                                                        )
                                                    );
                                                }}
                                            >
                                                Failed{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.Failed
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    ){" "}
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                onClick={() => {
                                                    setOrders(
                                                        data?.filter(
                                                            (order: any) =>
                                                                order.payment
                                                                    .status ===
                                                                orderStatus.Delivered
                                                        )
                                                    );
                                                }}
                                            >
                                                Delivered{" "}
                                                <span>
                                                    ({" "}
                                                    {data?.reduce(
                                                        (item, i) =>
                                                            item +
                                                            (i?.payment
                                                                ?.status ===
                                                            orderStatus.Delivered
                                                                ? 1
                                                                : 0),
                                                        0
                                                    )}
                                                    )
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.searchlistproduct}>
                                    <div className={styles.box}>
                                        <input
                                            type="text"
                                            placeholder="Search Order"
                                        />
                                        <button>
                                            <Image
                                                src="/icons/search-line.svg"
                                                alt="search"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.table}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ORDER</th>
                                            <th>DATE</th>
                                            <th>CUSTOMER</th>
                                            <th>TOTAL</th>
                                            <th>STATUS</th>
                                            <th>ITEMS</th>
                                            <th>LOCATION</th>
                                            <th>PAYMENT TYPE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* @ts-ignore */}
                                        {orders?.map((order, i) => (
                                            <OrderList
                                                order={order}
                                                key={order?._id}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default AllOrderPage;

{
    /* <ul className="dropnav">
                  <li>
                    <Link href="#">
                      <a>
                        <span>Settings</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>
                        <span>Sign Out</span>
                      </a>
                    </Link>
                  </li>
                </ul> */
}
