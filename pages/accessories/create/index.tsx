/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "styles/order.module.scss";
import Toast from "components/toast";
import sizeArray from "constants/sizes";
import { useRouter } from "next/router";

/**
 * AccessoriesCreate
 * @returns
 */
function AccessoriesCreate() {
  const router = useRouter();

  const onSelectSize = (value: string) => {
    router.push(`/accessories/create/${value}`);
  };

  return (
    <>
      <div className={styles.rightsidebar}>
        {/* <DashboardHeader /> */}
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>
              Select Size For Icon Creation
            </div>
            <div className={styles["sizes-box"]}>
              <ul className={styles.productuploadtab}>
                {sizeArray.map(({ value }, index) => {
                  return (
                    <li key={index} onClick={() => onSelectSize(value)}>
                      {value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </>
  );
}

export default AccessoriesCreate;
