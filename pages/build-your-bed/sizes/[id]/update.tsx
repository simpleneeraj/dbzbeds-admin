import React, { useEffect } from "react";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import {
  VariantsActions,
  VariantsContext,
  VariantsProvider,
} from "context/variant/create";
import { useRouter } from "next/router";
import Button from "components/element/button";
import "react-toastify/dist/ReactToastify.css";
import { uploadBedImage } from "network-requests/api";
import { toast, ToastContainer } from "react-toastify";
import General from "components/product/variants/general";
import {
  useUpdateBed,
  useUpdateBuildYourBedVariantById,
} from "network-requests/mutations";
import { updateBuildYourBedVariantById } from "network-requests/api/build-your-bed";
import { useGetBuildYourBedsVariantsById } from "network-requests/queries";

function UpdateColor() {
  return (
    <VariantsProvider>
      <Create />
    </VariantsProvider>
  );
}

export default UpdateColor;

const Create = () => {
  const router = useRouter();

  const { state, dispatch } = React.useContext(VariantsContext);
  const { general } = state;
  const id = router.query?.id as string;

  const { mutate } = useUpdateBuildYourBedVariantById(id);
  const { data } = useGetBuildYourBedsVariantsById(id);

  useEffect(() => {
    if (data) {
      dispatch(
        VariantsActions.GENERAL({
          basePrice: data?.price?.basePrice,
          salePrice: data?.price?.salePrice,
          size: data?.size,
          image: data?.image,
        })
      );
    }
  }, [data, dispatch]);

  console.log({ general });

  const handleProductUpload = async () => {
    const baseImage = !state.general.image
      ? null
      : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

    mutate(
      {
        ...data,
        price: {
          basePrice: state.general.basePrice,
          salePrice: state.general.basePrice,
        },
        size: state.general.size,
        image: baseImage,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Varient Created Successfully");
          router.back();
        },
      }
    );
  };

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <ToastContainer />
      <div className={styles.mainheading}>Update Size</div>
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div
            style={{
              marginTop: "10px",
              background: "#fff",
              padding: ".5rem",
              width: "100%",
            }}
          >
            <General
              id={id}
              getValue={(v) => dispatch(VariantsActions.GENERAL(v))}
              value={general}
            />
          </div>
          <div className={styles.mainheading}>
            <Button onClick={handleProductUpload}>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
