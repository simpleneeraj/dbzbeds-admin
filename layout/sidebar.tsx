import React from "react";
import Link from "next/link";
import styles from "styles/order.module.scss";
import { SVGICONPROPS } from "typings/icon";
import ShoppingBag from "icons/ShoppingBag";
import AppsIcon from "icons/AppsIcon";
import DatabaseIcon from "icons/DatabaseIcon";
import { useRouter } from "next/router";

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

export default Sidebar;

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
    title: `Order`,
    href: `/order`,
    icon: (props: SVGICONPROPS) => <ShoppingBag {...props} />,
  },
];
