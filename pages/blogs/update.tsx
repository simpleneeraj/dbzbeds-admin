import pMap from "p-map";
import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useImmer } from "use-immer";
import Toast from "components/toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Input from "components/element/input";
import ChipInput from "components/chip-input";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import { uploadBlogImage } from "network-requests/api";
import AddMoreButton from "components/element/addmore";
import { useUpdateBlog } from "network-requests/mutations";
import DynamicImageGrid from "components/element/image-picker-grid";

import { Blogs } from "network-requests/types";
import { useGetBlogsById } from "network-requests/queries";

const IRichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

type UpdatePageProps = {
  data: Blogs;
};

const Update = ({}: UpdatePageProps) => {
  const router = useRouter();
  const id = router.query?.id;

  const { data, isFetched } = useGetBlogsById(id as string);
  console.log(data);

  const { mutate, isLoading } = useUpdateBlog(id as string);
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

  React.useMemo(() => {
    if (isFetched && data) {
      setState((draft) => {
        return (draft = data);
      });
    }
  }, [data, isFetched, setState]);

  type Key = keyof typeof state;
  const onChangeState = React.useCallback(
    (key: Key, value: string | any) => {
      setState((draft) => {
        draft[key] = value;
      });
    },
    [setState]
  );

  // SUBMIT DATA TO DB
  const onSubmitData = React.useCallback(async () => {
    // Update image
    const getImageUrl = async (image: any) => {
      if (image && typeof image !== "string") {
        const imageUrl = await uploadBlogImage(image as Blob);
        return imageUrl;
      }
      return image;
    };

    const imagesUrl = (await pMap(state.images, getImageUrl)) as string[];

    const data = {
      ...state,
      images: imagesUrl,
    };

    mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message || "Blog Updated Successfully");
        router.back();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  }, [mutate, router, state]);

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
                          value={state.name}
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
                          value={state.categories}
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
                          value={state.keyWord}
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

export default Update;

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${context.query?.id}/id`;
//   const { data } = await axios({
//     url,
//     method: "get",
//   });

//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// };
