import pMap from "p-map";
import React from "react";
import Toast from "components/toast";
import replacer from "utils/replacer";
import { toast } from "react-toastify";
import Input from "components/element/input";
import ChipInput from "components/chip-input";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import { uploadBedImage } from "network-requests/api";
import AddMoreButton from "components/element/addmore";
import { useCreateNewBed } from "network-requests/mutations";
import DynamicImageGrid from "components/element/image-picker-grid";
import lazyAlert from "constants/lazy-alert";
import Router from "next/router";
import { useCheckSlugAvailability } from "network-requests/queries";
// import RichTextEditor from "components/rich-text-editor";
import Textarea from "components/element/textarea";

type E = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function CreateProduct() {
  const [bedInfoInputs, setBedInfoInputs] = React.useState<any>({
    name: "" as string,
    slug: "" as string,
    description: "" as string,
    categories: [] as string[],
    images: [] as any,
  });

  const { data: slugAvailability, isFetched }: any = useCheckSlugAvailability(
    bedInfoInputs.slug
  );
  //API POST
  const { mutate, isLoading } = useCreateNewBed();

  const handleAddChip = React.useCallback(
    (value: string[]) => {
      setBedInfoInputs({ ...bedInfoInputs, categories: value });
    },
    [bedInfoInputs]
  );

  const handleInputChange = React.useCallback(
    (event: E) => {
      switch (event.target.name) {
        case "slug":
          setBedInfoInputs({
            ...bedInfoInputs,
            [event.target.name]: replacer(event.target.value),
          });
          break;
        default:
          setBedInfoInputs({
            ...bedInfoInputs,
            [event.target.name]: event.target.value,
          });
          break;
      }
    },
    [bedInfoInputs]
  );

  // SUBMIT DATA TO DB
  const handleBedCreate = React.useCallback(async () => {
    if (!slugAvailability?.success) {
      return toast.error("Slug is already taken, please try another one");
    }

    const getImageUrl = async (image: any) => {
      if (image) {
        const imageUrl = await uploadBedImage(image as Blob);
        return imageUrl;
      }
      return "";
    };

    const imagesUrl = await pMap(bedInfoInputs.images, getImageUrl);
    if (bedInfoInputs.categories.length <= 0)
      await lazyAlert("Product Category Required");
    mutate(
      {
        ...bedInfoInputs,
        images: imagesUrl,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Product Created Successfully");
          Router.reload();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bedInfoInputs]);

  const handleDescription = React.useCallback(
    (key: string, value: string) => {
      setBedInfoInputs({
        ...bedInfoInputs,
        [key]: value,
      });
    },
    [bedInfoInputs]
  );

  console.log(bedInfoInputs);
  return (
    <React.Fragment>
      <Toast />
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        {/* <div className={styles["overlay"]}></div> */}
        <main className={styles.main}>
          <div className={styles.mainheading}>Create Product</div>
          <div
            className={styles.containerbox}
            style={
              isLoading
                ? {
                    opacity: 0.5,
                    pointerEvents: "none",
                    userSelect: "none",
                  }
                : {}
            }
          >
            <div
              className={`${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <div className={styles.tabbox}>
                <div className="tabcontantinner">
                  <h2>Basic Info</h2>
                  <div className={styles.inputbox}>
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
                        <Input
                          name="slug"
                          type="text"
                          style={{
                            border:
                              !slugAvailability?.success && isFetched
                                ? "2px solid red"
                                : "2px solid green",
                          }}
                          label={"Slug (uniq for every product)"}
                          placeholder="Auto Generated"
                          value={bedInfoInputs.slug}
                          onChange={handleInputChange}
                        />
                        {!slugAvailability?.success && isFetched && (
                          <p
                            style={{
                              color: "red",
                            }}
                          >
                            {slugAvailability?.message ||
                              "Slug already exists. Please try another one"}
                          </p>
                        )}
                      </li>
                      <li>
                        {/* <Textarea
                          name="description"
                          placeholder="Enter product description"
                          label="Product Description"
                          onChange={handleInputChange}
                        /> */}
                        <li className={styles["grid"]}>
                          {/* <Textarea
                          name="description"
                          placeholder="Enter product description"
                          label="Product Description"
                          onChange={handleInputChange}
                          value={bedInfoInputs.description}
                        /> */}
                          <div className={styles["list-container"]}>
                            <label className={styles["label"]}>
                              Description
                            </label>
                            {/* <RichTextEditor
                              style={{
                                minHeight: `300px`,
                              }}
                              value={bedInfoInputs.description}
                              onChange={(value) =>
                                handleDescription("description", value)
                              }
                              controls={[
                                ["bold", "italic", "underline"],
                                ["alignLeft", "alignCenter", "alignRight"],
                                ["unorderedList", "orderedList"],
                                ["h1", "h2", "h3", "h4"],
                                ["sup", "sub"],
                              ]}
                            /> */}
                            <Textarea
                              name="description"
                              label=" Description"
                              className={styles.tabcontantinnerinput}
                              value={bedInfoInputs.description}
                              onChange={({ target }) =>
                                handleDescription("description", target.value)
                              }
                            />
                          </div>
                        </li>
                      </li>
                      <li className="grid">
                        <ChipInput
                          label={`Category`}
                          onChange={handleAddChip}
                          placeholder="Add Category..."
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <h2>Cover Images</h2>
                <div className={styles["box"]}>
                  <ul>
                    <li>
                      <DynamicImageGrid
                        getValue={(value) =>
                          setBedInfoInputs({
                            ...bedInfoInputs,
                            images: value,
                          })
                        }
                        initialValue={bedInfoInputs.images}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.mainheading}>
              <AddMoreButton
                title="Submit Product Data"
                onClick={handleBedCreate}
              />
            </div>
          </div>
          <br />
          <br />
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateProduct;
