import React from "react";
import styles from "styles/order.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
import {
    useCreateNewBed,
    useCreateNewHeadboard,
} from "network-requests/mutations";
import { toast } from "react-toastify";
import Toast from "components/toast";
import { useRouter } from "next/router";

function CreateProduct() {
    const [activeTab, setActiveTab] = React.useState("Basic");

    const onActiveTab = (value: string) => {
        setActiveTab(value);
    };

    return (
        <React.Fragment>
            <Toast />
            <div className={styles.rightsidebar}>
                <DashboardHeader />
                <main className={styles.main}>
                    <div className={styles.containerbox}>
                        <div className={styles.mainheading}>
                            Create Headboard
                        </div>
                        <div
                            className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
                        >
                            <ul className={styles.productuploadtab}>
                                {productSideTab
                                    .slice(0, 1)
                                    .map(({ text }, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() =>
                                                    onActiveTab(text)
                                                }
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
                                <TabsRender tabName={activeTab} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

export default CreateProduct;

const TabsRender = ({ tabName }: any) => {
    switch (tabName) {
        case "Basic":
            return <Basic />;
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

const Basic = () => {
    const router = useRouter();
    const [headboard, setHeadboard] = React.useState({
        name: "" as string,
        description: "" as string,
        categories: [] as string[],
    });

    //API POST
    const { mutate, isLoading } = useCreateNewHeadboard();

    const handleAddChip = React.useCallback(
        (value: string[]) => {
            setHeadboard({ ...headboard, categories: value });
        },
        [headboard]
    );

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setHeadboard({ ...headboard, [event.target.name]: event.target.value });
    };

    const handleheadboardCreate = React.useCallback(async () => {
        // if (bed.name) await lazyAlert("Product Name Required");
        // if (bed.description) await lazyAlert("Product Description Required");
        if (headboard.categories.length <= 0)
            await lazyAlert("Product Category Required");
        mutate(headboard as any, {
            onSuccess: (data) => {
                toast.success(data?.message || "Product Created Successfully");
            },
            onError: () => {
                toast.error("Something went wrong");
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headboard]);

    return (
        <div className="tabcontantinner">
            <h1>Basic Info</h1>
            <div className="box">
                <ul>
                    <li>
                        <Input
                            name="name"
                            type="text"
                            label={"Product Name"}
                            placeholder="Enter product name"
                            onChange={handleInputChange}
                        />
                    </li>
                    <li>
                        <Textarea
                            name="description"
                            placeholder="Enter product description"
                            label="Product Description"
                            onChange={handleInputChange}
                        />
                    </li>

                    <li className="grid">
                        <ChipInput
                            label={`Category`}
                            onChange={handleAddChip}
                            placeholder="Add Category..."
                        />
                    </li>
                </ul>
                <div className={styles.buttonsection}>
                    <AddMoreButton
                        title="Create"
                        onClick={handleheadboardCreate}
                    />
                </div>
            </div>
        </div>
    );
};

{
    /* <li>
          <Input type="file" label={"Featured Image"} />
        </li> */
}
{
    /* <li>
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
        </li> */
}
{
    /* <li className="grid-2">
          <Input type="text" label={"Base Price"} />
          <Input type="text" label={"Price"} />
        </li> */
}

const lazyAlert = (succes?: any, error?: any) => {
    return new Promise((resolve, reject) => {
        resolve(alert(succes));
        reject(alert(error));
    });
};
