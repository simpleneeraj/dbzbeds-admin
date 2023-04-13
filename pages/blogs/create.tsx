import pMap from "p-map";
import React, { useEffect, useState } from "react";
import Toast from "components/toast";
import replacer from "utils/replacer";
import { toast } from "react-toastify";
import Input from "components/element/input";
import ChipInput from "components/chip-input";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import { uploadBlogImage } from "network-requests/api";
import AddMoreButton from "components/element/addmore";
import { useCreateNewBlog } from "network-requests/mutations";
import DynamicImageGrid from "components/element/image-picker-grid";
import lazyAlert from "constants/lazy-alert";
import dynamic from "next/dynamic";
import { useImmer } from "use-immer";
import { useRouter } from "next/router";

const IRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

const Create = () => {
  const router = useRouter();

  const initialData = {
    name: "" as string,
    slug: "" as string,
    content: "" as string,
    images: [] as any,
    categories: [] as string[],
    metaTitle: "" as string,
    metaDescription: "" as string,
    keyWord: [] as string[],
  };

  const [state, setState] = useImmer(initialData);

  type Key = keyof typeof state;
  const onChangeState = React.useCallback(
    (key: Key, value: string | any) => {
      setState((draft) => {
        draft[key] = value;
      });
    },
    [setState]
  );

  const { mutate, isLoading } = useCreateNewBlog();

  // SUBMIT DATA TO DB
  const onSubmitData = React.useCallback(async () => {
    // Update image
    const getImageUrl = async (image: any) => {
      if (image) {
        const imageUrl = await uploadBlogImage(image as Blob);
        return imageUrl;
      }
      return "";
    };
    const imagesUrl = (await pMap(state.images, getImageUrl)) as string[];
    if (state.categories.length <= 0) await lazyAlert("Blog Category Required");

    const data = {
      ...state,
      images: imagesUrl,
    };

    mutate(data, {
      onSuccess: (data) => {
        router.back();
        toast.success(data?.message || "Blog Created Successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  }, [mutate, state]);

  return (
    <React.Fragment>
      <Toast />
      <div className={styles.rightsidebar}>
        <DashboardHeader />

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
            <div className={styles.mainheading}>Create Blog</div>
            <div
              className={`${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <div className={styles.tabbox}>
                <div className="tabcontantinner">
                  <h2> Blog Information</h2>
                  <div className="box">
                    <ul>
                      <li>
                        <Input
                          name="name"
                          type="text"
                          label={"Blog Heading"}
                          placeholder="Enter blog title"
                          onChange={({ target }) =>
                            onChangeState("name", target.value)
                          }
                        />
                      </li>
                      <li>
                        <Input
                          name="slug"
                          type="text"
                          label={"Slug (uniq for every blog)"}
                          placeholder="Auto Generated"
                          value={state.slug}
                          // onChange={handleInputChange}
                          onChange={({ target }) =>
                            onChangeState("slug", target.value)
                          }
                        />
                      </li>
                      <li>
                        <br />
                        <label htmlFor="">Content</label> <br />
                        <br />
                        <IRichTextEditor
                          id="rte"
                          sticky={false}
                          value={state.content}
                          onChange={(value, delta, sources) =>
                            onChangeState("content", value)
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
                          onChange={(target) =>
                            onChangeState("categories", target)
                          }
                          placeholder="Add Category..."
                        />
                      </li>
                      <br />
                      <h2>SEO</h2>
                      <li>
                        <Input
                          name="metaTitle"
                          type="text"
                          label={"Meta Title"}
                          placeholder="Enter meta title"
                          value={state.metaTitle}
                          // onChange={handleInputChange}
                          onChange={({ target }) =>
                            onChangeState("metaTitle", target.value)
                          }
                        />
                      </li>
                      <li>
                        <Input
                          name="metaDescription"
                          type="text"
                          label={"Meta Description"}
                          placeholder="Enter meta description"
                          value={state.metaDescription}
                          // onChange={handleInputChange}
                          onChange={({ target }) =>
                            onChangeState("metaDescription", target.value)
                          }
                        />
                      </li>

                      <li className="grid">
                        <ChipInput
                          label={`Key Word`}
                          placeholder="Add Key-Word"
                          onChange={(value) => onChangeState("keyWord", value)}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <h2>Blog Image</h2>
                <div className={styles["box"]}>
                  <ul>
                    <li>
                      <DynamicImageGrid
                        getValue={(value) => onChangeState("images", value)}
                        initialValue={state.images}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.mainheading}>
              <AddMoreButton title="Submit Blog Data" onClick={onSubmitData} />
            </div>
          </div>
          <br />
          <br />
        </main>
      </div>
    </React.Fragment>
  );
};

export default Create;

// const [state, setBlogInfoInputs] = React.useState<any>({
//   name: "" as string,
//   slug: "" as string,
//   content: "" as string,
//   images: [] as any,
//   categories: [] as string[],
//   metaTitle: "" as string,
//   metaDescription: "" as string,
//   keyWord: [] as string[],
// });
// const [renderHtml, setRenderHtml] = React.useState("");

// const handleAddChip = React.useCallback(
//   (value: string[]) => {
//     setBlogInfoInputs({
//       ...blogInfoInputs,
//       categories: value,
//     });
//   },
//   [blogInfoInputs]
// );

// const handleAddChipKeyWord = React.useCallback(
//   (value: string[]) => {
//     setBlogInfoInputs({
//       ...blogInfoInputs,
//       keyWord: value,
//     });
//   },
//   [blogInfoInputs]
// );

// const handleInputChange = React.useCallback(
//   (event: E) => {
//     switch (event.target.name) {
//       case "slug":
//         setBlogInfoInputs({
//           ...blogInfoInputs,
//           [event.target.name]: replacer(event.target.value),
//         });
//         break;
//       case "content":
//         setBlogInfoInputs({
//           ...blogInfoInputs,
//           content: event,
//         });
//         break;
//       default:
//         setBlogInfoInputs({
//           ...blogInfoInputs,
//           [event.target.name]: event.target.value,
//         });
//         break;
//     }
//   },
//   [blogInfoInputs]
// );
// const handleContentChange = React.useCallback(
//   (value: E) => {
//     setBlogInfoInputs({
//       ...blogInfoInputs,
//       content: value,
//     });
//   },
//   [blogInfoInputs]
// );
// console.log(blogInfoInputs);
