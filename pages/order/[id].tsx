/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";

function SingleOrderPreview() {
  const router = useRouter();
  console.log(router.query?.id);
  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>Orders No #143567 </div>

            <div className={styles.singleorderpage}>
              <div className={styles.actionbtn}>
                <ul>
                  <li>
                    <Link href={`/order/${router.query?.id}/invoice`}>
                      <a>Print Invoice</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={styles.orderdetails}>
                <div className={styles.col}>
                  <div className={styles.box}>
                    <div className={styles.wdheading}>Order Info</div>
                    <ul>
                      <li>
                        ID : <span>OR-325548</span>
                      </li>
                      <li>
                        Date Time : <span> 01 Jan 2021 06:32</span>
                      </li>
                      <li>
                        Payment Method : <span>Credit Card</span>
                      </li>
                      <li>
                        Invoice : <span>IN-302240</span>
                      </li>
                      <li>
                        Status : <span>Completed</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.col}>
                  <div className={styles.box}>
                    <div className={styles.wdheading}>Customer Details</div>
                    <div className={styles.swdheading}>Billing</div>
                    <div className={styles.Billingbox}>
                      <p>Laszlo Papp 325 Martin way London SW20 9BT</p>

                      <ul>
                        <li>
                          {" "}
                          <span>Email address:</span> 325martinway@gmail.com
                        </li>
                        <li>
                          <span>Phone:</span> 07592160865
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.col}>
                  <div className={styles.box}>
                    <div className={` ${styles.wdheading}  ${styles.texttrp}`}>
                      Customer Details{" "}
                    </div>
                    <div className={styles.swdheading}>Shipping</div>
                    <div className={styles.Billingbox}>
                      <p>Laszlo Papp 325 Martin way London SW20 9BT</p>

                      <ul>
                        <li>
                          {" "}
                          <span>Email address:</span> 325martinway@gmail.com
                        </li>
                        <li>
                          <span>Phone:</span> 07592160865
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.productdetailslist}>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Value</th>
                      <th>Cost</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody className={styles.woocmproduct}>
                    <tr>
                      <td>
                        <div className={styles.productimage}>
                          <div className={styles.image}>
                            <img
                              src={`https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80`}
                              height={100}
                              width={100}
                              alt="productimage"
                            />
                          </div>
                          <div className={styles.text}>
                            Platform Top Divan Bed Base FREE UK DELIVERY
                          </div>
                        </div>
                      </td>
                      <td></td>
                      <td>£0.00</td>
                      <td>1 (1*1)</td>
                      <td>£0.00</td>
                    </tr>

                    <tr>
                      <td>Choose Colour</td>
                      <td>Grey Linen</td>
                      <td>£99.00</td>
                      <td>1 (1*1)</td>
                      <td>£99.00</td>
                    </tr>
                    <tr>
                      <td>Select Your Size</td>
                      <td>4FT 6 - Double - £179</td>
                      <td>£100.00</td>
                      <td>1 (1*1)</td>
                      <td>£100.00</td>
                    </tr>

                    <tr>
                      <td>Storage</td>
                      <td>No Storage</td>
                      <td>£100.00</td>
                      <td>1 (1*1)</td>
                      <td>£100.00</td>
                    </tr>

                    <tr>
                      <td>Select Your Feet</td>
                      <td>Chrome Gliders - £20</td>
                      <td>£20.00</td>
                      <td>1 (1*1)</td>
                      <td>£20.00</td>
                    </tr>

                    <tr>
                      <td>Select Your Headboard</td>
                      <td>No HeadBoard</td>
                      <td>£20.00</td>
                      <td>1 (1*1)</td>
                      <td>£20.00</td>
                    </tr>

                    <tr>
                      <td>Select Your Mattress</td>
                      <td>No Mattress</td>
                      <td>£20.00</td>
                      <td>1 (1*1)</td>
                      <td>£20.00</td>
                    </tr>

                    <tr>
                      <td>
                        <div className={styles.productimage}>
                          <div className={styles.image}>
                            <img
                              src={`https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80`}
                              height={100}
                              width={100}
                              alt="productimage"
                            />
                          </div>
                          <div className={styles.text}>
                            Platform Top Divan Bed Base FREE UK DELIVERY
                          </div>
                        </div>
                      </td>
                      <td></td>
                      <td>£0.00</td>
                      <td>1 (1*1)</td>
                      <td>£0.00</td>
                    </tr>
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

export default SingleOrderPreview;
