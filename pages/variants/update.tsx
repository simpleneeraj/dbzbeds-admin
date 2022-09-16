import React from "react";
import styles from "styles/order.module.scss";

import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import AccessoriesTabs from "components/product/upload/render";
// const [dropWDownload, dropWDownloadActive] = useState(false);

function CreateVariant() {
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
                        <div className={styles.mainheading}>Update Variant</div>
                        <div
                            className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
                        >
                            <ul className={styles.productuploadtab}>
                                {productSideTab.map(({ text }, index) => {
                                    return (
                                        <li
                                            key={index}
                                            onClick={() => onActiveTab(text)}
                                            className={
                                                text === activeTab
                                                    ? styles.active
                                                    : ""
                                            }
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={styles.tabbox}>
                                <AccessoriesTabs
                                    tabName={activeTab}
                                    onChange={(value: any) =>
                                        console.log(value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default CreateVariant;

// const TabsRender = ({ tabName }: any) => {
//   switch (tabName) {
//     case "General":
//       return (
//         <div className="tabcontantinner">
//           <h1>General</h1>
//           <div className="box">
//             <ul>
//               <li>
//                 <Input type="text" label={"Product Name"} />
//               </li>
//               <li>
//                 <Textarea label="Product Description" />
//               </li>
//               <li>
//                 <Input type="file" label={"Featured Image"} />
//               </li>
//               <li>
//                 <Select
//                   // multiple
//                   options={[
//                     { text: "Select", value: "" },
//                     { text: "Hello", value: "Bye" },
//                     { text: "Hello", value: "Bye" },
//                     { text: "Hello", value: "Bye" },
//                     { text: "Hello", value: "Bye" },
//                     { text: "Hello", value: "Bye" },
//                   ]}
//                   label={"Select Category"}
//                 />
//               </li>
//               <li>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <Input type="text" label={"Base Price"} />
//                   </div>
//                   <div className="col-md-6">
//                     <Input type="text" label={"Price"} />
//                   </div>
//                 </div>
//               </li>
//             </ul>
//             <div className={styles.buttonsection}>
//               <AddMoreButton title="Next" />
//             </div>
//           </div>
//         </div>
//       );
//     case "Size":
//       return (
//         <div className="tabcontantinner">
//           <h1>Size</h1>
//         </div>
//       );
//     case "Color":
//       return (
//         <div className="tabcontantinner">
//           <h1>Color</h1>
//         </div>
//       );
//     case "HeadBoard":
//       return (
//         <div className="tabcontantinner">
//           <h1>HeadBoard</h1>
//         </div>
//       );
//     case "Storage":
//       return (
//         <div className="tabcontantinner">
//           <h1>Storage</h1>
//         </div>
//       );
//     case "Feet":
//       return (
//         <div className="tabcontantinner">
//           <h1>Feet</h1>
//         </div>
//       );
//     case "Mattress":
//       return (
//         <div className="tabcontantinner">
//           <h1>Mattress</h1>
//         </div>
//       );

//     default:
//       return null;
//   }
// };
