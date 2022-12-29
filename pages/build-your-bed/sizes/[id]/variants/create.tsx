import React from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Feet from "components/build-your-bed/feet";
import Storages from "components/build-your-bed/storage";
import Mattress from "components/build-your-bed/mattress";
import HeadBoard from "components/build-your-bed/headboard";
import Toast from "components/toast";
import Button from "components/element/button";
import General from "components/build-your-bed/general";
import { CreateYourBedProvider } from "context/bed-builder/create";
import useCreateYourBed from "context/bed-builder/use-create-your-bed";
import { useCreateColorVariantByVariantId } from "network-requests/mutations";
import { uploadBedImage } from "network-requests/api";
import pMap from "p-map";
import { toast } from "react-toastify";

function CreateVariant() {
  return (
    <CreateYourBedProvider>
      <_CreateVariant />
    </CreateYourBedProvider>
  );
}

function _CreateVariant() {
  const router = useRouter();
  const id = router.query?.id as string;
  const colorId = router.query?.colorId as string;

  const { onUpdate, yourBedState: state } = useCreateYourBed();
  const { mutate } = useCreateColorVariantByVariantId(colorId);

  console.log({ state });

  const handleProductUpload = async () => {
    const baseImage = !state?.general?.image
      ? null
      : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

    const getImageUrlAndName = async (color: any) => {
      if (color.image) {
        const imageUrl = await uploadBedImage(color.image as Blob);
        return {
          name: color?.name,
          price: color?.price,
          image: imageUrl,
        };
      }
      return {
        name: color?.name,
        price: color?.price,
        image: null,
      };
    };

    const uploadHeadboardImages = await pMap(
      state.headboard as any,
      getImageUrlAndName
    );

    const uploadMattressImages = await pMap(
      state.mattress as any,
      getImageUrlAndName
    );

    const uploadStorageImages = await pMap(
      state.storage as any,
      getImageUrlAndName
    );

    const uploadFeetImages = await pMap(state.feet as any, getImageUrlAndName);

    mutate(
      {
        color: state?.general?.color || "",
        price: state?.general?.salePrice,
        image: baseImage,
        storage: uploadStorageImages as any,
        feet: uploadFeetImages as any,
        headboard: uploadHeadboardImages as any,
        mattress: uploadMattressImages as any,
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
      <Toast />
      <div className={styles.mainheading}>Create Variant</div>
      <div className={styles.containerbox}>
        <div className={styles["innner-container"]}>
          <General
            id={id}
            heading="General"
            value={state?.general}
            getValue={(value) => onUpdate("general", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Feet
            id={id}
            value={state.feet}
            getValue={(value) => onUpdate("feet", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <HeadBoard
            id={id}
            value={state.headboard}
            getValue={(value) => onUpdate("headboard", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Mattress
            id={id}
            value={state.mattress}
            getValue={(value) => onUpdate("mattress", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Storages
            id={id}
            value={state.storage}
            getValue={(value) => onUpdate("storage", value)}
          />
        </div>

        <div className={styles.mainheading}>
          <Button onClick={handleProductUpload}>Submit Data</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateVariant;

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
