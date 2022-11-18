import React from "react";
import styles from "styles/order.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
import { useUpdateBed, useUpdateHeadboard } from "network-requests/mutations";
import { toast } from "react-toastify";
import Toast from "components/toast";
import { useRouter } from "next/router";
import {
    useFetchBedById,
    useFetchHeadboardById,
} from "network-requests/queries";

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
                        <div className={styles.mainheading}>Update Product</div>
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
                                {/* {activeTab} */}
                                <TabsRender
                                    tabName={activeTab}
                                    // onChange={(value: any) => console.log(value)}
                                />
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
        default:
            return null;
    }
};

const Basic = () => {
    const router = useRouter();
    const [bed, setBed] = React.useState({
        name: "" as string,
        description: "" as string,
        categories: [] as string[],
        isDraft: false,
    });
    const { data } = useFetchHeadboardById(router.query.id as string);
    // INITILIZE OLD DATA IN STATE
    React.useEffect(() => {
        setBed({
            name: data?.name as string,
            description: data?.description as string,
            categories: data?.categories as string[],
            isDraft: data?.isDraft as boolean,
        });
    }, [data]);

    //API POST
    const { mutate, isLoading } = useUpdateHeadboard(
        router.query?.id as string
    );

    const handleAddChip = React.useCallback(
        (value: string[]) => {
            setBed({ ...bed, categories: value });
        },
        [bed]
    );

    const handleIsDraft = React.useCallback(
        (value: boolean) => {
            setBed({ ...bed, isDraft: value });
        },
        [bed]
    );

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setBed({ ...bed, [event.target.name]: event.target.value });
    };

    const handleBedUpdate = React.useCallback(() => {
        mutate(
            {
                name: bed.name,
                description: bed.description,
                categories: bed.categories,
                isDraft: bed.isDraft,
            },
            {
                onSuccess: (data) => {
                    toast.success(
                        data?.message || "Product Updated Successfully"
                    );
                    // if (window.confirm(`Do you want go to products page`)) {
                    //   router.back();
                    // }
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bed]);

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
                            value={bed.name}
                        />
                    </li>
                    <li>
                        <Textarea
                            name="description"
                            placeholder="Enter product description"
                            label="Product Description"
                            onChange={handleInputChange}
                            value={bed.description}
                        />
                    </li>

                    <li className="grid">
                        <ChipInput
                            label={`Category`}
                            onChange={handleAddChip}
                            placeholder="Add Category..."
                            value={bed.categories}
                        />
                    </li>
                    <li>
                        is draft
                        <input
                            type="checkbox"
                            checked={bed?.isDraft}
                            onChange={(e) => handleIsDraft(e.target.checked)}
                        />
                    </li>
                </ul>

                <div className={styles.buttonsection}>
                    <AddMoreButton title="Update" onClick={handleBedUpdate} />
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
