/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/order.module.scss";
import { AddAccessoriesTabs } from "components/product/accessories";
import accessoriesTabArray from "components/product/accessories/tabarray";
import Toast from "components/toast";
import { useRouter } from "next/router";

/**
 * AddBedAccessories
 * @returns
 */
function AddBedAccessories() {
  const router = useRouter();

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
            <div className={styles.mainheading}>
              <span>
                Add{" "}
                <span
                  style={{
                    color: "#E91E63",
                  }}
                >
                  {router.query?.size}
                </span>
              </span>
              <span>{activeTab} Icons</span>
            </div>
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
      <Toast />
    </>
  );
}

export default AddBedAccessories;
