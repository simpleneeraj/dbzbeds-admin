import React from "react";
import Link from "next/link";
import AddIcon from "icons/add";
import Styles from "styles/order.module.scss";
import { SVGICONPROPS } from "typings/icon";

interface CommerceSidebarProps {
  active?: boolean;
}

const Sidebar = ({ active }: CommerceSidebarProps) => {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.brandlogo}>
        <h2>DBZ Beds</h2>
      </div>
      <div className={Styles.sidenav}>
        <ul className={Styles.nav}>
          {navigationArray.map(({ href, icon: SVG, title }, index) => {
            return (
              <li key={index} className={active ? Styles.Active : ""}>
                <Link href={href}>
                  <a>
                    <div className={Styles.ianimg}>
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
    icon: (props: SVGICONPROPS) => <AddIcon {...props} />,
  },
  {
    title: `Accessories`,
    href: `/accessories`,
    icon: (props: SVGICONPROPS) => <AddIcon {...props} />,
  },
  {
    title: `Order`,
    href: `/order`,
    icon: (props: SVGICONPROPS) => <AddIcon {...props} />,
  },
];
