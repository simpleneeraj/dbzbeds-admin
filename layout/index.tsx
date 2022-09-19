import React from "react";
import Sidebar from "./sidebar";
import css from "styles/order.module.scss";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  // const router = useRouter();

  // console.log(router.pathname.split("/").includes("accessories"));

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
