import React from "react";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import {
  VariantsActions,
  VariantsContext,
  VariantsProvider,
} from "context/variant/create";
import General from "components/product/variants/general";
import Color from "components/product/variants/color";
import Storages from "components/product/variants/storage";
import Feet from "components/product/variants/feet";
import Mattress from "components/product/variants/mattress";
import HeadBoard from "components/product/variants/headboard";
import {
  useCreateBuildYourBedVariantById,
  useCreateNewBedVariant,
} from "network-requests/mutations";
import { useRouter } from "next/router";
import pMap from "p-map";
import { uploadBedImage } from "network-requests/api";
import Button from "components/element/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useFetchBedVariantsById,
  useFetchHeadboardVariantById,
} from "network-requests/queries";

interface AccessoriesTabsProps {
  tabName: string;
  id: string;
}
function CreateVariant() {
  return (
    <VariantsProvider>
      <Create />
    </VariantsProvider>
  );
}

export default CreateVariant;

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
