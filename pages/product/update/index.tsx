import React from "react";
import styles from "styles/order.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
import { useUpdateBed } from "network-requests/mutations";
import { toast } from "react-toastify";
import Toast from "components/toast";
import { useRouter } from "next/router";
import { useFetchBedById } from "network-requests/queries";
import DynamicImageGrid from "components/element/image-picker-grid";
import Switch from "components/switch";
import pMap from "p-map";
import { uploadBedImage } from "network-requests/api";

function CreateProduct() {
    const router = useRouter();
    const { data, isFetched } = useFetchBedById(router.query.id as string);
    const [bedInfoInputs, setBedInfoInputs] = React.useState({
        name: data?.name as string,
        slug: data?.slug as string,
        description: data?.description as string,
        categories: data?.categories as string[],
        isDraft: data?.isDraft as boolean,
        images: data?.images as string[],
    });

    console.log({ data });
    // INITILIZE OLD DATA IN STATE
    React.useMemo(() => {
        if (isFetched) {
            setBedInfoInputs({
                name: data?.name as string,
                slug: data?.slug as string,
                description: data?.description as string,
                categories: data?.categories as string[],
                isDraft: data?.isDraft as boolean,
                images: data?.images as string[],
            });
        }
    }, [isFetched]);

    //API POST
    const { mutate, isLoading } = useUpdateBed(router.query?.id as string);

    const handleAddChip = React.useCallback(
        (value: string[]) => {
            setBedInfoInputs({ ...bedInfoInputs, categories: value });
        },
        [bedInfoInputs]
    );

    const handleIsDraft = React.useCallback(
        (value: boolean) => {
            setBedInfoInputs({ ...bedInfoInputs, isDraft: value });
        },
        [bedInfoInputs]
    );

    console.log("DRAFT", bedInfoInputs?.isDraft);
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setBedInfoInputs({
            ...bedInfoInputs,
            [event.target.name]: event.target.value,
        });
    };

    const handleBedUpdate = React.useCallback(async () => {
        const getImageUrl = async (image: any) => {
            if (image && typeof image !== "string") {
                const imageUrl = await uploadBedImage(image as Blob);
                return imageUrl;
            }
            return image;
        };
        const imagesUrl = await pMap(bedInfoInputs.images, getImageUrl);

        mutate(
            {
                name: bedInfoInputs.name,
                description: bedInfoInputs.description,
                categories: bedInfoInputs.categories,
                isDraft: bedInfoInputs.isDraft,
                slug: bedInfoInputs.slug,
                images: imagesUrl,
            },
            {
                onSuccess: (data) => {
                    toast.success(
                        data?.message || "Product Updated Successfully"
                    );
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bedInfoInputs]);
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
                            <div className={styles.tabbox}>
                                <div className="tabcontantinner">
                                    <div className={styles["heading"]}>
                                        <h2>Basic Info</h2>
                                        <div className={styles["draft"]}>
                                            <p>Draft</p>
                                            <Switch
                                                active={bedInfoInputs?.isDraft}
                                                onClick={() =>
                                                    handleIsDraft(
                                                        !bedInfoInputs?.isDraft
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="box">
                                        <ul>
                                            <li>
                                                <Input
                                                    name="name"
                                                    type="text"
                                                    label={"Product Name"}
                                                    placeholder="Enter product name"
                                                    onChange={handleInputChange}
                                                    value={bedInfoInputs.name}
                                                />
                                            </li>
                                            <li>
                                                <Input
                                                    name="slug"
                                                    type="text"
                                                    label={
                                                        "Slug (uniq for every product)"
                                                    }
                                                    placeholder="Auto Generated"
                                                    value={bedInfoInputs.slug}
                                                    onChange={handleInputChange}
                                                />
                                            </li>
                                            <li>
                                                <Textarea
                                                    name="description"
                                                    placeholder="Enter product description"
                                                    label="Product Description"
                                                    onChange={handleInputChange}
                                                    value={
                                                        bedInfoInputs.description
                                                    }
                                                />
                                            </li>

                                            <li className="grid">
                                                <ChipInput
                                                    label={`Category`}
                                                    onChange={handleAddChip}
                                                    placeholder="Add Category..."
                                                    value={
                                                        bedInfoInputs.categories
                                                    }
                                                />
                                            </li>
                                            {/* <li>
                        is draft
                        <input
                          type="checkbox"
                          checked={bed?.isDraft}
                          onChange={(e) => handleIsDraft(e.target.checked)}
                        />
                      </li> */}
                                        </ul>
                                        {/* <div className={styles.buttonsection}>
                      <AddMoreButton title="Update" onClick={handleBedUpdate} />
                    </div> */}
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
                                                initialValue={
                                                    bedInfoInputs.images
                                                }
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.mainheading}>
                            <AddMoreButton
                                title="Update Product Data"
                                onClick={handleBedUpdate}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
}

export default CreateProduct;
