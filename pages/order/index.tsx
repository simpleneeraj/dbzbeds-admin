import React, { useState, useCallback } from "react";
import Image from "next/image";
import styles from "styles/order.module.scss";
import OrderList from "components/table/order-list";
import DashboardHeader from "layout/header";
import { useFetchAllOrders } from "network-requests/queries";
import { orderStatus } from "constants/OrderActions";
import { useBulkOrderUpdate } from "network-requests/mutations";
import { useRouter } from "next/router";
import Search from "layout/search";

function AllOrderPage() {
  const router = useRouter();
  const { data, refetch } = useFetchAllOrders(router?.query?.id as any);
  const { mutate } = useBulkOrderUpdate();

  // filter payment method
  const [filterPayment, setFilterPayment] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [orders, setOrders] = React.useState<typeof data>([]);

  const [action, setAction] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  const onSetOrders = React.useCallback((key: string, value: any) => {
    setSelectedAction(key);
    setOrders(value);
  }, []);
  const handleSelect = useCallback(
    (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((s) => s !== id));
      } else {
        setSelected([...selected, id]);
      }
    },
    [selected]
  );

  const handleSelectAll = useCallback(() => {
    if (selected.length === data?.length) {
      setSelected([]);
    } else {
      setSelected(data?.map((d) => d._id) || []);
    }
  }, [data, selected]);

  const handleBulkAction = useCallback(() => {
    console.log({ selected, action });

    mutate(
      { ids: selected, status: action },
      {
        onSuccess: () => {
          refetch();
          setSelected([]);
          setAction("");
        },
      }
    );
  }, [selected, action, mutate, refetch]);

  const onFilterPayment = React.useCallback((value: string) => {
    setFilterPayment(value);
  }, []);

  const filterArrary = React.useMemo(() => {
    return orders?.filter((d) => {
      return filterPayment === ""
        ? d
        : d.payment?.paymentMethod === filterPayment;
    });
  }, [filterPayment, orders]);

  React.useEffect(() => {
    if (data) {
      //set data to order except isDeleted
      setOrders(data?.filter((order: any) => order.isDeleted === false));
    }
  }, [data]);

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader
          customHeader={
            <Search
              inputProps={{
                placeholder: "Custom Search for Order Page",
              }}
            />
          }
        />

        <main className={styles.main}>
          <div className={styles.containerbox}>
            {/* <div className={styles.mainheading}>Orders </div> */}
            <div className={` ${styles.tablebox} ${styles.mt2}`}>
              <div className={styles.tabletopheading}>
                <div>
                  All Orders{" "}
                  <span className={styles.number}>{data?.length}</span>
                </div>

                <ul className={styles.oldDatabase}>
                  <li>
                    <a
                      href="https://staging-bedsdivansco-staging.kinsta.cloud/admin"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className={styles.icons}>
                        <Image
                          src="/database-2-line.svg"
                          width="30"
                          height={20}
                          alt="icons"
                          priority
                        />{" "}
                      </span>{" "}
                      Old Database 1
                    </a>
                  </li>
                  <li>
                    <div> </div>{" "}
                    <a
                      href="http://env-bedsdivansco-newbackup.kinsta.cloud/admin"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className={styles.icons}>
                        <Image
                          src="/database-2-fill.svg"
                          width="30"
                          height={20}
                          alt="icons"
                          priority
                        />{" "}
                      </span>{" "}
                      Old Database 2
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.subsubsubactionbtnlist}>
                <div className={styles.actionbtnlist}>
                  <ul>
                    <li>
                      <a
                        onClick={() =>
                          onSetOrders(
                            "all",
                            data?.filter(
                              (order: any) => order.isDeleted === false
                            )
                          )
                        }
                      >
                        All <span>({data?.length})</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          onSetOrders(
                            "processing",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Processing
                            )
                          );
                        }}
                      >
                        Processing{" "}
                        <span>
                          (
                          {data?.reduce(
                            (item, i) =>
                              item +
                              (i?.payment?.status === orderStatus.Processing
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
                          onSetOrders(
                            "pending-payments",
                            data?.filter(
                              (order: any) =>
                                order.payment.status ===
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
                              (i?.payment?.status === orderStatus.PendingPayment
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
                          onSetOrders(
                            "on-hold",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.OnHold
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
                              (i?.payment?.status === orderStatus.OnHold
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
                          onSetOrders(
                            "completed",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Completed
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
                              (i?.payment?.status === orderStatus.Completed
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
                          onSetOrders(
                            "cancelled",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Cancelled
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
                              (i?.payment?.status === orderStatus.Cancelled
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
                          onSetOrders(
                            "refunded",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Refunded
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
                              (i?.payment?.status === orderStatus.Refunded
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
                          onSetOrders(
                            "failed",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Failed
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
                              (i?.payment?.status === orderStatus.Failed
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
                          onSetOrders(
                            "delivered",
                            data?.filter(
                              (order: any) =>
                                order.payment.status === orderStatus.Delivered
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
                              (i?.payment?.status === orderStatus.Delivered
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
                          onSetOrders(
                            "bin",
                            data?.filter(
                              (order: any) => order.isDeleted === true
                            )
                          );
                        }}
                      >
                        Bin{" "}
                        <span>
                          ({" "}
                          {data?.reduce(
                            (item, i) => item + (i?.isDeleted === true ? 1 : 0),
                            0
                          )}
                          )
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <div className={styles.searchlistproduct}>
                  <div className={styles.box}>
                    <input type="text" placeholder="Search Order" />
                    <button>
                      <Image
                        src="/icons/search-line.svg"
                        alt="search"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div> */}
              </div>

              <div className={styles.paymentsectionbulk}>
                <div className={styles.actionbtnlistSecond}>
                  <ul>
                    <li>
                      <p>Payment Method</p>
                      <select
                        value={filterPayment}
                        onChange={(e) => onFilterPayment(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="stripe">Stripe</option>
                        <option value="klarna">Klarna</option>
                        <option value="cash-on-delivery">
                          Cash on Delivery
                        </option>
                      </select>
                    </li>

                    {selectedAction !== "bin" && (
                      <React.Fragment>
                        <li>
                          <p>Bulk Action</p>
                          <select
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                          >
                            <option value="">Select Any Action</option>
                            <option value={orderStatus.Delivered}>
                              Change status to Delivered
                            </option>
                            <option value={orderStatus.Failed}>
                              Change status to Failed
                            </option>
                            {/* <option value="print-invoice">Print Invoice</option>
                          <option value="print-delivery-note">
                            Print Delivery Note
                          </option>
                          <option value="print-receipt">Print Receipt</option> */}
                            <option value={orderStatus.Processing}>
                              Change status to Processing
                            </option>
                            <option value={orderStatus.OnHold}>
                              Change status to On-Hold
                            </option>
                            <option value={orderStatus.Completed}>
                              Change status to Completed
                            </option>
                            <option value={orderStatus.Cancelled}>
                              Change status to Cancelled
                            </option>
                            <option value={orderStatus.Refunded}>
                              Change status to Refund
                            </option>
                            <option onClick={() => window.print()}>
                              Print Invoice
                            </option>
                            <option value={orderStatus.MoveToBin}>
                              Move To Bin
                            </option>

                            {/* <option value="export-to-CSV">Export to CSV</option> */}
                            {/* <option value="one">Klarna</option>
                    <option value="one">Amazon Pay</option> */}
                          </select>
                        </li>
                        {action !== "" && (
                          <li className={styles.applyBtn}>
                            <button onClick={handleBulkAction}>Apply</button>
                          </li>
                        )}
                      </React.Fragment>
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>ORDER</th>
                      <th>DATE</th>
                      <th>CUSTOMER</th>
                      <th>TOTAL</th>
                      <th>STATUS</th>
                      <th>Billing</th>
                      {/* <th>LOCATION</th> */}
                      {/* <th>PAYMENT TYPE</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* @ts-ignore */}
                    {filterArrary?.map((order, i) => (
                      <OrderList
                        order={order}
                        key={order?._id}
                        checked={selected.includes(order?._id)}
                        onChecked={(id: string) => handleSelect(id)}
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
