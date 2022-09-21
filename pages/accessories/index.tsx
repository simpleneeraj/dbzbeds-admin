/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Button from "components/element/button";
import { UpdateAccessoriesTabs } from "components/product/accessories";
import accessoriesTabArray from "components/product/accessories/tabarray";
import Toast from "components/toast";
import { useFetchAllIconByTypeAndSize } from "network-requests/queries";
import sizeArray from "constants/sizes";

/**
 * AddBedAccessories
 * @returns
 */
function AllAccessories() {
  const [activeTab, setActiveTab] = React.useState("Color");
  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  const router = useRouter();
  const [size, setSize] = React.useState("2 Feet");

  const { data } = useFetchAllIconByTypeAndSize("COLOR", size);

  const onSetSize = (size: string) => {
    router.push(`/accessories/create/${size}`);
  };

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>
              All {activeTab}
              <Button onClick={() => router.push(`/accessories/create`)}>
                Create New{" "}
              </Button>
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
                <div className={styles.segment}>
                  {sizeArray.map(({ text, value }, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => onSetSize(value)}
                        style={{
                          background: size === value ? "#2196f3" : "#fff",
                        }}
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
                <UpdateAccessoriesTabs tabName={activeTab} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </>
  );
}

export default AllAccessories;
