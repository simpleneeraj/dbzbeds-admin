import React from "react";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";

const AdminHome = () => {
  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <main>
        <h1>Product Overview</h1>
      </main>
    </div>
  );
};
export default AdminHome;
