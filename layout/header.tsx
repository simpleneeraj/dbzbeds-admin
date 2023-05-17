/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/order.module.scss";
import UserIcon from "icons/UserIcon";
import SearchIcon from "icons/SearchIcon";
// import MenueIcon from "components/newproduct/svgicons/menue";
// import CloseIcon from "components/newproduct/svgicons/closeicon";
import useOnClickOutside from "hooks/useclick";
import MobileSidebar from "./mobilesidebar";
import Button from "components/element/button";
import { useFetchAllOrders, useGetMyself } from "network-requests/queries";
import { useLogout } from "network-requests/mutations";
import Router from "next/router";

const DashboardHeader = ({ customHeader }: any) => {
  const { data } = useGetMyself();
  // console.log({ data });
  const { mutate } = useLogout();

  const [searchText, setSearchText] = React.useState();
  const { data: search } = useFetchAllOrders(searchText);

  const [isNavigation, setNavigation] = React.useState(false);
  const onClickMenu = React.useCallback(() => {
    setNavigation(!isNavigation);
  }, [isNavigation]);
  const ref = useOnClickOutside(() => setNavigation(false));

  // FOR MODEL

  const [model, setModel] = React.useState(false);

  const userRef = useOnClickOutside(() => setModel(false));

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/login";
      },
    });
  };

  return (
    <>
      <section className={styles["mobilehaeder"]}>
        <div className={styles["mainheader"]}>
          <div className={styles["menu-bar"]}>
            <button
              className={styles["menubg"]}
              title="menu-icon"
              aria-label="menu-icon"
              onClick={onClickMenu}
            >
              {/* <MenueIcon /> */}
              <p className={styles["menutxt"]}>Menu</p>
            </button>
          </div>
          <div className={styles.mainlogo}>
            <img src="/image/wplogo.webp" alt="logo" />
          </div>
          <div className={styles.rightside}>
            <div className={styles.dropdownaction}>
              <div className={styles.userimagewithtext}>
                <div className={styles.text}>{data?.name}</div>
                <div className={styles.image}>
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["mobilesearchbar"]}>
        <div className={styles.leftside}>
          <div className={styles.topsearch}>
            <input type="text" placeholder="Search Products..." />
            <button>
              <SearchIcon />
            </button>
          </div>
        </div>
      </section>
      <section className={styles["mobileheader1"]}>
        <div className={styles.topheaderdashboard}>
          <div className={styles["menu-bar"]}>
            <button
              className={styles["menubg"]}
              title="menu-icon"
              aria-label="menu-icon"
              onClick={onClickMenu}
            >
              {/* <MenueIcon /> */}
              <p className={styles["menutxt"]}>Menu</p>
            </button>
          </div>
          <div className={styles.leftside}>
            <div className={styles.topsearch}>
              <input
                type="text"
                placeholder="Search Orders"
                value={searchText}
                onChange={(e) => {
                  Router.push(`/order?id=${e.target.value}`);
                }}
              />
              <button>
                <SearchIcon />
              </button>
            </div>
          </div>
          <div ref={userRef} className={styles.rightside}>
            <div className={styles.dropdownaction}>
              {model && <UserModel onClick={handleLogout} />}
              <div className={styles.userimagewithtext}>
                <div className={styles.text}>{data?.name} </div>
                <div className={styles.image} onClick={() => setModel(!model)}>
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          transform: `translateX(${isNavigation ? "0%" : "-100%"})`,
        }}
        className={styles["navigation-model"]}
      >
        <div ref={ref} className={styles["navigation-content"]}>
          <div className={styles["close-button"]}>
            <button
              title="close-icon"
              aria-label="close-icon"
              onClick={onClickMenu}
            >
              {/* <CloseIcon /> */}
            </button>
          </div>
          <MobileSidebar />
        </div>
      </section>
    </>
  );
};
export default DashboardHeader;

interface UserModel extends React.ComponentProps<typeof Button> {}

const UserModel = (props: UserModel) => {
  return (
    <div className={styles["user-model"]}>
      <Button {...props}>Log Out</Button>
    </div>
  );
};
