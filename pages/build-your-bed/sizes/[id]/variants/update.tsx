import React from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Feet from "components/build-your-bed/feet";
import Storages from "components/build-your-bed/storage";
import Mattress from "components/build-your-bed/mattress";
import HeadBoard from "components/build-your-bed/headboard";
import Button from "components/element/button";
import Toast from "components/toast";
import General from "components/build-your-bed/general";
import { UpdateYourBedProvider } from "context/bed-builder/update";
import useUpdateYourBed from "context/bed-builder/use-update-your-bed";

function UpdateVariant() {
  return (
    <UpdateYourBedProvider id={""}>
      <_UpdateVariant />;
    </UpdateYourBedProvider>
  );
}

function _UpdateVariant() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { onUpdate, yourBedState } = useUpdateYourBed();
  console.log(yourBedState);
  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <Toast />
      <div className={styles.mainheading}>Create Variant</div>
      <div className={styles.containerbox}>
        <div className={styles["innner-container"]}>
          <General
            id={id}
            heading="General"
            value={yourBedState?.general || {}}
            getValue={(value) => onUpdate("general", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Feet
            id={id}
            value={yourBedState.feet}
            getValue={(value) => onUpdate("feet", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <HeadBoard
            id={id}
            value={yourBedState.headboard}
            getValue={(value) => onUpdate("headboard", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Mattress
            id={id}
            value={yourBedState.mattress}
            getValue={(value) => onUpdate("mattress", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Storages
            id={id}
            value={yourBedState.storage}
            getValue={(value) => onUpdate("storage", value)}
          />
        </div>
        <div className={styles.mainheading}>
          <Button>Submit Data</Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVariant;

// const { state, dispatch } = React.useContext(VariantsContext);
// const { general } = state;
// const { mutate } = useCreateBuildYourBedVariantById(id);

// const handleProductUpload = async () => {
//   const baseImage = !state.general.image
//     ? null
//     : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

//   mutate(
//     {
//       price: {
//         basePrice: state.general.basePrice,
//         salePrice: state.general.basePrice,
//       },
//       size: state.general.size,
//       image: baseImage,
//     },
//     {
//       onSuccess: (data) => {
//         toast.success(data?.message || "Varient Created Successfully");
//         router.reload();
//       },
//     }
//   );
// };
