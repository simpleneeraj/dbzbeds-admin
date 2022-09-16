import React from "react";
import Image from "next/image";
import Styles from "styles/order.module.scss";

const DashboardHeader = () => {
  return (
    <div className={Styles.topheaderdashboard}>
      <div className={Styles.leftside}>
        <div className={Styles.topsearch}>
          <input type="text" placeholder="Type Hare...." />
          <button>
            <Image
              src="/icons/search-line.svg"
              alt="search"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className={Styles.rightside}>
        <div className={Styles.dropdownaction}>
          <div className={Styles.userimagewithtext}>
            <div className={Styles.text}>Simple Inc.</div>
            <div className={Styles.image}>
              <Image
                src="/icons/user-line.svg"
                alt="search"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
