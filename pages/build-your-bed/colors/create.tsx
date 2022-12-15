import React from "react";
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
import { useCreateBuildYourBedVariantById } from "network-requests/mutations";

function CreateColor() {
  return (
    <VariantsProvider>
      <Create />
    </VariantsProvider>
  );
}

export default CreateColor;

const Create = () => {
  const router = useRouter();

  const { state, dispatch } = React.useContext(VariantsContext);
  const { general } = state;
  const id = router.query?.id as string;

  const { mutate } = useCreateBuildYourBedVariantById(id);

  const handleProductUpload = async () => {
    const baseImage = !state.general.image
      ? null
      : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

    mutate(
      {
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
          router.reload();
        },
      }
    );
  };

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <ToastContainer />
      <div className={styles.mainheading}>Create Variant</div>
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
          <div className="grid">
            <Button onClick={handleProductUpload}>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
};
