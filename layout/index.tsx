import React from "react";
import Sidebar from "./sidebar";
import css from "styles/order.module.scss";
import { useRouter } from "next/router";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();

  // console.log(router.pathname.split("/").includes("accessories"));

  if (router.pathname == "/login" || router.pathname == "/register") {
    return (
      <div style={{ minHeight: "100vh", display: "flex" }}>{children}</div>
    );
  }

  return (
    <React.Fragment>
      <div className={css.mainouterbox}>
        <div className={css.rightleftbox}>
          <Sidebar />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
