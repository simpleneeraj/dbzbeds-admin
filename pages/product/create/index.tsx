import pMap from "p-map";
import React from "react";
import Toast from "components/toast";
import replacer from "utils/replacer";
import { toast } from "react-toastify";
import Input from "components/element/input";
import ChipInput from "components/chip-input";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import Textarea from "components/element/textarea";
import { uploadBedImage } from "network-requests/api";
import AddMoreButton from "components/element/addmore";
import { useCreateNewBed } from "network-requests/mutations";
import DynamicImageGrid from "components/element/image-picker-grid";
import lazyAlert from "constants/lazy-alert";
import { Router, useRouter } from "next/router";
import dynamic from "next/dynamic";
const IRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

type E = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function CreateProduct() {
  const [bedInfoInputs, setBedInfoInputs] = React.useState<any>({
    name: "" as string,
    slug: "" as string,
    description: "" as string,
    categories: [] as string[],
    images: [] as any,
    metaTitle: "",
    metaDescription: "",
  });

  const router = useRouter();
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
          router.back();
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  }, [bedInfoInputs, mutate, router]);

  console.log({ bedInfoInputs });

  return (
    <React.Fragment>
      <Toast />
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        {/* <div className={styles["overlay"]}></div> */}
        <main className={styles.main}>
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
            <div className={styles.mainheading}>Create Product</div>
            <div
              className={`${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <div className={styles.tabbox}>
                <div className="tabcontantinner">
                  <h2>SEO</h2>
                  <div className="box">
                    <ul>
                      <li>
                        <Input
                          name="metaTitle"
                          type="text"
                          label={"Meta Title"}
                          placeholder="Enter Meta Title"
                          onChange={handleInputChange}
                          value={bedInfoInputs.metaTitle}
                        />
                      </li>
                      <li>
                        <Textarea
                          name="metaDescription"
                          label={"Meta Description"}
                          placeholder="Enter Meta Description"
                          value={bedInfoInputs.metaDescription}
                          onChange={handleInputChange}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <br />
                <div className="tabcontantinner">
                  <h2>Basic Info</h2>
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
                        <Input
                          name="slug"
                          type="text"
                          label={"Slug (uniq for every product)"}
                          placeholder="Auto Generated"
                          value={bedInfoInputs.slug}
                          onChange={handleInputChange}
                        />
                      </li>
                      <li>
                        {/* <Textarea
                          name="description"
                          placeholder="Enter product description"
                          label="Product Description"
                          onChange={handleInputChange}
                        /> */}
                        <IRichTextEditor
                          id="rte"
                          sticky={false}
                          value={bedInfoInputs.description}
                          onChange={(value, delta, sources) =>
                            setBedInfoInputs({
                              ...bedInfoInputs,
                              description: value,
                            })
                          }
                          placeholder="Type Here"
                          controls={[
                            ["bold", "italic", "underline"],
                            ["link", "image", "video", "blockquote", "code"],
                            ["unorderedList", "h1", "h2", "h3"],
                            ["alignLeft", "alignCenter", "alignRight"],
                          ]}
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
