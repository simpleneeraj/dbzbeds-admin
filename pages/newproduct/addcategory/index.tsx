import React from "react";
import styles from "styles/newproduct/category.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
import { useCreateNewBed } from "network-requests/mutations";
import { toast } from "react-toastify";
import Toast from "components/toast";
import { useRouter } from "next/router";
import ApplyButton from "components/newproduct/button/apply";
import RichTextEditor from "components/rich-text";

function AddCategory() {
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
            <div className={styles.mainheading}>Add New Category</div>
            <div
              className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              {/* <ul className={styles.productuploadtab}>
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
              </ul> */}
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

export default AddCategory;

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
  });

  //API POST
  const { mutate, isLoading } = useCreateNewBed();

  const handleAddChip = React.useCallback(
    (value: string[]) => {
      setBed({ ...bed, categories: value });
    },
    [bed]
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBed({ ...bed, [event.target.name]: event.target.value });
  };

  const handleBedCreate = React.useCallback(async () => {
    // if (bed.name) await lazyAlert("Product Name Required");
    // if (bed.description) await lazyAlert("Product Description Required");
    if (bed.categories.length <= 0)
      await lazyAlert("Product Category Required");
    mutate(bed, {
      onSuccess: (data) => {
        toast.success(data?.message || "Product Created Successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bed]);

  return (
    <div className="tabcontantinner">
      {/* <h1>Basic Info</h1> */}
      <div className="box">
        <ul>
          <li>
            <Input
              name="name"
              type="text"
              label={" Name"}
              //   placeholder="Enter Category Name"
              onChange={handleInputChange}
              className={styles.tabcontantinnerinput}
            />
            <h5 className={styles.inputheading}>
              The name is how it appears on your site.
            </h5>
          </li>{" "}
          <li>
            <Input
              name="name"
              type="text"
              label={" Slug"}
              //   placeholder="Enter Category Name"
              onChange={handleInputChange}
              className={styles.tabcontantinnerinput}
            />
            <h5 className={styles.inputheading}>
              The “slug” is the URL-friendly version of the name. It is usually
              all lower case and contains only letters, numbers, and hyphens.
            </h5>
          </li>
          <li>
            {" "}
            <div className={styles.subsubsubactionbtnlist}>
              <div className={styles.findactionbtn}>
                <div className={styles.selectcategory}>
                  <select
                    name="category"
                    id=""
                    className={styles.tabcontantinnerinput}
                  >
                    <option value="All category">None</option>
                    <option value="All category">Parent category</option>
                  </select>{" "}
                  <h5 className={styles.inputheading}>
                    The name is how it appears on your The name is how it
                    appears on your site The name is how it appears on your.
                  </h5>
                </div>
              </div>
            </div>
          </li>
          <li>
            {/* <Textarea
              name="description"
              //   placeholder="Enter  Description"
              label=" Description"
              onChange={handleInputChange}
              className={styles.tabcontantinnerinput}
            /> */}
            <RichTextEditor />
          </li>
          <li>
            {" "}
            <div className={styles.subsubsubactionbtnlist}>
              <div className={styles.findactionbtn}>
                <div className={styles.selectcategory}>
                  <select
                    name="category"
                    id=""
                    className={styles.tabcontantinnerinput}
                  >
                    <option value="All category">Display type</option>
                    <option value="All category">Standards</option>
                    <option value="All category">Products</option>{" "}
                    <h5 className={styles.inputheading}>
                      The name is how it appears on your The name is how it
                      appears on your site The name is how it appears on your.
                    </h5>
                  </select>
                </div>
              </div>
            </div>
          </li>
          {/* <li className="grid">
            <ChipInput
              label={`Category`}
              onChange={handleAddChip}
              placeholder="Add Category..."
            />
          </li> */}{" "}
          {/* <li className="grid">
            <ChipInput
              label={`Category`}
              onChange={handleAddChip}
              placeholder="Add Category..."
            />
          </li> */}
        </ul>
        <div className={styles.buttonsection}>
          <AddMoreButton title="Create" onClick={handleBedCreate} />
        </div>
      </div>
    </div>
  );
};

const lazyAlert = (succes?: any, error?: any) => {
  return new Promise((resolve, reject) => {
    resolve(alert(succes));
    reject(alert(error));
  });
};
