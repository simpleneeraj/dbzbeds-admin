/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
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
  console.log({ data });
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
      <section className={Styles["mobilehaeder"]}>
        <div className={Styles["mainheader"]}>
          <div className={Styles["menu-bar"]}>
            <button
              className={Styles["menubg"]}
              title="menu-icon"
              aria-label="menu-icon"
              onClick={onClickMenu}
            >
              {/* <MenueIcon /> */}
              <p className={Styles["menutxt"]}>Menu</p>
            </button>
          </div>
          <div className={Styles.mainlogo}>
            <img src="/image/wplogo.webp" alt="logo" />
          </div>
          <div className={Styles.rightside}>
            <div className={Styles.dropdownaction}>
              <div className={Styles.userimagewithtext}>
                <div className={Styles.text}>{data?.name}</div>
                <div className={Styles.image}>
                  <UserIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={Styles["mobilesearchbar"]}>
        <div className={Styles.leftside}>
          <div className={Styles.topsearch}>
            <input type="text" placeholder="Search Products..." />
            <button>
              <SearchIcon />
            </button>
          </div>
        </div>
      </section>
      <section className={Styles["mobileheader1"]}>
        <div className={Styles.topheaderdashboard}>
          <div className={Styles["menu-bar"]}>
            <button
              className={Styles["menubg"]}
              title="menu-icon"
              aria-label="menu-icon"
              onClick={onClickMenu}
            >
              {/* <MenueIcon /> */}
              <p className={Styles["menutxt"]}>Menu</p>
            </button>
          </div>
          <div className={Styles.leftside}>
            <div className={Styles.topsearch}>
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
          <div ref={userRef} className={Styles.rightside}>
            <div className={Styles.dropdownaction}>
              {model && <UserModel onClick={handleLogout} />}
              <div className={Styles.userimagewithtext}>
                <div className={Styles.text}>{data?.name} </div>
                <div className={Styles.image} onClick={() => setModel(!model)}>
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
        className={Styles["navigation-model"]}
      >
        <div ref={ref} className={Styles["navigation-content"]}>
          <div className={Styles["close-button"]}>
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
    <div className={Styles["user-model"]}>
      <Button {...props}>Log Out</Button>
    </div>
  );
};
