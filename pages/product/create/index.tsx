import React from "react";
import styles from "styles/order.module.scss";

import Select from "components/element/select";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
// const [dropWDownload, dropWDownloadActive] = useState(false);

function CreateProduct() {
  const [activeTab, setActiveTab] = React.useState("Basic");

  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>Create Product</div>
            <div
              className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <ul className={styles.productuploadtab}>
                {productSideTab.slice(0, 1).map(({ text }, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => onActiveTab(text)}
                      className={text === activeTab ? styles.active : ""}
                    >
                      {text}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.tabbox}>
                {/* {activeTab} */}
                <TabsRender tabName={activeTab} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CreateProduct;

const TabsRender = ({ tabName }: any) => {
  switch (tabName) {
    case "Basic":
      return (
        <div className="tabcontantinner">
          <h1>Basic Info</h1>
          <div className="box">
            <ul>
              <li>
                <Input type="text" label={"Product Name"} />
              </li>
              <li>
                <Textarea label="Product Description" />
              </li>
              {/* <li>
                <Input type="file" label={"Featured Image"} />
              </li> */}
              {/* <li>
                <Select
                  // multiple
                  options={[
                    { text: "Select", value: "" },
                    { text: "Hello", value: "Bye" },
                    { text: "Hello", value: "Bye" },
                    { text: "Hello", value: "Bye" },
                    { text: "Hello", value: "Bye" },
                    { text: "Hello", value: "Bye" },
                  ]}
                  label={"Select Category"}
                />
              </li> */}
              <br />
              <li>
                <ChipInput />
              </li>
              <br />
              {/* <li className="grid-2">
                <Input type="text" label={"Base Price"} />
                <Input type="text" label={"Price"} />
              </li> */}
            </ul>
            <div className={styles.buttonsection}>
              <AddMoreButton title="Create" />
            </div>
          </div>
        </div>
      );
    // case "size":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>Size</h1>
    //     </div>
    //   );
    // case "color":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>Color</h1>
    //     </div>
    //   );
    // case "headBoard":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>HeadBoard</h1>
    //     </div>
    //   );
    // case "storage":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>Storage</h1>
    //     </div>
    //   );
    // case "feet":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>Feet</h1>
    //     </div>
    //   );
    // case "mattress":
    //   return (
    //     <div className="tabcontantinner">
    //       <h1>Mattress</h1>
    //     </div>
    //   );

    default:
      return null;
  }
};
