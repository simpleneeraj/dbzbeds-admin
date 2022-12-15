import React from "react";
import Styles from "styles/order.module.scss";
import UserIcon from "icons/UserIcon";
import SearchIcon from "icons/SearchIcon";

const DashboardHeader = () => {
  return (
    <div className={Styles.topheaderdashboard}>
      <div className={Styles.leftside}>
        <div className={Styles.topsearch}>
          <input type="text" placeholder="Type Here...." />
          <button>
            {/* <Image
              src="/icons/search-line.svg"
              alt="search"
              width={24}
              height={24}
            /> */}
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className={Styles.rightside}>
        <div className={Styles.dropdownaction}>
          <div className={Styles.userimagewithtext}>
            <div className={Styles.text}>Admin</div>
            <div className={Styles.image}>
              <UserIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
