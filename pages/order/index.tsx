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
                                            <Link href="#">
                                                <a>
                                                    All <span>(39,091)</span>{" "}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Pending payments{" "}
                                                    <span>(16)</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    On hold <span>(3)</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Completed{" "}
                                                    <span>(26,484)</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Cancelled <span>(256)</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Refunded <span>(830)</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Failed <span>(4,161) </span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <a>
                                                    Delivered{" "}
                                                    <span>(7,341)</span>
                                                </a>
                                            </Link>
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
                                        {data?.orders?.map((order, i) => (
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
