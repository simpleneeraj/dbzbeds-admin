import IosAlert from "components/ios-alert";
import DashboardHeader from "layout/header";
import React from "react";
import styles from "styles/order.module.scss";

const AdminHome = () => {
  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      {/* <IosAlert /> */}
      <main>
        <h1>Product Overview</h1>
      </main>
    </div>
  );
};
export default AdminHome;
