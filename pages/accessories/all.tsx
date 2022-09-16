/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import { ListAccessoriesTabs } from "components/product/accessories";
import accessoriesTabArray from "components/product/accessories/tabarray";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * AddBedAccessories
 * @returns
 */
function AllAccessories() {
  const [activeTab, setActiveTab] = React.useState("Color");

  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className={Styles.rightsidebar}>
        {/* <DashboardHeader /> */}
        <main className={Styles.main}>
          <div className={Styles.containerbox}>
            <div className={Styles.mainheading}>Add {activeTab}</div>
            <div
              className={` ${Styles.tablebox} ${Styles.mt2} ${Styles.productuploadtabbox}`}
            >
              <ul className={Styles.productuploadtab}>
                {accessoriesTabArray.map(({ value }, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => onActiveTab(value)}
                      className={value === activeTab ? Styles.active : ""}
                    >
                      {value}
                    </li>
                  );
                })}
              </ul>
              <div className={Styles.tabbox}>
                <ListAccessoriesTabs tabName={activeTab} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default AllAccessories;
