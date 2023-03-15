/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Link from "next/link";
import styles from "styles/order.module.scss";
import { SVGICONPROPS } from "typings/icon";
import ShoppingBag from "icons/ShoppingBag";
import AppsIcon from "icons/AppsIcon";
import DatabaseIcon from "icons/DatabaseIcon";
import { useRouter } from "next/router";
import ShieldIcon from "icons/ShieldIcon";
import Image from "next/image";

interface CommerceSidebarProps {
  active?: boolean;
}

const toLower = (text: string) => text.toLocaleLowerCase();

const MobileSidebar = ({ active }: CommerceSidebarProps) => {
  const router = useRouter();

  const paths = router.pathname.split(/[/]/g);
  return (
    <div className={styles.mobsidebar} id="sidebar">
      <div className={styles.brandlogo}>
        <div className={styles.flex}>
          <a href="#">
            <Image src="/wplogo.webp" width="60" height="60" />
            <h2>Beds divans</h2>
          </a>
        </div>
      </div>
      <div className={styles.sidenav}>
        <ul className={styles.nav}>
          {navigationArray.map(({ href, icon: SVG, title }, index) => {
            // console.log();
            const isActive = paths.includes(toLower(title));
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

export default MobileSidebar;

// const navigationArray = [
//     {
//       title: `Product`,
//       href: `/product`,
//       active: ["product"],
//       icon: (props: SVGICONPROPS) => <AppsIcon {...props} />,
//     },
//     {
//       title: `Build Your Bed`,
//       href: `/build-your-bed`,
//       active: ["build-your-bed"],
//       icon: (props: SVGICONPROPS) => <BedIcon {...props} />,
//     },
//     {
//       title: `Accessories`,
//       href: `/accessories`,
//       active: ["accessories"],
//       icon: (props: SVGICONPROPS) => <DatabaseIcon {...props} />,
//     },
//     {
//       title: `Order`,
//       href: `/order`,
//       active: ["order"],
//       icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
//     },
//     {
//       title: `Reviews`,
//       href: `/reviews`,
//       active: ["reviews"],
//       icon: (props: SVGICONPROPS) => <ShieldIcon {...props} />,
//     },
//     {
//       title: `Coupons`,
//       href: `/coupons`,
//       active: ["coupons"],
//       icon: (props: SVGICONPROPS) => <CouponIcon {...props} />,
//     },
//   ];

const navigationArray = [
  {
    title: `Product`,
    href: `/product`,
    icon: (props: SVGICONPROPS) => <AppsIcon {...props} />,
  },
  {
    title: `Accessories`,
    href: `/accessories`,
    icon: (props: SVGICONPROPS) => <DatabaseIcon {...props} />,
  },
  {
    title: `Headboard`,
    href: `/headboard`,
    icon: (props: SVGICONPROPS) => <DatabaseIcon {...props} />,
  },
  {
    title: `Order`,
    href: `/order`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `User`,
    href: `/users`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `New Product`,
    href: `/newproduct`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `Coupons`,
    href: `/coupons`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: `Reviews`,
    href: `/reviews`,
    active: ["reviews"],
    icon: (props: SVGICONPROPS) => <ShieldIcon {...props} />,
  },
  {
    title: `Add User`,
    href: `/newproduct/create`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
  {
    title: ` Category`,
    href: `/newproduct/addcategory`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
];
