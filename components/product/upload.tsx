import React from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "styles/order.module.scss";
import LinkIcon from "icons/LinkIcon";

interface CommerceSidebarProps {}
const ProductUploadSidebar = (props: CommerceSidebarProps) => {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.brandlogo}>
        <h2>DBZ Beds</h2>
      </div>
      <div className={Styles.sidenav}>
        <ul className={Styles.nav}>
          <li className={Styles.active}>
            <Link href="/admin/commerce/create">
              <a>
                <div className={Styles.ianimg}>
                  <LinkIcon fill="red" />
                </div>
                <span>Create </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/commerce/add-color">
              <a>
                <div className={Styles.ianimg}>
                  <Image
                    src="/icons/link.svg"
                    alt="link"
                    width={24}
                    height={24}
                  />
                </div>
                <span>Add Color</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductUploadSidebar;
