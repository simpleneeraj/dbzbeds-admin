/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/order.module.scss";

import { AddAccessoriesTabs } from "components/product/accessories";
import accessoriesTabArray from "components/product/accessories/tabarray";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * AddBedAccessories
 * @returns
 */
function AddBedAccessories() {
  const [activeTab, setActiveTab] = React.useState("Color");

  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className={styles.rightsidebar}>
        {/* <DashboardHeader /> */}
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>Add {activeTab}</div>
            <div
              className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <ul className={styles.productuploadtab}>
                {accessoriesTabArray.map(({ value }, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => onActiveTab(value)}
                      className={value === activeTab ? styles.active : ""}
                    >
                      {value}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.tabbox}>
                <AddAccessoriesTabs tabName={activeTab} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddBedAccessories;
