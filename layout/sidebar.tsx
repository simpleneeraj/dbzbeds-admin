import React from "react";
import Link from "next/link";
import styles from "styles/order.module.scss";
import { SVGICONPROPS } from "typings/icon";
import ShoppingBag from "icons/ShoppingBag";
import AppsIcon from "icons/AppsIcon";
import DatabaseIcon from "icons/DatabaseIcon";
import { useRouter } from "next/router";
import BedIcon from "icons/BedIcon";
import ShieldIcon from "icons/ShieldIcon";
import CouponIcon from "icons/CouponIcon";

interface CommerceSidebarProps {
  active?: boolean;
}

const toLower = (text: string) => text.toLocaleLowerCase();

const Sidebar = ({ active }: CommerceSidebarProps) => {
  const router = useRouter();

  const paths = router.pathname.split(/[/]/g);
  return (
    <div className={styles.sidebar}>
      <div className={styles.brandlogo}>
        <h2>DBZ Beds</h2>
      </div>
      <div className={styles.sidenav}>
        <ul className={styles.nav}>
          {navigationArray.map(({ href, icon: SVG, title, active }, index) => {
            const isActive = router.asPath
              .split("/")
              .some((data) => active.includes(data));
            return (
              <li key={index} className={isActive ? styles.active : ""}>
                <Link href={href}>
                  <a>
                    <div className={styles.ianimg}>
                      <SVG />
                    </div>
                    <span>{title}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

const navigationArray = [
  {
    title: `Product`,
    href: `/product`,
    active: ["product"],
    icon: (props: SVGICONPROPS) => <AppsIcon {...props} />,
  },
  {
    title: `Build Your Bed`,
    href: `/build-your-bed`,
    active: ["build-your-bed"],
    icon: (props: SVGICONPROPS) => <BedIcon {...props} />,
  },
  {
    title: `Accessories`,
    href: `/accessories`,
    active: ["accessories"],
    icon: (props: SVGICONPROPS) => <DatabaseIcon {...props} />,
  },
  {
    title: `Order`,
    href: `/order`,
    active: ["order"],
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `Reviews`,
    href: `/reviews`,
    active: ["reviews"],
    icon: (props: SVGICONPROPS) => <ShieldIcon {...props} />,
  },
  {
    title: `User`,
    href: `/users`,
    active: ["Users"],
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `Add User`,
    href: `/newproduct/create`,
    active: ["User"],
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  // {
  //   title: `Add User`,
  //   href: `/newproduct/create`,
  //   icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  // },
  {
    title: `Coupons`,
    href: `/coupons`,
    active: ["coupons"],
    icon: (props: SVGICONPROPS) => <CouponIcon {...props} />,
  },
];
